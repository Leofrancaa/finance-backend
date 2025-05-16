// src/controller/category.controller.js
import {
    getCategoriesByUserId,
    upsertCategoriesByUserId,
} from "../models/category.model.js";

export async function fetchUserCategories(req, res) {
    const { userId } = req.params;
    const result = await getCategoriesByUserId(userId);
    res.status(200).json(result?.categories || []);
}

export async function saveUserCategories(req, res) {
    const { userId } = req.params;
    const { categories } = req.body;

    if (!Array.isArray(categories)) {
        return res.status(400).json({ error: "Categorias inválidas." });
    }

    await upsertCategoriesByUserId(userId, categories);
    res.status(200).json({ message: "Categorias salvas com sucesso!" });
}
