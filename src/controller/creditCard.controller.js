import {
    getCreditCardsByUser,
    addCreditCard,
    deleteCreditCard,
} from "../services/creditCard.service.js";

// GET /api/credit-cards/:userId
export const handleGetCreditCards = async (req, res) => {
    try {
        const { userId } = req.params;
        const cards = await getCreditCardsByUser(userId);
        res.status(200).json(cards);
    } catch (error) {
        console.error("Erro ao buscar cartões:", error);
        res.status(500).json({ error: "Erro ao buscar cartões" });
    }
};

// POST /api/credit-cards/:userId
export const handleAddCreditCard = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, lastDigits } = req.body;

        if (!name || !lastDigits) {
            return res.status(400).json({ error: "Nome e final do cartão são obrigatórios" });
        }

        const card = await addCreditCard(userId, name, lastDigits);
        res.status(201).json(card);
    } catch (error) {
        console.error("Erro ao adicionar cartão:", error);
        res.status(500).json({ error: "Erro ao adicionar cartão" });
    }
};

// DELETE /api/credit-cards/:cardId
export const handleDeleteCreditCard = async (req, res) => {
    try {
        const { cardId } = req.params;
        await deleteCreditCard(cardId);
        res.status(200).json({ message: "Cartão removido com sucesso" });
    } catch (error) {
        console.error("Erro ao deletar cartão:", error);
        res.status(500).json({ error: "Erro ao deletar cartão" });
    }
};
