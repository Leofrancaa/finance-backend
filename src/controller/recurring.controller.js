import {
    findAllRecurring,
    insertRecurring,
    removeRecurring,
} from "../services/recurring.service.js";
import { ObjectId } from "mongodb";

export async function getAllRecurring(req, res) {
    try {
        const list = await findAllRecurring(req.userId); // ✅ pega só do usuário logado
        res.json(list);
    } catch (error) {
        console.error("Erro ao buscar gastos fixos:", error);
        res.status(500).json({ error: "Erro ao buscar gastos fixos" });
    }
}

export async function createRecurring(req, res) {
    try {
        console.log("🔵 Payload recebido para gasto fixo:", req.body);
        console.log("🔵 userId:", req.userId);

        const {
            type,
            amount,
            day,
            startDate,
            paymentMethod,
            note,
            subcategory,
            creditCardId,
        } = req.body;

        if (!type || !amount || !day || !startDate || !paymentMethod) {
            return res
                .status(400)
                .json({ error: "Preencha todos os campos obrigatórios." });
        }

        const recurringData = {
            type,
            amount,
            day,
            startDate,
            paymentMethod,
            note: note ?? "",
            subcategory: subcategory ?? "",
            fixed: true,
            userId: req.userId,
            ...(creditCardId && { creditCardId: new ObjectId(creditCardId) }),
        };

        const result = await insertRecurring(recurringData);

        const response = {
            ...recurringData,
            id: result.insertedId.toString(),
        };

        console.log("🟢 Enviando resposta JSON:", response);
        res.status(201).json(response);
    } catch (error) {
        console.error("Erro REAL ao salvar gasto fixo:", error.message, error.stack);
        res.status(500).json({ error: "Erro ao salvar gasto fixo" });
    }
}

export async function deleteRecurring(req, res) {
    try {
        const result = await removeRecurring(req.params.id);
        res.json({ deletedCount: result.deletedCount });
    } catch (error) {
        console.error("Erro ao deletar gasto fixo:", error);
        res.status(500).json({ error: "Erro ao deletar gasto fixo" });
    }
}
