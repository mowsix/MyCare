import React, { useState } from "react";
import "./login.css";

type LoginProps = {
    logoSrc?: string;
    onSubmit?: (payload: { login: string; password: string }) => Promise<void> | void;
};

export default function Login({
    logoSrc = "/assets/mycare-logo.svg",
    onSubmit,
}: LoginProps) {
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
                await new Promise((r) => setTimeout(r, 700));
                if (!login || !password) throw new Error("Completa ambos campos");
            }
        } catch (err: any) {
            setError(err?.message || "No se pudo iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full grid place-items-center login-background p-4">
            {/* Marco teléfono */}
            <div className="w-[360px] max-w-full bg-white rounded-md shadow-2xl border border-neutral-200/60 overflow-hidden login-card">
                <form onSubmit={handleSubmit} className="px-8 pt-10 pb-8">
                    {/* Logo */}
                    <div className="flex flex-col items-center mb-10">
                        <img
                            src={logoSrc}
                            alt="MYCARE logo"
                            className="h-28 w-auto object-contain mb-3"
                        />
                        <div className="tracking-[0.35em] text-sm font-semibold text-neutral-800">MYCARE</div>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="login" className="block text-[13px] text-neutral-700 mb-1">Login</label>
                            <input
                                id="login"
                                type="text"
                                className="login-input"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                autoComplete="username"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-[13px] text-neutral-700 mb-1">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="login-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                        </div>
                    </div>

                    {/* Olvidaste tu contraseña */}
                    <div className="mt-4 mb-6 text-center">
                        <button type="button" className="text-[12px] text-neutral-500 hover:text-purple-500 transition">
                            olvidaste tu contraseña
                        </button>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-4 text-center text-[12px] text-red-600">{error}</div>
                    )}

                    {/* Botón principal */}
                    <div className="mb-5">
                        <button
                            type="submit"
                            disabled={loading}
                            className="login-button"
                        >
                            {loading ? "Ingresando…" : "Login"}
                        </button>
                    </div>

                    {/* No tengo cuenta + Registrarme */}
                    <div className="text-center">
                        <div className="text-[12px] text-neutral-500 mb-3">No tengo cuenta</div>
                        <button
                            type="button"
                            className="register-button"
                            onClick={() => alert("Aquí iría la navegación a Registrarme")}
                        >
                            Registrarme
                        </button>
                        <div className="mx-auto mt-4 h-2 w-24 rounded-full bg-purple-200" />
                    </div>
                </form>
            </div>
        </div>
    );
}
