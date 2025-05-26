import express from "express";
import yahooFinance from "yahoo-finance2";

const router = express.Router();

router.get("/", async (req, res) => {
    const symbols = ["PETR4.SA", "VALE3.SA", "ITUB4.SA", "BBDC4.SA"];

    try {
        const results = await Promise.all(
            symbols.map(async (symbol) => {
                const data = await yahooFinance.quote(symbol);
                return {
                    symbol,
                    price: data.regularMarketPrice,
                    changePercent: data.regularMarketChangePercent,
                };
            })
        );

        res.json(results);
    } catch (error) {
        console.error("Erro ao buscar ações:", error);
        res.status(500).json({ error: "Erro ao buscar ações" });
    }
});

export default router;
