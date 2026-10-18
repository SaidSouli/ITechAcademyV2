import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

export default function Layout() {
    return (
        <>
            <Navbar />
            
            <div className="container mt-3">
                <Outlet /> 
            </div>
        </>
    );
}