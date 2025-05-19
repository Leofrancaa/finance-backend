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

import dotenv from "dotenv";

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const app = express(); // Cria uma instância do Express

// Middleware para definir Content-Type (mantido)
app.use((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
});

// Middlewares globais
app.use(cors({
    origin: "https://finance-frontend-rzvo.onrender.com/", // ou o domínio do seu frontend
    credentials: true
})); // Habilita CORS para todas as rotas
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições

// Rotas
app.use("/api/expenses", expensesRoutes); // Registra as rotas de despesas
app.use("/api/recurring-expenses", recurringRoutes); // Registra as rotas de despesas recorrentes
app.use('/api/incomes', incomesRoutes); // Registra as rotas de receitas
app.use("/api/auth", authRoutes); // Registra as rotas de autenticação
app.use("/api/thresholds", thresholdsRoutes); // Registra as rotas de limites
app.use("/api/categories", categoryRoutes); // Registra as rotas de categorias de despesas
app.use("/api/income-categories", incomeCategoriesRoutes); // Registra as rotas de categorias de receita
app.use("/api/credit-cards", creditCardRoutes); // Registra as rotas de cartões de crédito

// Inicia o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

