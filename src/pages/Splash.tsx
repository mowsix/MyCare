import React from "react";
import logo from "../assets/logo.png";

export default function Splash() {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-sky-600 to-sky-700 text-white flex items-center justify-center p-[max(16px,env(safe-area-inset-top))]">
      <div className="w-full max-w-xs flex flex-col items-center">
        <div className="w-32 h-32 rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-xl">
          <img
            src={logo}
            alt="Logo"
            className="w-20 h-20 object-contain animate-pulse"
            draggable={false}
          />
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-white/95">
          Mi App
        </h1>
        <p className="mt-2 text-sm text-white/80">
          Cargando…
        </p>

        {/* Barra de progreso simple */}
        <div className="mt-6 w-full h-2 rounded-full bg-white/20 overflow-hidden">
          <div className="h-full w-1/3 bg-white/80 animate-[loading_1.2s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
