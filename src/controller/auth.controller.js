import { registerUser, authenticateUser } from "../services/auth.service.js";

export async function register(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Preencha todos os campos." });
        }

        const user = await registerUser({ name, email, password }); // 👈 delega para o service

        res.status(201).json(user);
    } catch (error) {
        console.error("Erro ao registrar:", error);
        res.status(400).json({ error: error.message || "Erro ao registrar usuário." });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Preencha email e senha." });
        }

        const { token, user } = await authenticateUser(email, password);

        res.json({ token, user });
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        res.status(401).json({ error: error.message || "Credenciais inválidas." });
    }
}
