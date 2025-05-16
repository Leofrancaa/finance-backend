import {
    getUserIncomeCategories,
    saveUserIncomeCategories,
} from "../services/incomeCategories.service.js";

// GET /api/income-categories/:userId
export const handleGetIncomeCategories = async (req, res) => {
    const { userId } = req.params;

    try {
        const categories = await getUserIncomeCategories(userId);
        res.status(200).json(categories);
    } catch (error) {
        console.error("Erro ao buscar income categories:", error);
        res.status(500).json({ error: "Erro ao buscar categorias de receita." });
    }
};

// POST /api/income-categories/:userId
export const handleSaveIncomeCategories = async (req, res) => {
    const { userId } = req.params;
    const { categories } = req.body;

    try {
        await saveUserIncomeCategories(userId, categories);
        res.status(200).json({ message: "Categorias salvas com sucesso." });
    } catch (error) {
        console.error("Erro ao salvar income categories:", error);
        res.status(500).json({ error: "Erro ao salvar categorias de receita." });
    }
};
