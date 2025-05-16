import {
    getThresholdsByUserId,
    saveOrUpdateThresholds
} from "../services/thresholds.service.js";

/**
 * Controlador para buscar os limites de gastos do usuário logado.
 */
export const getUserThresholds = async (req, res) => {
    try {
        // O ID do usuário é obtido do token JWT pelo middleware de autenticação
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: "Usuário não autenticado." });
        }

        const thresholds = await getThresholdsByUserId(userId);
        res.status(200).json(thresholds);
    } catch (error) {
        console.error("Erro no controlador ao buscar limites:", error);
        res.status(500).json({ error: error.message || "Erro interno ao buscar limites de gastos." });
    }
};

/**
 * Controlador para salvar ou atualizar os limites de gastos do usuário logado.
 */
export const setUserThresholds = async (req, res) => {
    try {
        const userId = req.userId;
        const limits = req.body; // Espera um objeto como { "alimentação": 500, "transporte": 300, ... }

        if (!userId) {
            return res.status(401).json({ error: "Usuário não autenticado." });
        }

        // Validação básica dos limites recebidos
        if (!limits || typeof limits !== 'object' || Object.keys(limits).length === 0) {
            return res.status(400).json({ error: "Dados de limites inválidos ou não fornecidos." });
        }
        // Validação adicional: garantir que todos os valores são números
        for (const key in limits) {
            if (typeof limits[key] !== 'number' || isNaN(limits[key]) || limits[key] < 0) {
                return res.status(400).json({ error: `Valor inválido para a categoria '${key}'. Limites devem ser números não negativos.` });
            }
        }

        await saveOrUpdateThresholds(userId, limits);
        // Retorna os limites salvos como confirmação
        res.status(200).json(limits); 
    } catch (error) {
        console.error("Erro no controlador ao salvar limites:", error);
         // Se o erro for por ID inválido (lançado pelo service)
        if (error.message === "ID de usuário inválido fornecido.") {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: error.message || "Erro interno ao salvar limites de gastos." });
    }
};

