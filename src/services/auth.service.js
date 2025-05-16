import { getDatabase } from "../database/mongo.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "seusegredo";

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatePassword(password) {
    // Pelo menos 6 caracteres, 1 letra maiúscula, 1 caractere especial
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;
    return regex.test(password);
}

export async function registerUser({ name, email, password }) {
    const db = await getDatabase();

    if (!validateEmail(email)) {
        throw new Error("Email inválido.");
    }

    if (!validatePassword(password)) {
        throw new Error(
            "Senha fraca. Use no mínimo 6 caracteres, 1 letra maiúscula e 1 caractere especial."
        );
    }

    const existing = await db.collection("users").findOne({ email });

    if (existing) {
        throw new Error("Este email já está cadastrado.");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await db.collection("users").insertOne({
        name,
        email,
        passwordHash,
    });

    const token = jwt.sign(
        { id: result.insertedId, name, email },
        JWT_SECRET,
        { expiresIn: "7d" }
    );

    return {
        token,
        user: {
            id: result.insertedId,
            name,
            email,
        },
    };
}

export async function authenticateUser(email, password) {
    const db = await getDatabase();
    const user = await db.collection("users").findOne({ email });

    if (!user) {
        throw new Error("Usuário não encontrado.");
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
        throw new Error("Senha incorreta.");
    }

    const token = jwt.sign(
        { id: user._id, name: user.name, email: user.email },
        JWT_SECRET,
        { expiresIn: "7d" }
    );

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    };
}
