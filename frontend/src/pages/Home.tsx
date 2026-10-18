//just for test
import { useAuth } from "../context/AuthContext";

export default function Home() {
    const { user, logout } = useAuth();

    return (
        <div>
            <h1>Hi {user?.fullname}</h1>
            <p>Role: {user?.role}</p>
            <button onClick={logout}>Log out</button>
        </div>
    );
}