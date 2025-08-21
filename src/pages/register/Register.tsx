import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../app/providers/users-store";
import Logo from "../../assets/Logo";

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
    <div className="auth-root">
      <div className="w-[360px] max-w-full bg-white">
        {/* Header: Logo + marca */}
        <div className="flex flex-col items-center">
          <Logo className="w-28 h-28 text-neutral-700" />
        </div>
        <form onSubmit={onSubmit} className="mt-16 space-y-6 px-6">
          <div>
            <label htmlFor="reg-user" className="login-label">Usuario</label>
            <input
              id="reg-user"
              className="w-full rounded-md border-2 border-gray-400 px-6 py-4 text-2xl placeholder-gray-400 outline-none"
              placeholder=""
              autoComplete="username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="reg-pass" className="login-label">Contraseña</label>
            <input
              id="reg-pass"
              type="password"
              className="w-full rounded-md border-2 border-gray-400 px-6 py-4 text-2xl placeholder-gray-400 outline-none"
              placeholder=""
              autoComplete="new-password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="reg-confirm" className="login-label">Confirmar contraseña</label>
            <input
              id="reg-confirm"
              type="password"
              className="w-full rounded-md border-2 border-gray-400 px-6 py-4 text-2xl placeholder-gray-400 outline-none"
              placeholder=""
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          {error && (
            <div className="text-center text-sm text-red-600">{error}</div>
          )}

          {/* Botón píldora grande “Registrarse” */}
          <div className="flex justify-center pt-10">
            <button
              type="submit"
              className="h-16 w-72 rounded-full border border-black bg-gray-300 text-2xl font-bold"
            >
              Registrarse
            </button>
          </div>

          {/* Botón píldora pequeño “Volver” */}
          <div className="flex justify-center pt-6">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="h-10 w-40 rounded-full border border-black bg-gray-300 text-lg font-semibold"
            >
              Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
