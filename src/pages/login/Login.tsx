import React, { useState } from "react";

import logo from "../../assets/logo.png";

type LoginProps = {
  onSubmit?: (payload: { login: string; password: string }) => Promise<void> | void;
};

export default function Login({ onSubmit }: LoginProps) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <div className="min-h-dvh w-full bg-neutral-900 grid place-items-center p-4">
      <div className="login-sheet w-[360px] max-w-full bg-white">
        <form onSubmit={handleSubmit} className="login-body">
          <div className="flex flex-col items-center">
            <img
                src={logo}
                alt="MYCARE logo"
                className="h-24 w-auto object-contain mb-6 md:h-28"  // antes: h-40
                draggable={false}
            />
            <div className="tracking-[0.35em] text-xl font-semibold text-neutral-800">MYCARE</div>
          </div>

          <div className="mt-20">
            <label htmlFor="login" className="login-label">Login</label>
            <input
              id="login"
              type="text"
              className="login-line-input"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              autoComplete="username"
            />
          </div>

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

          <div className="text-center mt-12">
            <button type="button" className="login-forgot">olvidaste tu contraseña</button>
          </div>

          {error && <div className="text-center text-[12px] text-red-600 mt-4">{error}</div>}

          <div className="flex justify-center mt-16">
            <button type="submit" disabled={loading} className="login-primary-btn">
              {loading ? "Ingresando…" : "Login"}
            </button>
          </div>

          <div className="text-center mt-8">
            <div className="text-sm text-neutral-400">No tengo cuenta</div>
            <div className="mx-auto mt-4 h-2 w-28 rounded-full bg-neutral-300/80" />
          </div>
        </form>
      </div>
    </div>
  );
}
