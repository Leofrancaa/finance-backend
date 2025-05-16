import { getDatabase } from "../database/mongo.js";
import { ObjectId } from "mongodb";

const COLLECTION_NAME = "thresholds";

/**
 * Busca os limites de gastos para um usuário específico.
 * Se não existirem, retorna um objeto vazio.
 * @param {string} userId - O ID do usuário.
 * @returns {Promise<Record<string, number>>} - Os limites de gastos ou um objeto vazio.
 */
export const getThresholdsByUserId = async (userId) => {
  try {
    const db = await getDatabase();
    const thresholdsDoc = await db.collection(COLLECTION_NAME).findOne({ userId: new ObjectId(userId) });
    // Retorna os limites ou um objeto vazio se não encontrar
    return thresholdsDoc ? thresholdsDoc.limits : {}; 
  } catch (error) {
    console.error("Erro ao buscar limites de gastos:", error);
    throw new Error("Erro ao buscar limites de gastos no banco de dados.");
  }
};

/**
 * Salva ou atualiza os limites de gastos para um usuário específico.
 * Utiliza upsert: cria se não existir, atualiza se existir.
 * @param {string} userId - O ID do usuário.
 * @param {Record<string, number>} limits - Os limites de gastos a serem salvos.
 * @returns {Promise<any>} - O resultado da operação do MongoDB.
 */
export const saveOrUpdateThresholds = async (userId, limits) => {
  try {
    const db = await getDatabase();
    const result = await db.collection(COLLECTION_NAME).updateOne(
      { userId: new ObjectId(userId) }, // Filtro pelo ID do usuário
      { $set: { userId: new ObjectId(userId), limits: limits } }, // Dados a serem inseridos/atualizados
      { upsert: true } // Opção para criar se não existir
    );
    return result;
  } catch (error) {
    console.error("Erro ao salvar/atualizar limites de gastos:", error);
    // Verifica se o erro é de ObjectId inválido
    if (error.message.includes("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters")) {
        throw new Error("ID de usuário inválido fornecido.");
    }
    throw new Error("Erro ao salvar/atualizar limites de gastos no banco de dados.");
  }
};

