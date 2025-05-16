// src/routes/category.routes.js
import express from "express";
import {
    fetchUserCategories,
    saveUserCategories,
} from "../controller/category.controller.js";

const router = express.Router();

router.get("/:userId", fetchUserCategories);
router.post("/:userId", saveUserCategories);

export default router;
