import "./style.css";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type Mode = "login" | "register";

function Usuario() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "register") {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/");
    } catch (err: unknown) {
      setError(translateError(err instanceof Error ? err.message : ""));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  // ── Usuario ya autenticado: muestra perfil ──
  if (user) {
    return (
      <div className="usuario-container">
        <h1>Perfil</h1>
        <div className="usuario-card">
          <h2>Sesión activa</h2>
          <p><span>Email:</span> {user.email}</p>
          <p><span>UID:</span> {user.uid.slice(0, 12)}…</p>
          <p>
            <span>Verificado:</span>{" "}
            {user.emailVerified ? "✅ Sí" : "⚠️ No verificado"}
          </p>
        </div>
        <button className="usuario-logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    );
  }

  // ── Formulario de login / registro ──
  return (
    <div className="usuario-container">
      <h1>Usuario</h1>

      {/* Tabs */}
      <div className="usuario-tabs">
        <button
          className={mode === "login" ? "active" : ""}
          onClick={() => { setMode("login"); setError(null); }}
        >
          Iniciar sesión
        </button>
        <button
          className={mode === "register" ? "active" : ""}
          onClick={() => { setMode("register"); setError(null); }}
        >
          Registrarse
        </button>
      </div>

      <div className="usuario-card">
        <h2>{mode === "login" ? "Bienvenido de nuevo" : "Crear cuenta"}</h2>

        <form className="usuario-form" onSubmit={handleSubmit}>
          <label>
            Correo electrónico
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              required
            />
          </label>

          <label>
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
            />
          </label>

          {error && <p className="usuario-error">{error}</p>}

          <button type="submit" className="usuario-submit" disabled={loading}>
            {loading ? "Cargando..." : mode === "login" ? "Iniciar sesión" : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
}

const translateError = (msg: string): string => {
  if (msg.includes("user-not-found"))    return "No existe una cuenta con ese correo.";
  if (msg.includes("wrong-password"))    return "Contraseña incorrecta.";
  if (msg.includes("email-already-in-use")) return "Ya existe una cuenta con ese correo.";
  if (msg.includes("weak-password"))    return "La contraseña debe tener al menos 6 caracteres.";
  if (msg.includes("invalid-email"))    return "El correo no tiene un formato válido.";
  if (msg.includes("too-many-requests")) return "Demasiados intentos. Intenta más tarde.";
  if (msg.includes("invalid-credential")) return "Correo o contraseña incorrectos.";
  return "Error al autenticar. Intenta de nuevo.";
};

export default Usuario;