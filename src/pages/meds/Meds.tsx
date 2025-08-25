import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import s from "./Meds.module.scss";
import Logo from "../../assets/Logo";
import { useRoutine, formatTime } from "../../lib/routineStore";
import BottomNav from "../../components/BottomNav";

/* ---------- ICONOS INLINE ---------- */
const PillBig = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M20.6 7.4a5 5 0 0 0-7.07-7.07L3.4 10.5a5 5 0 0 0 7.07 7.07L20.6 7.4zM8.5 8.5 15.5 15.5" /></svg>
);

const SmallPill = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M10.5 3.5 3.5 10.5a4 4 0 0 0 5.66 5.66L16.16 8.66A4 4 0 0 0 10.5 3.5zM13 6.5h.01" /></svg>
);

/* ---------- Tips sobre medicación ---------- */
const MED_TIPS = [
  "Toma tus medicamentos a la misma hora cada día para no olvidarlos.",
  "Lee siempre la etiqueta y las instrucciones antes de tomar un fármaco.",
  "No combines medicinas sin consultar con tu médico o farmacéutico.",
  "Guarda los medicamentos en un lugar seco y fuera del alcance de los niños.",
  "Si olvidas una dosis, revisa las indicaciones antes de tomar la siguiente.",
];

export default function Meds() {
  const { items } = useRoutine?.("pastillas") ?? useRoutine();
  const products = useMemo(() => items?.slice?.() ?? [], [items]);

  // modal de consejos
  const [tipOpen, setTipOpen] = useState(false);
  const [currentTip, setCurrentTip] = useState<string | null>(null);

  function openTip() {
    const pick = MED_TIPS[Math.floor(Math.random() * MED_TIPS.length)];
    setCurrentTip(pick);
    setTipOpen(true);
  }
  function closeTip() {
    setTipOpen(false);
    setTimeout(() => setCurrentTip(null), 200);
  }

  return (
    <div className={s.wrap}>
      <div className={s.container}>
        {/* Header */}
        <header className={s.header}>
          <div className={s.logoWrap}><Logo className={s.logo} /></div>
          <h1 className={s.titleTop}>Pastillas</h1>
          <div className={s.headerRight}><PillBig className={s.pillBig} /></div>
        </header>

        {/* Subtítulo */}
        <h2 className={s.h2}>Mis Píldoras</h2>

        {/* Caja de lista */}
        <section className={s.listBox}>
          {products.length === 0 ? (
            <p className={s.empty}>Aún no tienes pastillas en tu rutina. Crea una desde “Crear Rutina”.</p>
          ) : (
            <ul className={s.list}>
              {products.map((it: any) => (
                <li key={it.id} className={s.listItem}>
                  <span className={s.itemIcon}><SmallPill /></span>
                  <div className={s.itemInfo}>
                    <div className={s.itemName}>{it.name}</div>
                    <div className={s.itemMeta}>{formatTime(it.hour, it.minute, it.meridiem)}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Crear Rutina */}
        <Link to="/routine" className={s.createBtn} aria-label="Crear Rutina">
          <span>Crear Rutina</span>
          <span className={s.plusWrap}><svg viewBox="0 0 24 24" className={s.plus}><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6Z" /></svg></span>
        </Link>

        {/* Consejos */}
        <button className={s.tipsBtn} onClick={openTip}>Consejos</button>
        {/* Navegación dentro del cuadro */}
        <BottomNav variant="inline" />
      </div>

      {/* Bottom nav centering wrapper }
      <div className={s.navContainer}>
        <div className={s.navWrapper}><BottomNav /></div>
      </div> */}

      {/* Modal de consejos */}
      {tipOpen && (
        <div className={s.modalBackdrop} onClick={closeTip} role="dialog" aria-modal="true">
          <div className={s.modalCard} onClick={(e) => e.stopPropagation()}>
            <h3 className={s.modalTitle}>Consejo rápido</h3>
            <p className={s.modalText}>{currentTip}</p>
            <button className={s.modalClose} onClick={closeTip}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
