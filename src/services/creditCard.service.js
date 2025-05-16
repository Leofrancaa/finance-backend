import { getDatabase } from "../database/mongo.js";
import { ObjectId } from "mongodb";

// Retorna todos os cartões do usuário
export const getCreditCardsByUser = async (userId) => {
    const db = await getDatabase();
    return await db
        .collection("creditCards")
        .find({ userId: new ObjectId(userId) })
        .toArray();
};

// Adiciona novo cartão
export const addCreditCard = async (userId, name, lastDigits) => {
    const db = await getDatabase();
    const card = {
        userId: new ObjectId(userId),
        name,
        lastDigits,
    };

    const { insertedId } = await db.collection("creditCards").insertOne(card);
    return { ...card, _id: insertedId };
};

// Remove cartão pelo ID
export const deleteCreditCard = async (cardId) => {
    const db = await getDatabase();
    return await db.collection("creditCards").deleteOne({ _id: new ObjectId(cardId) });
};
