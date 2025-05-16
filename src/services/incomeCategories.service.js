import { getDatabase } from "../database/mongo.js";
import { ObjectId } from "mongodb";

// GET - retorna as categorias da collection "incomeCategories"
export const getUserIncomeCategories = async (userId) => {
    const db = await getDatabase();
    const entry = await db.collection("incomeCategories").findOne({
        userId: new ObjectId(userId),
    });
    return entry?.categories || [];
};

// POST - salva ou atualiza categorias na collection "incomeCategories"
export const saveUserIncomeCategories = async (userId, categories) => {
    if (!Array.isArray(categories)) {
        throw new Error("Categorias deve ser um array.");
    }

    const db = await getDatabase();

    await db.collection("incomeCategories").updateOne(
        { userId: new ObjectId(userId) },
        { $set: { categories } },
        { upsert: true }
    );
};
