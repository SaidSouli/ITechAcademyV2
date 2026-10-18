// context to store log state to prevent prop drillin
// remember who logged in , logs in or out user , share the log status with all react component 
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import api from "../lib/api";

type User = { id: number; email: string; fullname: string; role: string };

type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    

    const savedUser = localStorage.getItem("user");
    const initialUser = savedUser ? JSON.parse(savedUser) : null;
    const [user, setUser] = useState<User | null>(initialUser);

    async function login(email: string, password: string) {
        // axios howa ili y7ot JSON body in res.data — https://axios-http.com/docs/res_schema
        const res = await api.post("/auth/login", { email, password });
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
    }

    function logout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used inside <AuthProvider>");
    }
    return ctx;
}