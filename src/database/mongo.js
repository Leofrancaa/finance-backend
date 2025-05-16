import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;

export async function getDatabase() {
    if (!db) {
        await client.connect();
        db = client.db("finance"); // ou o nome real do banco
    }
    return db;
}
