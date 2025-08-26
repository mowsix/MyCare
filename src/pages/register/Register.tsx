import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../app/providers/users-store";
import Logo from "../../assets/Logo";
import s from "./Register.module.scss"; // Import styles

export default function Register() {
  const { register } = useUsers();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (!user || !pass || !confirm) throw new Error("Completa todos los campos");
      if (pass !== confirm) throw new Error("Las contraseñas no coinciden");
      register(user, pass);
      navigate("/login");
    } catch (err: any) {
      setError(err?.message || "No se pudo registrar");
    }
  };

  return (
    <div className={s.wrap}>
      <form onSubmit={onSubmit} className={s.form}>
        <div className={s.logoContainer}>
          <Logo className={s.logo} />
        </div>

        <div className={s.inputGroup}>
          <label htmlFor="reg-user" className={s.label}>
            Usuario
          </label>
          <input
            id="reg-user"
            type="text"
            className={s.input}
            placeholder=""
            autoComplete="username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>

        <div className={s.inputGroup}>
          <label htmlFor="reg-pass" className={s.label}>
            Contraseña
          </label>
          <input
            id="reg-pass"
            type="password"
            className={s.input}
            placeholder=""
            autoComplete="new-password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>

        <div className={s.inputGroup}>
          <label htmlFor="reg-confirm" className={s.label}>
            Confirmar contraseña
          </label>
          <input
            id="reg-confirm"
            type="password"
            className={s.input}
            placeholder=""
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        {error && <div className={s.error}>{error}</div>}

        <button type="submit" className={s.button}>
          Registrarse
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className={s.secondaryButton}
        >
          Volver
        </button>
      </form>
    </div>
  );
}