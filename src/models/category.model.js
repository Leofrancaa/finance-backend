// src/models/category.model.js
import { getDatabase } from "../database/mongo.js";

const COLLECTION = "categories";

// Buscar todas as categorias de um usuário
export async function getCategoriesByUserId(userId) {
    const db = await getDatabase();
    return await db.collection(COLLECTION).findOne({ userId });
}

// Criar ou atualizar todas as categorias do usuário
export async function upsertCategoriesByUserId(userId, categories) {
    const db = await getDatabase();
    return await db.collection(COLLECTION).updateOne(
        { userId },
        { $set: { categories } },
        { upsert: true }
    );
}

// Deletar uma categoria específica por nome
export async function deleteCategoryByName(userId, categoryName) {
    const db = await getDatabase();
    return await db.collection(COLLECTION).updateOne(
        { userId },
        { $pull: { categories: { name: categoryName } } }
    );
}

// Atualizar uma categoria específica pelo nome
export async function updateCategoryByName(userId, categoryName, updatedData) {
    const db = await getDatabase();
    return await db.collection(COLLECTION).updateOne(
        { userId, "categories.name": categoryName },
        {
            $set: {
                "categories.$.name": updatedData.name,
                "categories.$.subcategories": updatedData.subcategories,
                "categories.$.color": updatedData.color,
            },
        }
    );
}
