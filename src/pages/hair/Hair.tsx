import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import s from "./Hair.module.scss";
import Logo from "../../assets/Logo";
import { useRoutine } from "../../lib/routineStore";
import BottomNav from "../../components/BottomNav";

/* ---------- ICONOS INLINE ---------- */
/* Icono grande para el header: silueta con coleta */
const FaceIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-3.5 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm7 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM12 18c-2.2 0-4-1.3-4-3h2c0 .7.9 1 2 1s2-.3 2-1h2c0 1.7-1.8 3-4 3Z" /></svg>
);
/* Icono pequeño para la lista: mini-silueta de pelo/cola (para usar en botones) */
const SmallHair = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-3.5 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm7 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM12 18c-2.2 0-4-1.3-4-3h2c0 .7.9 1 2 1s2-.3 2-1h2c0 1.7-1.8 3-4 3Z" /></svg>
);
/* Icono para crear rutina: círculo con signo más */
const AddCircle = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm1 11h3v-2h-3V8h-2v3H8v2h3v3h2v-3Z" /></svg>
);

/* ---------- CONSEJOS PARA CABELLO ---------- */
const HAIR_TIPS = [
  "No laves tu pelo todos los días; 2-3 veces por semana mantiene aceites naturales.",
  "Usa acondicionador sólo de medios a puntas para evitar que la raíz se engrase.",
  "Protege tu cabello del calor usando un protector térmico antes de planchas/secador.",
  "Córtalo regularmente para eliminar puntas abiertas y mantener un aspecto sano.",
  "Si tienes cuero cabelludo seco, prueba un aceite ligero o masaje con aceite una vez a la semana.",
  "Evita cepillar el cabello mojado con fuerza; usa un peine de dientes anchos.",
];

export default function Hair() {
  // items de categoria "cabello"
  const { items } = useRoutine?.("cabello") ?? useRoutine();
  const products = useMemo(() => items?.slice?.() ?? [], [items]);

  // modal de consejos
  const [tipOpen, setTipOpen] = useState(false);
  const [currentTip, setCurrentTip] = useState<string | null>(null);

  function openTip() {
    const choice = HAIR_TIPS[Math.floor(Math.random() * HAIR_TIPS.length)];
    setCurrentTip(choice);
    setTipOpen(true);
  }
  function closeTip() {
    setTipOpen(false);
    setTimeout(() => setCurrentTip(null), 200);
  }

  return (
    <div className={s.wrap}>
        <header className={s.header}>
          <div className={s.logoWrap}>
            <Logo className={s.logo} />
          </div>

          <h1 className={s.titleTop}>Cabello</h1>

          <div className={s.headerRight}>
            <FaceIcon className={s.hairIcon} />
          </div>
        </header>
      <div className={s.container}>
        {/* Header: title centered, logo left, icon right */}


        {/* Section title */}
        <h2 className={s.h2}>Mis productos del cabello</h2>

        {/* Product list */}
        <div className={s.list}>
          {products.length === 0 ? (
            <>
              <button className={s.itemBtn}><span className={s.itemIcon}><SmallHair /></span> Saviloe Aloe vera</button>
              <button className={s.itemBtn}><span className={s.itemIcon}><SmallHair /></span> Loreal mora azul</button>
              <button className={s.itemBtn}><span className={s.itemIcon}><SmallHair /></span> Schwarzkopf coco</button>
            </>
          ) : (
            products.map((it: any) => (
              <button key={it.id} className={s.itemBtn}>
                <span className={s.itemIcon}><SmallHair /></span>
                <span className={s.itemName}>{it.name}</span>
              </button>
            ))
          )}

          {/* Crear rutina */}
          <Link to="/routine" className={s.createBtn}>
            <span>Crear Rutina</span>
            <AddCircle style={{ width: 26, height: 26 }} />
          </Link>
        </div>

        {/* Consejos */}
        <div className={s.tipsWrap}>
          <button className={s.tipsBtn} onClick={openTip}>Consejos</button>
        </div>
      </div>

      {/* Nav centering wrapper */}

          <BottomNav />


      {/* Modal */}
      {tipOpen && (
        <div className={s.modalBackdrop} onClick={closeTip} role="dialog" aria-modal="true">
          <div className={s.modalCard} onClick={(e) => e.stopPropagation()}>
            <h3 className={s.modalTitle}>Consejo para tu cabello</h3>
            <p className={s.modalText}>{currentTip}</p>
            <button className={s.modalClose} onClick={closeTip}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
