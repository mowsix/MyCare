import React from "react";
import { NavLink } from "react-router-dom";
import s from "./BottomNav.module.scss";

/* Iconos inline */
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

export default function BottomNav() {
  return (
    <nav className={s.nav} aria-label="Navegación inferior">
      <ul>
        <li>
          <NavLink to="/home" end className={({isActive}) => `${s.tab} ${isActive ? s.active : ""}`}>
            <HomeIcon />
          </NavLink>
        </li>
        <li>
          <NavLink to="/meds" className={({isActive}) => `${s.tab} ${isActive ? s.active : ""}`}>
            <PillIcon />
          </NavLink>
        </li>
        <li>
          <NavLink to="/hair" className={({isActive}) => `${s.tab} ${isActive ? s.active : ""}`}>
            <UserIcon />
          </NavLink>
        </li>
        <li>
          <NavLink to="/skin" className={({isActive}) => `${s.tab} ${isActive ? s.active : ""}`}>
            <KitIcon />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
