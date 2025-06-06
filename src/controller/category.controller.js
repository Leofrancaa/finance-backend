import {
    getCategoriesByUserId,
    upsertCategoriesByUserId,
    updateCategoryByName,
    deleteCategoryByName,
} from "../models/category.model.js";

import {
    getUserIncomeCategories,
    saveUserIncomeCategories,
} from "../services/incomeCategories.service.js";

// ✅ GET /:userId
export async function fetchUserCategories(req, res) {
    const { userId } = req.params;
    try {
        const result = await getCategoriesByUserId(userId);
        res.status(200).json(result?.categories || []);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao buscar categorias." });
    }
}

// ✅ POST /:userId
export async function saveUserCategories(req, res) {
    const { userId } = req.params;
    const { categories } = req.body;

    if (!Array.isArray(categories)) {
        return res.status(400).json({ error: "Categorias inválidas." });
    }

    try {
        await upsertCategoriesByUserId(userId, categories);
        res.status(200).json({ message: "Categorias salvas com sucesso!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao salvar categorias." });
    }
}

// ✅ PUT /:userId/:categoryName
export async function updateUserCategory(req, res) {
    const { userId, categoryName } = req.params;
    const updatedCategory = req.body;

    try {
        const result = await updateCategoryByName(userId, categoryName, updatedCategory);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Categoria não encontrada." });
        }

        res.status(200).json({ message: "Categoria atualizada com sucesso." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao atualizar categoria." });
    }
}

// ✅ DELETE /:userId/:categoryName
export async function deleteUserCategory(req, res) {
    const { userId, categoryName } = req.params;

    try {
        const result = await deleteCategoryByName(userId, categoryName);

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "Categoria não encontrada." });
        }

        res.status(200).json({ message: "Categoria removida com sucesso." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao deletar categoria." });
    }
}

// ✅ GET /api/income-categories/:userId
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

// ✅ POST /api/income-categories/:userId
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
