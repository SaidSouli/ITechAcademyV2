import jwt from "jsonwebtoken"
import authConfig from "../config/auth.config.js"


export function issueAccessToken(user:{id: number , role: string}){
    return jwt.sign({sub: String(user.id), role: user.role}, authConfig.accessSecret,{expiresIn:authConfig.secret_expires_in});
}

export function issueRefreshToken (user: {id:number,role:string}){
    return jwt.sign({sub:String(user.id),role:user.role},authConfig.refresh_secret,{expiresIn:authConfig.refresh_expires_in});
}