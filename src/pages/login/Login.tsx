import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo";
import { useUsers } from "../../app/providers/users-store";
import s from "./Login.module.scss"; // Import styles

type LoginProps = {
  onSubmit?: (payload: { login: string; password: string }) => Promise<void> | void;
};

export default function Login({ onSubmit }: LoginProps) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { validate } = useUsers();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);

      if (onSubmit) {
        await onSubmit({ login, password });
      } else {
        await new Promise((r) => setTimeout(r, 300));
        if (!login || !password) throw new Error("Completa ambos campos");

        const ok = validate(login, password);
        if (!ok) throw new Error("Usuario o contraseña inválidos");

        navigate("/home");
      }
    } catch (err: any) {
      setError(err?.message || "No se pudo iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={s.wrap}>
      <form onSubmit={handleSubmit} className={s.form}>
        <div className={s.logoContainer}>
          <Logo className={s.logo} />
        </div>

        <div className={s.inputGroup}>
          <label htmlFor="login" className={s.label}>
            Usuario
          </label>
          <input
            id="login"
            type="text"
            className={s.input}
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div className={s.inputGroup}>
          <label htmlFor="password" className={s.label}>
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            className={s.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        <button className={s.secondaryButton} type="button">
          ¿Olvidaste tu contraseña?
        </button>

        {error && <div className={s.error}>{error}</div>}

        <button type="submit" disabled={loading} className={s.button}>
          {loading ? "Ingresando…" : "Login"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/register")}
          className={s.secondaryButton}
        >
          <u>Registrarme</u>
        </button>
      </form>
    </div>
  );
}