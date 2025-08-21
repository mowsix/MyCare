import React from "react";
import { Link, NavLink } from "react-router-dom";
import s from "./Meds.module.scss";
import Logo from "../../assets/Logo";
import { useRoutine, formatTime } from "../../lib/routineStore";
import BottomNav from "../../components/BottomNav";

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
const PlusIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6Z"/></svg>
);

export default function Meds() {
  // Solo elementos de categoría "pastillas"
  const { items } = useRoutine("pastillas");

  return (
    <div className={s.wrap}>
      <div className={s.container}>
        {/* Header */}
        <header className={s.header}>
          <div className={s.left}>
            <Logo className={s.logo} />
            <h1 className={s.titleTop}>Pastillas</h1>
          </div>
          <PillIcon className={s.pillBig} />
        </header>

        {/* Título central */}
        <h2 className={s.h2}>Mis Píldoras</h2>

        {/* Lista en caja */}
        <section className={s.listBox}>
          {items.length === 0 ? (
            <p style={{ textAlign: "center", color: "#64748b" }}>
              Aún no tienes pastillas en tu rutina. Crea una desde “Crear Rutina”.
            </p>
          ) : (
            <ul className={s.list}>
              {items.map((it) => (
                <li key={it.id}>
                  {it.name}
                  {/* Si quieres mostrar la hora, la añadimos en chico */}
                  <small style={{ display: "block", color: "#64748b", marginTop: 2 }}>
                    {formatTime(it.hour, it.minute, it.meridiem)}
                  </small>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* CTA: Crear Rutina */}
        <Link to="/routine" className={s.createBtn} aria-label="Crear Rutina">
          <span>Crear Rutina</span>
          <span className={s.plusWrap}><PlusIcon className={s.plus} /></span>
        </Link>
      </div>

      {/* Navegación inferior */}
      <BottomNav />
    </div>
  );
}
