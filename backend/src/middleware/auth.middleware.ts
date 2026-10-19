import type { NextFunction, Request,Response } from "express";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config.js";

export function requireAuth(req: Request , res:Response , next: NextFunction){
    const authHeader = req.headers.authorization 
    if (!authHeader?.startsWith("Bearer")){
        return res.status(401).json({Message:"Missing auth head"});
    }   

    const token = authHeader?.slice("bearer ".length) ?? "";

    try{
        const payload = jwt.verify(token , authConfig.accessSecret,{algorithms:["HS256"]});

        if (typeof payload === "string" || typeof payload.sub !=="string" || typeof payload.role !== "string"){
            return res.status(401).json({Message:"Invalid or expired token"})
        }

        req.user = {id:Number(payload.sub), role:payload.role};
        next();
    }catch{
        return res.status(401).json({Message:"Invalid or missing token"});

    }
}