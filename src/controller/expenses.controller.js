import {
    deleteExpenseById,
    updateExpenseById, // Adiciona a importação da função de atualização
} from "../services/expenses.service.js";
import { getDatabase } from "../database/mongo.js";
import { ObjectId } from "mongodb"; // Importa ObjectId

export const getExpenses = async (req, res) => {
    try {
        const db = await getDatabase();
        const expenses = await db
            .collection("expenses")
            .find({ userId: req.userId }) // 👈 buscar só despesas do usuário logado
            .toArray();

        res.json(expenses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao buscar despesas" });
    }
};

export const createExpense = async (req, res) => {
    console.log("📥 Nova requisição de criação de expense recebida:", req.body);

    try {
        const db = await getDatabase();

        const date = req.body.date ?? new Date().toISOString();

        const dataToSave = {
            type: req.body.type,
            amount: req.body.amount,
            paymentMethod: req.body.paymentMethod,
            installments: req.body.installments || "",
            day: req.body.day,
            note: req.body.note || "",
            fixed: req.body.fixed || false,
            date,
            userId: req.userId,
            subcategory: req.body.subcategory || "",
            creditCardId:
                req.body.paymentMethod === "cartão de crédito"
                    ? req.body.creditCardId || null
                    : null,
        };

        const { insertedId } = await db.collection("expenses").insertOne(dataToSave);

        return res.status(201).json({ ...dataToSave, _id: insertedId });
    } catch (error) {
        console.error("❌ Erro ao criar despesa:", error.message, error.stack);
        res.status(500).json({ error: "Erro ao criar despesa" });
    }
};

export const deleteExpense = async (req, res) => {
    const { id } = req.params;

    if (!id || id.length !== 24) {
        return res.status(400).json({ error: "ID inválido" });
    }

    try {
        const result = await deleteExpenseById(id);
        res.json(result);
    } catch (err) {
        console.error("Erro ao deletar:", err);
        res.status(500).json({ error: "Erro ao deletar despesa" });
    }
};



export const updateExpense = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    // Validação básica do ID
    if (!id || id.length !== 24) {
        return res.status(400).json({ error: "ID inválido" });
    }

    // Validação básica dos dados recebidos (pode ser mais robusta)
    if (!updatedData || Object.keys(updatedData).length === 0) {
        return res.status(400).json({ error: "Dados de atualização não fornecidos" });
    }

    try {
        // Verifica se a despesa pertence ao usuário logado antes de atualizar
        const db = await getDatabase();
        const expense = await db.collection("expenses").findOne({ _id: new ObjectId(id), userId: req.userId });

        if (!expense) {
            return res.status(404).json({ error: "Despesa não encontrada ou não pertence ao usuário" });
        }

        // Remove o campo _id e userId do corpo da requisição para evitar modificação
        delete updatedData._id;
        delete updatedData.userId;

        const result = await updateExpenseById(id, updatedData);

        if (result.matchedCount === 0) {
            // Isso não deveria acontecer se a verificação acima foi feita, mas é uma segurança adicional
            return res.status(404).json({ error: "Despesa não encontrada para atualização" });
        }

        if (result.modifiedCount === 0) {
            // Nenhum campo foi modificado (dados enviados eram iguais aos existentes)
            // Retorna a despesa atualizada (ou a original, já que nada mudou)
            const updatedExpense = await db.collection("expenses").findOne({ _id: new ObjectId(id) });
            return res.status(200).json(updatedExpense);
        }

        // Busca a despesa atualizada para retornar ao frontend
        const finalUpdatedExpense = await db.collection("expenses").findOne({ _id: new ObjectId(id) });
        res.status(200).json(finalUpdatedExpense);

    } catch (err) {
        console.error("Erro ao atualizar despesa:", err);
        // Verifica se o erro é devido a um ObjectId inválido
        if (err.message.includes("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters")) {
            return res.status(400).json({ error: "ID inválido" });
        }
        res.status(500).json({ error: "Erro interno ao atualizar despesa" });
    }
};
