import React from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "../../assets/Logo";
import s from "./Home.module.scss";

/* -------------------------- ICONOS INLINE (SVG) -------------------------- */
const BellIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2Zm8-6V11a8 8 0 1 0-16 0v5l-2 2v1h20v-1l-2-2Z"/></svg>
);
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
const CalendarIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M7 2h2v2h6V2h2v2h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3V2Zm13 8H4v10h16V10Z"/></svg>
);
const SpoonIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M10 2a6 6 0 0 0-6 6c0 2.2 1.2 4.1 3 5.1V21a1 1 0 0 0 2 0v-7.9c1.8-1 3-2.9 3-5.1a6 6 0 0 0-2-4Z"/></svg>
);

/* ------------------------- Card reutilizable ------------------------ */
type CardProps = { title: string; time: string; icons?: "kit+spoon" | "pill" | "user" };
function ReminderCard({ title, time, icons = "pill" }: CardProps) {
  return (
    <div className={s.card}>
      <div className={s.left}>
        <div className={s.iconPair}>
          {icons === "kit+spoon" && (
            <>
              <div className={s.iconCircle}><KitIcon /></div>
              <div className={s.iconCircle}><SpoonIcon /></div>
            </>
          )}
          {icons === "pill" && <div className={s.iconCircle}><PillIcon /></div>}
          {icons === "user" && <div className={s.iconCircle}><UserIcon /></div>}
        </div>
        <div className={s.cardTitle}>{title}</div>
      </div>
      <div className={s.cardTime}>{time}</div>
    </div>
  );
}

/* ---------------------------------- HOME --------------------------------- */
export default function Home() {
  return (
    <div className={s.wrap}>
      <div className={s.container}>
        {/* Header */}
        <header className={s.header}>
          <Logo className={s.logo} />
          <button aria-label="Notificaciones"><BellIcon className={s.bell} /></button>
        </header>

        {/* Título */}
        <h1 className={s.title}>Próximos recordatorios</h1>

        {/* Caja resumen */}
        <section className={s.summary}>
          <div className={s.summaryRow}>
            <div>Vitamina C</div>
            <div className={s.summaryTime}>8 PM</div>
          </div>
          <div className={s.summaryRow}>
            <div>Mascarilla Saviloe</div>
            <div className={s.summaryTime}>9 PM</div>
          </div>
        </section>

        {/* Tarjetas */}
        <ReminderCard icons="kit+spoon" title="Vitamina C"       time="8:00am" />
        <ReminderCard icons="pill"       title="Isoface"          time="10:00am" />
        <ReminderCard icons="user"       title="Schwarzkopf coco" time="9:00pm" />
      </div>

      {/* Chip calendario */}
      <Link to="/calendar" className={s.calendar} aria-label="Abrir calendario">
        <div className="day" style={{fontWeight:900}}>05</div>
        <div className="mon">FEB</div>
      </Link>

      {/* Barra de navegación inferior */}
      <nav className={s.nav} aria-label="Navegación inferior">
        <ul>
          <li>
            <NavLink to="/home" className={({isActive}) => isActive ? "active" : "" } end>
              <HomeIcon />
            </NavLink>
          </li>
          <li>
            <NavLink to="/meds" className={({isActive}) => isActive ? "active" : "" }>
              <PillIcon />
            </NavLink>
          </li>
          <li>
            <NavLink to="/kit" className={({isActive}) => isActive ? "active" : "" }>
              <UserIcon />
            </NavLink>
          </li>
          <li>
            <NavLink to="/skin" className={({isActive}) => isActive ? "active" : "" }>
              <KitIcon />
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
