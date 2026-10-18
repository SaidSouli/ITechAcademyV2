// na3mlou verification lil data ili bich na5dhouha mil .env 
// secure and scalable 

import "dotenv/config";
import type { SignOptions } from "jsonwebtoken";
import * as z from "zod";

const envSchema = z.object({
    JWT_ACCESS_SECRET: z.string().min(1),
    JWT_ACCESS_EXPIRES_IN: z.string().min(1),
    JWT_REFRESH_SECRET: z.string().min(1),
    JWT_REFRESH_EXPIRES_IN: z.string().min(1),

});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success){
    console.error("Missing or invalid auth env variables")
    process.exit(1);
}

const authConfig = {
    accessSecret: parsed.data.JWT_ACCESS_SECRET,
    secret_expires_in: parsed.data.JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"] ,
    refresh_secret: parsed.data.JWT_REFRESH_SECRET,
    refresh_expires_in: parsed.data.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"],
    
}

export default authConfig;