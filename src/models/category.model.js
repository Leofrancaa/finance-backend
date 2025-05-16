// src/models/category.model.js
import { ObjectId } from "mongodb";
import { getDatabase } from "../database/mongo.js";

const COLLECTION = "categories";

export async function getCategoriesByUserId(userId) {
    const db = await getDatabase();
    return await db.collection(COLLECTION).findOne({ userId });
}

export async function upsertCategoriesByUserId(userId, categories) {
    const db = await getDatabase();
    return await db.collection(COLLECTION).updateOne(
        { userId },
        { $set: { categories } },
        { upsert: true }
    );
}
