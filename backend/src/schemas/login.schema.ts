import * as z from "zod";

export const loginSchema = z.object({
    email: z
    .string()
    .trim()
    .toLowerCase(),
    
    password: z
    .string()
    .min(1 , "password is required")
});