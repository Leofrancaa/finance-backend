import express from "express";
import {
    fetchUserCategories,
    saveUserCategories,
    updateUserCategory,   // novo controller
    deleteUserCategory,   // novo controller
} from "../controller/category.controller.js";

const router = express.Router();

router.get("/:userId", fetchUserCategories);
router.post("/:userId", saveUserCategories);
router.put("/:userId/:categoryName", updateUserCategory);     // PUT para atualização
router.delete("/:userId/:categoryName", deleteUserCategory);  // DELETE para remoção

export default router;
