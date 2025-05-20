import { ObjectId } from "mongodb";
import { getDatabase } from "../database/mongo.js";

export const getAllExpenses = async () => {
    const db = await getDatabase();
    return await db.collection("expenses").find().toArray();
};

export const createNewExpense = async (body) => {
    const db = await getDatabase();

    const dataToSave = {
        type: body.type,
        amount: body.amount,
        paymentMethod: body.paymentMethod,
        installments: body.installments || "",
        day: body.day,
        note: body.note || "",
        fixed: body.fixed || false,
        date: body.date ?? new Date().toISOString(),
        subcategory: body.subcategory || "",
        creditCardId:
            body.paymentMethod === "cartão de crédito"
                ? body.creditCardId || null
                : null,
        userId: body.userId, // <- garanta que isso também seja salvo
    };

    const { insertedId } = await db.collection("expenses").insertOne(dataToSave);

    return { ...dataToSave, _id: insertedId };
};


export const deleteExpenseById = async (_id) => {
    const db = await getDatabase();
    return await db.collection("expenses").deleteOne({ _id: new ObjectId(_id) });
};



export const updateExpenseById = async (_id, updatedData) => {
    const db = await getDatabase();
    // Certifique-se de que o userId não seja sobrescrito ou removido acidentalmente
    // Remova o campo _id e userId de updatedData para evitar que sejam modificados
    const { userId, ...dataToUpdate } = updatedData;

    return await db.collection("expenses").updateOne(
        { _id: new ObjectId(_id) }, // Filtro para encontrar o documento pelo ID
        { $set: dataToUpdate } // Operador $set para atualizar os campos especificados
    );


};
