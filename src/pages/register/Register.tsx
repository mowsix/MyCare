import React, { useState } from "react";
import { useUsers } from "../../app/providers/users-store";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useUsers();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (!user || !pass) throw new Error("Completa usuario y contraseña");
      if (pass !== confirm) throw new Error("Las contraseñas no coinciden");
      register(user, pass);          // ← agrega al store + localStorage
      navigate("/login");            // vuelve al login
    } catch (err: any) {
      setError(err?.message || "No se pudo registrar");
    }
  };

  return (
    <div className="min-h-dvh w-full flex items-center justify-center bg-white">
      <div className="w-[360px] max-w-full bg-white border rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-center text-neutral-800 mb-6">
          Registrarse
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="user" className="block text-sm text-neutral-700 mb-1">Usuario</label>
            <input
              id="user"
              className="w-full border rounded px-3 py-2"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="pass" className="block text-sm text-neutral-700 mb-1">Contraseña</label>
            <input
              id="pass"
              type="password"
              className="w-full border rounded px-3 py-2"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <div>
            <label htmlFor="confirm" className="block text-sm text-neutral-700 mb-1">Confirmar contraseña</label>
            <input
              id="confirm"
              type="password"
              className="w-full border rounded px-3 py-2"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          {error && <div className="text-center text-sm text-red-600">{error}</div>}

          <button
            type="submit"
            className="w-full mt-2 rounded-full bg-purple-600 text-white font-semibold py-3"
          >
            Crear cuenta
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full mt-3 rounded-full border-2 border-purple-400 text-purple-600 font-semibold py-3"
          >
            Volver a Login
          </button>
        </form>
      </div>
    </div>
  );
}
