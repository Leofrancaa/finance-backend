import { getDatabase } from "../database/mongo.js";

export const getUserCollection = async () => {
    const db = await getDatabase();
    return db.collection("users");
};
