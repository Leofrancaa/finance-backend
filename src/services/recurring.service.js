import { getDatabase } from "../database/mongo.js";
import { ObjectId } from "mongodb";

export async function findAllRecurring(userId) {
    const db = await getDatabase();
    return db.collection("recurring_expenses").find({ userId }).toArray();
}

export async function insertRecurring(data) {
    const db = await getDatabase();
    console.log("💾 Banco conectado:", db.databaseName); // 👈 debug aqui
    console.log("💾 Dados para inserir:", data);          // 👈 debug aqui
    return await db.collection("recurring_expenses").insertOne(data);
}

export async function removeRecurring(id) {
    const db = await getDatabase();
    return await db.collection("recurring_expenses").deleteOne({ _id: new ObjectId(id) });
}
