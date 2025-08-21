import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo";
import s from "./Home.module.scss";
import { useRoutine, formatTime } from "../../lib/routineStore";
import BottomNav from "../../components/BottomNav";

/* -------------------------- ICONOS INLINE (SVG) -------------------------- */
const BellIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2Zm8-6V11a8 8 0 1 0-16 0v5l-2 2v1h20v-1l-2-2Z"/></svg>
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
const SpoonIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M10 2a6 6 0 0 0-6 6c0 2.2 1.2 4.1 3 5.1V21a1 1 0 0 0 2 0v-7.9c1.8-1 3-2.9 3-5.1a6 6 0 0 0-2-4Z"/></svg>
);

/* ------------------------- Card reutilizable ------------------------ */
type IconKind = "kit+spoon" | "pill" | "user";
type CardProps = { title: string; time: string; icon: IconKind };
function ReminderCard({ title, time, icon }: CardProps) {
  return (
    <div className={s.card}>
      <div className={s.left}>
        <div className={s.iconPair}>
          {icon === "kit+spoon" && (
            <>
              <div className={s.iconCircle}><KitIcon /></div>
              <div className={s.iconCircle}><SpoonIcon /></div>
            </>
          )}
          {icon === "pill" && <div className={s.iconCircle}><PillIcon /></div>}
          {icon === "user" && <div className={s.iconCircle}><UserIcon /></div>}
        </div>
        <div className={s.cardTitle}>{title}</div>
      </div>
      <div className={s.cardTime}>{time}</div>
    </div>
  );
}

/* Helpers */
function minutesOfDay(hour: number, minute: number, mer: "AM" | "PM") {
  const h12 = hour % 12;
  const h24 = mer === "PM" ? h12 + 12 : h12;
  return h24 * 60 + minute;
}
const MONTHS_ES = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"];

/* ---------------------------------- HOME --------------------------------- */
export default function Home() {
  const { items } = useRoutine(); // todos los items guardados
  const now = new Date();
  const todayIdx = now.getDay(); // 0..6 -> D..S

  // Filtrar SOLO los de hoy y ordenarlos por hora
  const todays = useMemo(() => {
    const list = items.filter((it) => (it.days || []).includes(todayIdx));
    return list.sort((a, b) =>
      minutesOfDay(a.hour, a.minute, a.meridiem) - minutesOfDay(b.hour, b.minute, b.meridiem)
    );
  }, [items, todayIdx]);

  // Top 2 para el resumen
  const summary = todays.slice(0, 2);

  // Icono según categoría
  const iconFor = (cat: "pastillas" | "piel" | "cabello"): IconKind => {
    if (cat === "pastillas") return "pill";
    if (cat === "piel") return "user";
    return "kit+spoon"; // cabello
  };

  // Chip calendario dinámico
  const day = String(now.getDate()).padStart(2, "0");
  const mon = MONTHS_ES[now.getMonth()];

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
          {summary.length === 0 ? (
            <div className={s.summaryRow}>
              <div>No hay recordatorios para hoy</div>
              <div className={s.summaryTime}>—</div>
            </div>
          ) : (
            summary.map((it) => (
              <div key={it.id} className={s.summaryRow}>
                <div>{it.name}</div>
                <div className={s.summaryTime}>{formatTime(it.hour, it.minute, it.meridiem)}</div>
              </div>
            ))
          )}
        </section>

        {/* Tarjetas del día */}
        {todays.map((it) => (
          <ReminderCard
            key={it.id}
            title={it.name}
            time={formatTime(it.hour, it.minute, it.meridiem)}
            icon={iconFor(it.category)}
          />
        ))}
      </div>

      {/* Chip calendario */}
      <Link to="/calendar" className={s.calendar} aria-label="Abrir calendario">
        <div className="day" style={{fontWeight:900}}>{day}</div>
        <div className="mon">{mon}</div>
      </Link>

      {/* Barra de navegación unificada */}
      <BottomNav />
    </div>
  );
}
