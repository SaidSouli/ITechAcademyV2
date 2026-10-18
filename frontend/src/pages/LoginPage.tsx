import { useState, type SubmitEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function LoginPage(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        setLoading(true);

        
            await login(email , password);
            navigate("/courses");
       
            setLoading(false);
        
        
    }
    return(
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input 
                type="email" 
                placeholder="your email" 
                value={email} 
                onChange={(e)=> setEmail(e.target.value)} 
            />
            <input 
                type="password"
                placeholder="your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}

            />
            <button type="submit" disabled={loading}>
                {loading ? "Logging in ...":"Login"}
            </button>

        </form>
    );
}