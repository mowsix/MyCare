import React from "react";
import { NavLink } from "react-router-dom";
import s from "./BottomNav.module.scss";

/* Iconos inline */
const HomeIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M12 3 2 12h3v9h6v-6h2v6h6v-9h3Z" /></svg>
);
const PillIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M10.5 3.5 3.5 10.5a4 4 0 0 0 5.66 5.66L16.16 8.66A4 4 0 0 0 10.5 3.5zM13 6.5h.01" /></svg>
);
const UserIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-5 0-9 2.5-9 5v1h18v-1c0-2.5-4-5-9-5Z" /></svg>
);
const KitIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M12 2c-3.5 4.3-6 7.6-6 10.5A6 6 0 0 0 12 19a6 6 0 0 0 6-6.5C18 9.6 15.5 6.3 12 2Z" /></svg>
);

export default function BottomNav() {
  return (
    // Por defecto la fijamos al fondo y alineada a la izquierda del “móvil”
    <nav className={`${s.nav} ${s.fixedLeft}`} aria-label="Navegación inferior">
      {/* Si prefieres en flujo normal, usa:  <nav className={s.nav} ...>  */}
      <ul className={s.list}>
        <li className={s.item}>
          <NavLink to="/home" end className={({ isActive }) => `${s.tab} ${isActive ? s.active : ""}`}>
            <HomeIcon />
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/meds" className={({ isActive }) => `${s.tab} ${isActive ? s.active : ""}`}>
            <PillIcon />
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/hair" className={({ isActive }) => `${s.tab} ${isActive ? s.active : ""}`}>
            <UserIcon />
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/skin" className={({ isActive }) => `${s.tab} ${isActive ? s.active : ""}`}>
            <KitIcon />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
