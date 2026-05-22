import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
        <p style={{ color: "#888", fontSize: "0.95rem" }}>Verificando sesión...</p>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/Usuario" replace />;
};

export default ProtectedRoute;