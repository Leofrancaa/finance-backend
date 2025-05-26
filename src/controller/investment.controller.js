import {
    createInvestment as createInvestmentService,
    getInvestmentsByUser as getInvestmentsByUserService,
    deleteInvestment as deleteInvestmentService,
    updateInvestment as updateInvestmentService,
} from "../services/investment.service.js";

export async function createInvestment(req, res) {
    try {
        const saved = await createInvestmentService(req.body);
        res.status(201).json(saved);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao criar investimento." });
    }
}

export async function getInvestmentsByUser(req, res) {
    try {
        const data = await getInvestmentsByUserService(req.params.userId);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar investimentos." });
    }
}

export async function updateInvestment(req, res) {
    try {
        const updated = await updateInvestmentService(req.params.id, req.body);
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: "Erro ao atualizar investimento." });
    }
}

export async function deleteInvestment(req, res) {
    try {
        await deleteInvestmentService(req.params.id);
        res.status(200).json({ message: "Investimento excluído com sucesso." });
    } catch (err) {
        res.status(500).json({ error: "Erro ao excluir investimento." });
    }
}
