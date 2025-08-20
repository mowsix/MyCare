// src/pages/Splash.tsx  (según tu ruta actual)
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";  // <-- ajusta si cambiaste la carpeta

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate("/login"), 3000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="min-h-dvh w-full grid place-items-center bg-gradient-to-b from-sky-600 to-sky-700 p-6">
      <div className="w-full max-w-[393px] bg-white/10 backdrop-blur-sm rounded-3xl shadow-xl p-10 flex flex-col items-center">
        <div className="w-28 h-28 rounded-2xl bg-white/15 grid place-items-center shadow">
          <img src={logo} alt="Logo" className="w-16 h-16 object-contain animate-pulse" />
        </div>
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-white">MYCARE</h1>
        <p className="mt-2 text-white/80">Cargando…</p>
        <div className="mt-6 w-full h-2 rounded-full bg-white/30 overflow-hidden">
          <div className="h-full w-1/3 bg-white/90 animate-[loading_1.2s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
