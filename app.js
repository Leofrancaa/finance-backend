import express from "express";
import cors from "cors";
import expensesRoutes from "./src/routes/expenses.routes.js";
import recurringRoutes from "./src/routes/recurring.routes.js";
import incomesRoutes from "./src/routes/incomes.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import thresholdsRoutes from "./src/routes/thresholds.routes.js";
import categoryRoutes from "./src/routes/category.routes.js";
import incomeCategoriesRoutes from "./src/routes/incomeCategories.routes.js";
import creditCardRoutes from "./src/routes/creditCard.routes.js";
import investmentRoutes from "./src/routes/investment.routes.js"; // ✅ nova importação
import stockRoutes from "./src/routes/stocks.routes.js";
import cryptoRoutes from "./src/routes/crypto.routes.js";
import macroRoutes from "./src/routes/macro.routes.js";

import dotenv from "dotenv";

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const app = express(); // Cria uma instância do Express

// Middleware para definir Content-Type
app.use((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
});

// Middlewares globais
app.use(
    cors({
        origin: ["https://finance-frontend-rzvo.onrender.com", "http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);
app.use(express.json());

// Rotas da API
app.use("/api/expenses", expensesRoutes);
app.use("/api/recurring-expenses", recurringRoutes);
app.use("/api/incomes", incomesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/thresholds", thresholdsRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/income-categories", incomeCategoriesRoutes);
app.use("/api/credit-cards", creditCardRoutes);
app.use("/api/investments", investmentRoutes); // ✅ nova rota registrada
app.use("/api/stocks", stockRoutes);
app.use("/api/crypto", cryptoRoutes);
app.use("/api/macro", macroRoutes);

// Inicia o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
