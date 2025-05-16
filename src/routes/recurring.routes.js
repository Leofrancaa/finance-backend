import express from "express";
import {
    getAllRecurring,
    createRecurring,
    deleteRecurring,
} from "../controller/recurring.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js"; // 👈 importante

const router = express.Router();
router.use(authMiddleware); // 👈 proteger toda rota incomes

router.get("/", getAllRecurring);
router.post("/", createRecurring);
router.delete("/:id", deleteRecurring);

export default router;
