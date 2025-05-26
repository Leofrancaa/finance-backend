import { getDatabase } from "../database/mongo.js";
import { ObjectId } from "mongodb";

export async function createInvestment(data) {
    const db = await getDatabase();
    const { id, _id, ...clean } = data;

    const res = await db.collection("investments").insertOne({
        ...clean,
        amount: Number(clean.amount),
        date: new Date(clean.date),
    });

    return { ...clean, _id: res.insertedId };
}

export async function getInvestmentsByUser(userId) {
    const db = await getDatabase();
    return db
        .collection("investments")
        .find({ userId: userId.toString() })
        .sort({ date: -1 })
        .toArray();
}

export async function updateInvestment(id, updatedData) {
    const db = await getDatabase();
    const { _id, userId, ...clean } = updatedData;

    if (clean.amount !== undefined) {
        clean.amount = Number(clean.amount);
    }
    if (clean.date) {
        clean.date = new Date(clean.date);
    }

    await db.collection("investments").updateOne(
        { _id: new ObjectId(id) },
        { $set: clean }
    );

    return { ...clean, _id: id };
}

export async function deleteInvestment(id) {
    const db = await getDatabase();
    return db.collection("investments").deleteOne({ _id: new ObjectId(id) });
}
