import { getDatabase } from "../database/mongo.js";
import { ObjectId } from "mongodb"; // Importa ObjectId
import { updateIncomeById } from "../services/incomes.service.js"; // Importa a função de atualização


export async function getAllIncomes(req, res) {
    try {
        const db = await getDatabase();
        const incomes = await db.collection("incomes").find({ userId: req.userId }).toArray();
        res.json(incomes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar receitas" });
    }
}

export async function createIncome(req, res) {
    try {
        const db = await getDatabase();

        const { id, ...rest } = req.body; // ✅ descarta qualquer id vindo do frontend

        const dataToSave = {
            ...rest,
            userId: req.userId,
            amount: Number(rest.amount),
        };

        const result = await db.collection("incomes").insertOne(dataToSave);
        res.status(201).json({ ...dataToSave, _id: result.insertedId });
    } catch (error) {
        console.error("Erro ao criar receita:", error);
        res.status(500).json({ error: "Erro ao salvar receita" });
    }
}


export async function deleteIncome(req, res) {
    try {
        const db = await getDatabase();
        const result = await db.collection("incomes").deleteOne({
            _id: new ObjectId(req.params.id),
        });


        res.json({ deletedCount: result.deletedCount });
    } catch (error) {
        console.error("Erro ao deletar receita:", error);
        res.status(500).json({ error: "Erro ao deletar receita" });
    }
}



export async function updateIncome(req, res) {
    const { id } = req.params;
    const updatedData = req.body;

    // Validação básica do ID
    if (!id || id.length !== 24) {
        return res.status(400).json({ error: "ID inválido" });
    }

    // Validação básica dos dados recebidos
    if (!updatedData || Object.keys(updatedData).length === 0) {
        return res.status(400).json({ error: "Dados de atualização não fornecidos" });
    }

    try {
        // Verifica se a receita pertence ao usuário logado antes de atualizar
        const db = await getDatabase();
        const income = await db.collection("incomes").findOne({ _id: new ObjectId(id), userId: req.userId });

        if (!income) {
            return res.status(404).json({ error: "Receita não encontrada ou não pertence ao usuário" });
        }

        // Remove o campo _id e userId do corpo da requisição para evitar modificação
        delete updatedData._id;
        delete updatedData.userId;

        // Garante que o 'amount' seja sempre um número, se presente
        if (updatedData.amount !== undefined) {
            updatedData.amount = Number(updatedData.amount);
        }

        const result = await updateIncomeById(id, updatedData);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Receita não encontrada para atualização" });
        }

        if (result.modifiedCount === 0) {
            // Nenhum campo foi modificado
            const currentIncome = await db.collection("incomes").findOne({ _id: new ObjectId(id) });
            return res.status(200).json(currentIncome);
        }

        // Busca a receita atualizada para retornar ao frontend
        const finalUpdatedIncome = await db.collection("incomes").findOne({ _id: new ObjectId(id) });
        res.status(200).json(finalUpdatedIncome);

    } catch (err) {
        console.error("Erro ao atualizar receita:", err);
        if (err.message.includes("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters")) {
            return res.status(400).json({ error: "ID inválido" });
        }
        res.status(500).json({ error: "Erro interno ao atualizar receita" });
    }
}
