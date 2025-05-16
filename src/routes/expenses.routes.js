import express from "express";
import {
    getExpenses,
    createExpense,
    deleteExpense,
    updateExpense, // Adiciona a importação do controlador de atualização
} from "../controller/expenses.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js"; // Importa o middleware de autenticação

const router = express.Router();

// Usa o authMiddleware para proteger as rotas
router.use(authMiddleware);

router.get("/", getExpenses);
router.post("/", createExpense);
router.delete("/:id", deleteExpense);

export default router;

router.put("/:id", updateExpense); // Adiciona a rota PUT para atualização
