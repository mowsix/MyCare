import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo";              // ajusta la ruta si tu Logo.tsx está en otro sitio
import s from "./Splash.module.scss";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate("/login"), 3000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className={s.wrap}>
      {/* Header igual que Home */}

      {/* Contenido */}
      <div className={s.container}>
        <main className={s.main}>
          <div className={s.brandBox}>
            <Logo className={s.brandLogo} />
            <div className={s.brandText}>MYCARE</div>
          </div>

          <div className={s.track}>
            <div className={s.bar} />
          </div>

          <div className={s.hint}>Cargando…</div>
        </main>
      </div>
    </div>
  );
}
