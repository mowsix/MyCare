import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo";
import { useUsers } from "../../app/providers/users-store";

type LoginProps = {
  onSubmit?: (payload: { login: string; password: string }) => Promise<void> | void;
};

export default function Login({ onSubmit }: LoginProps) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { validate } = useUsers(); // ← usamos el store

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);

      if (onSubmit) {
        await onSubmit({ login, password });
      } else {
        await new Promise((r) => setTimeout(r, 300)); // pequeña simulación
        if (!login || !password) throw new Error("Completa ambos campos");

        const ok = validate(login, password);
        if (!ok) throw new Error("Usuario o contraseña inválidos");

        // éxito → navega donde quieras
        navigate("/home"); // o a /dashboard si lo tienes
      }
    } catch (err: any) {
      setError(err?.message || "No se pudo iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-root">
      <div className="login-sheet">
        <form onSubmit={handleSubmit} className="login-body">
          {/* Logo y marca */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Logo className="w-10 h-10 text-purple-600 mb-2" />
          </div>


          {/* <div className="flex flex-col items-center">
            <Logo className="w-10 h-10 text-purple-600 mb-6" />
          </div>

          <div className="mt-20"> */}

          <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ width: "100%", maxWidth: 320 }}></div>
            <label htmlFor="login" className="login-label">User</label>
            <input
              id="login"
              type="text"
              className="login-line-input"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              autoComplete="username"
            />
          </div>


          {/*<div className="mt-14"> */}
          <div style={{ width: "100%", maxWidth: 320 }}>
            <label htmlFor="password" className="login-label">Password</label>
            <input
              id="password"
              type="password"
              className="login-line-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {/*<div className="text-center mt-12">
            <label className="login-forgot">
              olvidaste tu contraseña
            </label>
          </div> */}

          <div style={{ width: "100%", maxWidth: 320, marginTop: 6 }}>
            <button className="login-forgot" type="button">olvidaste tu contraseña</button>
          </div>

          {error && (
            <div className="text-center text-[12px] text-red-600 mt-4">
              {error}
            </div>
          )}

          {/* <div className="flex justify-center mt-16"> */}
          <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 6 }}>
            <button type="submit" disabled={loading} className="login-primary-btn">
              {loading ? "Ingresando…" : "Login"}
            </button>
          </div>

          {/*<div className="flex justify-center mt-6">*/}
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="register-btn"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
