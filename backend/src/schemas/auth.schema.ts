import * as z from "zod";

export const registerSchema = z.object({
    fullname: z
    .string()
    .trim()
    .min(1 , {error: "fullname is required"})
    .max(255),

    email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email({error: "invalid email address"})),

    password: z
    .string()
    .min(8,{error:'password must be at least 8 characters'}),

});

export type RegisterInput = z.infer<typeof registerSchema>;