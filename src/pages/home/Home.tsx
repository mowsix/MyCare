import React from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "../../assets/Logo";

/* -------------------------- ICONOS INLINE (SVG) -------------------------- */
const BellIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...p}>
    <path fill="currentColor" d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2Zm8-6V11a8 8 0 1 0-16 0v5l-2 2v1h20v-1l-2-2Z"/>
  </svg>
);

const HomeIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...p}>
    <path fill="currentColor" d="M12 3 2 12h3v9h6v-6h2v6h6v-9h3Z"/>
  </svg>
);

const PillIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...p}>
    <path fill="currentColor" d="M4 12a5 5 0 0 0 8 4l-7-7a4.98 4.98 0 0 0-1 3Zm9-4a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm-6.5.5 7 7"/>
  </svg>
);

const UserIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...p}>
    <path fill="currentColor" d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-5 0-9 2.5-9 5v1h18v-1c0-2.5-4-5-9-5Z"/>
  </svg>
);

const KitIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...p}>
    <path fill="currentColor" d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h3a2 2 0 0 1 2 2v3H3V8a2 2 0 0 1 2-2h3Zm2-2h4v2h-4V4Zm-7 9h18v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7Zm9 1h2v3h3v2h-3v3h-2v-3H7v-2h5v-3Z"/>
  </svg>
);

const CalendarIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...p}>
    <path fill="currentColor" d="M7 2h2v2h6V2h2v2h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3V2Zm13 8H4v10h16V10Z"/>
  </svg>
);

/* ------------------------- COMPONENTE TARJETA ITEM ------------------------ */
type CardProps = { icon: React.ReactNode; title: string; time: string };
function ReminderCard({ icon, title, time }: CardProps) {
  return (
    <div className="mx-4 mt-6 rounded-lg border border-neutral-700/60 bg-gray-200 px-4 py-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <div className="text-neutral-900 text-4xl">{icon}</div>
          <div className="text-2xl text-neutral-700">{title}</div>
        </div>
        <div className="text-xl font-medium text-neutral-900">{time}</div>
      </div>
    </div>
  );
}

/* ---------------------------------- HOME --------------------------------- */
export default function Home() {
  return (
    <div className="relative pb-28"> {/* pb para no tapar contenido con la barra */}
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Logo className="w-8 h-8 text-neutral-800" />
          <span className="tracking-[0.35em] text-[10px] font-semibold text-neutral-800">
            MYCARE
          </span>
        </div>
        <button aria-label="Notificaciones">
          <BellIcon className="w-6 h-6 text-neutral-900" />
        </button>
      </header>

      {/* Título */}
      <h1 className="px-6 pt-2 text-4xl font-semibold text-neutral-900">
        Próximos recordatorios
      </h1>

      {/* Caja resumen con dos filas */}
      <section className="mx-4 mt-6 rounded-lg border border-neutral-700/60 bg-gray-200">
        <div className="flex items-center justify-between px-5 py-4">
          <div className="text-neutral-800">Vitamina C</div>
          <div className="text-neutral-900 font-medium">8 PM</div>
        </div>
        <div className="h-px bg-neutral-400 mx-4" />
        <div className="flex items-center justify-between px-5 py-4">
          <div className="text-neutral-800">Mascarilla Saviloe</div>
          <div className="text-neutral-900 font-medium">9 PM</div>
        </div>
      </section>

      {/* Tarjetas individuales */}
      <ReminderCard icon={<KitIcon />}   title="Vitamina C"          time="8:00am" />
      <ReminderCard icon={<PillIcon />}  title="Isoface"             time="10:00am" />
      <ReminderCard icon={<UserIcon />}  title="Schwarzkopf coco"    time="9:00pm" />

      {/* Botón flotante calendario */}
      <Link
        to="/calendar"
        className="absolute right-4 bottom-24 grid place-items-center rounded-xl border border-neutral-800 bg-gray-200 px-3 py-2 shadow"
        aria-label="Abrir calendario"
      >
        <CalendarIcon className="w-8 h-8 text-neutral-900" />
        <div className="text-[10px] leading-3 mt-1 text-neutral-900 text-center">
          05<br/>FEB
        </div>
      </Link>

      {/* Barra de navegación inferior */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[393px] border-t border-neutral-700/60 bg-gray-300">
        <ul className="grid grid-cols-4">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `grid place-items-center py-3 ${isActive ? "bg-gray-400" : "bg-gray-300"}`
              }
              aria-label="Inicio"
            >
              <HomeIcon className="w-7 h-7 text-neutral-900" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/meds"
              className={({ isActive }) =>
                `grid place-items-center py-3 ${isActive ? "bg-gray-400" : "bg-gray-300"}`
              }
              aria-label="Medicamentos"
            >
              <PillIcon className="w-7 h-7 text-neutral-900" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `grid place-items-center py-3 ${isActive ? "bg-gray-400" : "bg-gray-300"}`
              }
              aria-label="Perfil"
            >
              <UserIcon className="w-7 h-7 text-neutral-900" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/kit"
              className={({ isActive }) =>
                `grid place-items-center py-3 ${isActive ? "bg-gray-400" : "bg-gray-300"}`
              }
              aria-label="Rutina"
            >
              <KitIcon className="w-7 h-7 text-neutral-900" />
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
