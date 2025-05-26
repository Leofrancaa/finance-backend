import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const url =
            "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=brl&include_24hr_change=true";

        const response = await fetch(url);
        const data = await response.json();

        const formatted = [
            {
                id: "bitcoin",
                name: "Bitcoin",
                symbol: "BTC",
                price: data.bitcoin?.brl,
                change: data.bitcoin?.brl_24h_change,
            },
            {
                id: "ethereum",
                name: "Ethereum",
                symbol: "ETH",
                price: data.ethereum?.brl,
                change: data.ethereum?.brl_24h_change,
            },
            {
                id: "solana",
                name: "Solana",
                symbol: "SOL",
                price: data.solana?.brl,
                change: data.solana?.brl_24h_change,
            },
        ];

        res.json(formatted);
    } catch (err) {
        console.error("Erro ao buscar dados de cripto:", err);
        res.status(500).json({ error: "Erro ao buscar dados de cripto" });
    }
});

export default router;
