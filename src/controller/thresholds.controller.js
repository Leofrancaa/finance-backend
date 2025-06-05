import {
    getThresholdsByUserId,
    saveOrUpdateThresholds,
} from "../services/thresholds.service.js";

/**
 * Controlador para buscar os limites de gastos do usuário logado.
 */
export const getUserThresholds = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: "Usuário não autenticado." });
        }

        const thresholds = await getThresholdsByUserId(userId);
        res.status(200).json(thresholds);
    } catch (error) {
        console.error("Erro ao buscar limites:", error);
        res.status(500).json({
            error:
                error.message || "Erro interno ao buscar limites de gastos do usuário.",
        });
    }
};

/**
 * Controlador para salvar ou atualizar os limites de gastos do usuário logado.
 */
export const setUserThresholds = async (req, res) => {
    try {
        const userId = req.userId;
        const { thresholds } = req.body; // ✅ espera chave `thresholds`

        if (!userId) {
            return res.status(401).json({ error: "Usuário não autenticado." });
        }

        // Verifica se thresholds é um objeto com pelo menos uma entrada válida
        if (
            !thresholds ||
            typeof thresholds !== "object" ||
            Object.keys(thresholds).length === 0
        ) {
            return res
                .status(400)
                .json({ error: "Dados de limites inválidos ou não fornecidos." });
        }

        // Valida cada entrada
        for (const [key, value] of Object.entries(thresholds)) {
            if (typeof value !== "number" || isNaN(value) || value < 0) {
                return res.status(400).json({
                    error: `Valor inválido para a categoria '${key}'. Limites devem ser números não negativos.`,
                });
            }
        }

        await saveOrUpdateThresholds(userId, thresholds);

        res.status(200).json(thresholds); // Retorna os limites salvos como confirmação
    } catch (error) {
        console.error("Erro ao salvar limites:", error);

        if (error.message === "ID de usuário inválido fornecido.") {
            return res.status(400).json({ error: error.message });
        }

        res.status(500).json({
            error:
                error.message || "Erro interno ao salvar limites de gastos do usuário.",
        });
    }
};
