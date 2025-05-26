import express from "express";
import fetch from "node-fetch";
import yahooFinance from "yahoo-finance2";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        // 1. SELIC e IPCA dos 2 últimos registros
        const [selicRes, ipcaRes] = await Promise.all([
            fetch("https://api.bcb.gov.br/dados/serie/bcdata.sgs.4189/dados/ultimos/2?formato=json"), // SELIC
            fetch("https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados/ultimos/2?formato=json"), // IPCA
        ]);

        const selicData = await selicRes.json();
        const ipcaData = await ipcaRes.json();

        const selicAtual = parseFloat(selicData?.[1]?.valor ?? "0");
        const selicAnterior = parseFloat(selicData?.[0]?.valor ?? "0");
        const ipcaAtual = parseFloat(ipcaData?.[1]?.valor ?? "0");
        const ipcaAnterior = parseFloat(ipcaData?.[0]?.valor ?? "0");

        const calcVariation = (atual, anterior) =>
            anterior === 0 ? null : ((atual - anterior) / anterior) * 100;

        const selicVariation = calcVariation(selicAtual, selicAnterior);
        const ipcaVariation = calcVariation(ipcaAtual, ipcaAnterior);

        // 2. Ibovespa via Yahoo Finance
        const ibov = await yahooFinance.quote("^BVSP");

        // 3. USD/BRL via CoinGecko
        const usdRes = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=brl&include_24hr_change=true"
        );
        const usdData = await usdRes.json();

        // 4. Resultado unificado
        const result = {
            selic: {
                value: selicAtual || null,
                variation: selicVariation != null ? selicVariation.toFixed(2) : null,
            },
            ipca: {
                value: ipcaAtual || null,
                variation: ipcaVariation != null ? ipcaVariation.toFixed(2) : null,
            },
            ibovespa: {
                value: ibov?.regularMarketPrice ?? null,
                variation: ibov?.regularMarketChangePercent ?? null,
            },
            usd: {
                value: usdData?.usd?.brl ?? null,
                variation: usdData?.usd?.brl_24h_change ?? null,
            },
        };

        res.json(result);
    } catch (err) {
        console.error("Erro ao buscar dados macroeconômicos:", err);
        res.status(500).json({ error: "Erro ao buscar dados macroeconômicos" });
    }
});

export default router;
