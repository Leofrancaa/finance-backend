import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "seusegredo";

export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token não fornecido." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id; // 👈 Agora todos os controllers terão req.userId
        next();
    } catch (err) {
        return res.status(401).json({ error: "Token inválido." });
    }
}
