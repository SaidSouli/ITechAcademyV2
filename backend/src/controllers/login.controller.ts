import bcrypt from "bcryptjs";
import { issueAccessToken } from "../lib/jwt.js";
import type { Request, Response } from "express";
import { loginSchema } from "../schemas/login.schema.js";
import prisma from "../lib/prisma.js";





const DUMMY_HASH = bcrypt.hashSync("timing-attack-prevent",10);

export async function login (req:Request,res:Response){
    const result = loginSchema.safeParse(req.body);
    if (!result.success){
        return res.status(400).json({message:"invalid login data",errors: result.error.issues})
    }
    const {email , password} = result.data

    try{
        const user = await prisma.user.findUnique({
            where:{email},
            select:{id:true,email:true,fullname:true,role:true,password:true}
        })
        if (!user){
            await bcrypt.compare(password,DUMMY_HASH);
            return res.status(401).json({message:"Invalid credential"});
        }
        const passwordOk = await bcrypt.compare(password , user.password);
        if (!passwordOk){
            return res.status(401).json({message:"Invalid credential"});    
        }

        return res.status(200).json({
            accessToken:issueAccessToken(user),
            user: {id:user.id , email: user.email,fullname: user.fullname, role:user.role}
        });
    }catch(error){
        console.error("Login error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}
//function ntesti biha
export async function me(req: Request, res: Response) {
    if (!req.user) {
        
        return res.status(401).json({ message: "Not authenticated" });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, email: true, fullname: true, role: true },
        });

        if (!user) {
            
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ user });
    } catch (error) {
        console.error("Me error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}