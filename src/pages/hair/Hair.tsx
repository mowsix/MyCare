import React from "react";
import { Link, NavLink } from "react-router-dom";
import s from "./Hair.module.scss";
import Logo from "../../assets/Logo";
import { useRoutine } from "../../lib/routineStore";
import BottomNav from "../../components/BottomNav";

/* --------- Iconos (SVG inline) ---------- */
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
/* Carita para header */
const FaceIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...p}>
    <path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-3.5 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm7 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM12 18c-2.2 0-4-1.3-4-3h2c0 .7.9 1 2 1s2-.3 2-1h2c0 1.7-1.8 3-4 3Z"/>
  </svg>
);
const AddCircle = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm1 11h3v-2h-3V8h-2v3H8v2h3v3h2v-3Z"/></svg>
);

export default function Hair() {
  // Solo items de categoría "cabello"
  const { items } = useRoutine("cabello");

  return (
    <div className={s.wrap}>
      <div className={s.container}>
        {/* Header */}
        <header className={s.header}>
          <div className={s.left}>
            <Logo className={s.logo} />
            <h1 className={s.titleTop}>Cabello</h1>
          </div>
          <FaceIcon className={s.hairIcon} />
        </header>

        {/* Sección */}
        <h2 className={s.h2}>Shampoos & Acondicionadores</h2>

        {/* Lista desde RoutineDB (cabello) */}
        <div className={s.list}>
          {items.length === 0 ? (
            <>
              <button className={s.itemBtn}>Saviloe Aloe vera</button>
              <button className={s.itemBtn}>Loreal mora azul</button>
              <button className={s.itemBtn}>Schwarzkopf coco</button>
            </>
          ) : (
            items.map((it) => (
              <button key={it.id} className={s.itemBtn}>
                {it.name}
              </button>
            ))
          )}

          {/* Crear rutina -> /routine */}
          <Link to="/routine" className={s.createBtn}>
            <span>Crear Rutina</span>
            <AddCircle style={{ width: 28, height: 28 }} />
          </Link>
        </div>

        {/* Consejos */}
        <div className={s.tipsWrap}>
          <button className={s.tipsBtn}>Consejos</button>
        </div>
      </div>

      {/* Barra inferior (misma de Home/Meds/Skin) */}
      <BottomNav />
    </div>
  );
}
