import { useState } from "react";
import type { SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault(); 
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullname, email, password }),
            });

            const data = await res.json();

            
            if (res.status === 409) {
                setError(data.message);
                return;
            }

            if (!res.ok) {
                setError(data.message ?? "Something went wrong");
                return;
            }

            navigate("/login"); 
        } catch {
            setError("Could not reach the server");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <input
                type="text"
                placeholder="Full name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <button type="submit" disabled={loading}>
                {loading ? "Registering..." : "Register"}
            </button>

            <p>
                Already have an account? <Link to="/login">Log in</Link>
            </p>
        </form>
    );
}