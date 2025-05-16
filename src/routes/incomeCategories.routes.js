import express from "express";
import {
    handleGetIncomeCategories,
    handleSaveIncomeCategories,
} from "../controller/incomeCategories.controller.js";

const router = express.Router();

router.get("/:userId", handleGetIncomeCategories);
router.post("/:userId", handleSaveIncomeCategories);

export default router;
