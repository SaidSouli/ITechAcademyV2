import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false); 
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                
                <Link className="navbar-brand" to="/courses">ITechAcademy</Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    aria-controls="navbarSupportedContent"
                    aria-expanded={open}
                    aria-label="Toggle navigation"
                    onClick={() => setOpen(!open)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        
                        {user && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/courses">Courses</NavLink>
                            </li>
                        )}
                    </ul>

                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        
                        {!user ? (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/register">Register</NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/courses/enrolled">My courses</NavLink>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link btn" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}