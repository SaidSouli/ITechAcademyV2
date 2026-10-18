import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./component/protectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./component/layout";
import CoursesPage from "./pages/courses";
import CourseShow from "./pages/CourseShow";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<LoginPage />} />

                        <Route element={<ProtectedRoute />}>
                            <Route path="/courses" element={<CoursesPage/>} />
                            <Route path="/courses/:id" element={<CourseShow/>} />
                            
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}