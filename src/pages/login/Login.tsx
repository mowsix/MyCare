import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type LoginProps = {
  onSubmit?: (payload: { login: string; password: string }) => Promise<void> | void;
};


// ✅ Importa el SVG como componente (Vite soporta ?react)
import Logo from '../../assets/Logo';


export default function Login({ onSubmit }: LoginProps) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      if (onSubmit) {
        await onSubmit({ login, password });
      } else {
        await new Promise((r) => setTimeout(r, 600));
        if (!login || !password) throw new Error("Completa ambos campos");
      }
    } catch (err: any) {
      setError(err?.message || "No se pudo iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh w-full bg-white grid place-items-center p-4">
      <div className="login-sheet w-[360px] max-w-full bg-white">
        <form onSubmit={handleSubmit} className="login-body">
          {/* Header: Logo + marca */}
          <div className="flex flex-col items-center">
            {/* Tamaño y color del logo (usa currentColor en el SVG) */}
            <Logo className="w-20 h-20 text-purple-600 mb-6" />
            <div className="tracking-[0.35em] text-xl font-semibold text-neutral-800">
              MYCARE
            </div>
          </div>

          {/* Campo User */}
          <div className="mt-20">
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

          {/* Campo Password */}
          <div className="mt-14">
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

          {/* Olvidaste tu contraseña */}
          <div className="text-center mt-12">
            <button type="button" className="login-forgot">
              olvidaste tu contraseña
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="text-center text-[12px] text-red-600 mt-4">
              {error}
            </div>
          )}

          {/* Botón Login */}
          <div className="flex justify-center mt-16">
            <button type="submit" disabled={loading} className="login-primary-btn">
              {loading ? "Ingresando…" : "Login"}
            </button>
          </div>

          {/* Botón Registrarse */}
          <div className="flex justify-center mt-6">
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
