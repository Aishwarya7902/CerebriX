import { Navigate, Outlet } from "react-router-dom";



export function ProtectedRoute() {
    const isAuthenticated = !!localStorage.getItem("token");

    return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
}

