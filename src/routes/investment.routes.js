import express from "express";
import {
    createInvestment,
    getInvestmentsByUser,
    updateInvestment,
    deleteInvestment,
} from "../controller/investment.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware); // Protege todas as rotas de investimentos

router.get("/:userId", getInvestmentsByUser);
router.post("/", createInvestment);
router.put("/:id", updateInvestment);
router.delete("/:id", deleteInvestment);

export default router;
