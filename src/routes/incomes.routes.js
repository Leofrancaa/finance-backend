import express from "express";
import { getAllIncomes, createIncome, deleteIncome, updateIncome } from "../controller/incomes.controller.js"; // Adiciona updateIncome
import { authMiddleware } from "../middlewares/auth.middleware.js"; // 👈 importante

const router = express.Router();

router.use(authMiddleware); // 👈 proteger toda rota incomes

router.get("/", getAllIncomes);
router.post("/", createIncome);
router.delete("/:id", deleteIncome);

export default router;

router.put("/:id", updateIncome); // Adiciona a rota PUT para atualização
