import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { comparePassword } from '../utils/hash';
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const prisma = new PrismaClient();

export const loginHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
             res.status(401).json({ error: "Invalid credentials" });
        }

        const isValid = comparePassword(password, user.password);
        if (!isValid) {
            res.status(401).json({ error: "Invalid credentials" });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in the environment");
        }

        const token = Jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

         res.json({ token });
    } catch (error) {
        console.error("Error in loginHandler:", error);
         res.status(500).json({ error: "Internal server error" });
    }
};