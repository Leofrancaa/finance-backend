import { getDatabase } from "../database/mongo.js";
import { ObjectId } from "mongodb";

export async function findAllIncomes() {
    const db = await getDatabase(); // 👈 Aqui direto!
    return db.collection("incomes").find({}).toArray();
}

export async function insertIncome(data) {
    const db = await getDatabase();
    const { id, ...clean } = data; // ✅ remove qualquer id indesejado

    const res = await db.collection("incomes").insertOne({
        ...clean,
        amount: Number(clean.amount),
    });

    return { ...clean, _id: res.insertedId };
}


export async function removeIncome(id) {
    const db = await getDatabase();
    return db.collection("incomes").deleteOne({ _id: new ObjectId(id) });
}



export async function updateIncomeById(id, updatedData) {
    const db = await getDatabase();
    // Certifique-se de que o userId não seja sobrescrito ou removido acidentalmente
    // Remova o campo _id e userId de updatedData para evitar que sejam modificados
    const { _id, userId, ...dataToUpdate } = updatedData;

    // Garante que o 'amount' seja sempre um número
    if (dataToUpdate.amount !== undefined) {
        dataToUpdate.amount = Number(dataToUpdate.amount);
    }

    return await db.collection("incomes").updateOne(
        { _id: new ObjectId(id) }, // Filtro para encontrar o documento pelo ID
        { $set: dataToUpdate } // Operador $set para atualizar os campos especificados
    );
}
