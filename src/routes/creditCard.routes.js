import express from "express";
import {
    handleGetCreditCards,
    handleAddCreditCard,
    handleDeleteCreditCard,
} from "../controller/creditCard.controller.js";

const router = express.Router();

router.get("/:userId", handleGetCreditCards);
router.post("/:userId", handleAddCreditCard);
router.delete("/:cardId", handleDeleteCreditCard);

export default router;
