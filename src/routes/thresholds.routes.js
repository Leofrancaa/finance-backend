import express from "express";
import {
    getUserThresholds,
    setUserThresholds
} from "../controller/thresholds.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js"; // Importa o middleware de autenticação

const router = express.Router();

// Rota para buscar os limites do usuário logado
// O middleware de autenticação garante que req.userId estará disponível
router.get("/", authMiddleware, getUserThresholds);

// Rota para salvar/atualizar os limites do usuário logado
// O middleware de autenticação garante que req.userId estará disponível
router.post("/", authMiddleware, setUserThresholds);

export default router;

