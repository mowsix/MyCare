import React from "react";
import { Link, NavLink } from "react-router-dom";
import s from "./Skin.module.scss";
import Logo from "../../assets/Logo";
import { useRoutine } from "../../lib/routineStore";

/* --------- Iconos (SVG inline, sin dependencias) ---------- */
const HomeIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M12 3 2 12h3v9h6v-6h2v6h6v-9h3Z"/></svg>
);
const PillIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M4 12a5 5 0 0 0 8 4l-7-7a4.98 4.98 0 0 0-1 3Zm9-4a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm-6.5.5 7 7"/></svg>
);
const UserIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-5 0-9 2.5-9 5v1h18v-1c0-2.5-4-5-9-5Z"/></svg>
);
const KitIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h3a2 2 0 0 1 2 2v3H3V8a2 2 0 0 1 2-2h3Zm2-2h4v2h-4V4Zm-7 9h18v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7Zm9 1h2v3h3v2h-3v3h-2v-3H7v-2h5v-3Z"/></svg>
);

/* Ícono para el header (gota/skin) */
const SkinIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M12 2c-3.5 4.3-6 7.6-6 10.5A6 6 0 0 0 12 19a6 6 0 0 0 6-6.5C18 9.6 15.5 6.3 12 2Z"/></svg>
);

export default function Skin() {
  // Solo elementos de categoría "piel"
  const { items } = useRoutine("piel");

  return (
    <div className={s.wrap}>
      <div className={s.container}>
        {/* Header */}
        <header className={s.header}>
          <div className={s.left}>
            <Logo className={s.logo} />
            <h1 className={s.titleTop}>Piel</h1>
          </div>
          <SkinIcon className={s.skinIcon} />
        </header>

        {/* Botón Mi SkinCare */}
        <button className={s.skinBtn}>Mi SkinCare</button>

        {/* Mis productos */}
        <h2 className={s.h2}>Mis productos</h2>
        <div className={s.products}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", color: "#64748b" }}>
              Aún no tienes productos de piel en tu rutina.
            </div>
          ) : (
            items.map((it) => (
              <button key={it.id} className={s.productBtn}>
                {it.name}
              </button>
            ))
          )}
        </div>

        {/* Crear rutina -> /routine */}
        <Link to="/routine" className={s.createBtn}>Crear rutina</Link>

        {/* Consejos (estático por ahora) */}
        <button className={s.tipsBtn}>Consejos</button>
      </div>

      {/* Barra inferior (misma que en Home/Meds) */}
      <nav className={s.nav} aria-label="Navegación inferior">
        <ul>
          <li>
            <NavLink to="/home" className={({isActive}) => `${s.tab} ${isActive ? s.active : ""}`} end>
              <HomeIcon />
            </NavLink>
          </li>
          <li>
            <NavLink to="/meds" className={({isActive}) => `${s.tab} ${isActive ? s.active : ""}`}>
              <PillIcon />
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className={({isActive}) => `${s.tab} ${isActive ? s.active : ""}`}>
              <UserIcon />
            </NavLink>
          </li>
          <li>
            <NavLink to="/routine" className={({isActive}) => `${s.tab} ${isActive ? s.active : ""}`}>
              <KitIcon />
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
