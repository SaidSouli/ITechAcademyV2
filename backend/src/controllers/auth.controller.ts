
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";
import { registerSchema } from "../schemas/auth.schema.js";
import type { Request, Response } from "express";

export async function register(req: Request, res: Response) {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid registration data",
            errors: result.error.issues,
        });
    }

    const { fullname, email, password } = result.data;

    try {
        
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(409).json({
                message: "An account with this email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { fullname, email, password: hashedPassword },
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user.id,
                fullname: user.fullname,
                email: user.email,
                
            },
        });
    } catch (error:any) {
        // hatha fi 7al 2 request sarou at the same time
        if (error?.code === "P2002") {
            return res.status(409).json({
                message: "An account with this email already exists",
            });
        }

        console.error("Register error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
    
}
