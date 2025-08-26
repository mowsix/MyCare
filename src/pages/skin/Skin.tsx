import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import s from "./Skin.module.scss";
import Logo from "../../assets/Logo";
import { useRoutine } from "../../lib/routineStore";
import BottomNav from "../../components/BottomNav";

/* ---------- ICONOS INLINE ---------- */
const SkinIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M12 2c-3.5 4.3-6 7.6-6 10.5A6 6 0 0 0 12 19a6 6 0 0 0 6-6.5C18 9.6 15.5 6.3 12 2Z" /></svg>
);
const SmallSkin = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M12 2c-3.5 4.3-6 7.6-6 10.5A6 6 0 0 0 12 19a6 6 0 0 0 6-6.5C18 9.6 15.5 6.3 12 2Z" /></svg>
);

/* ---------- CONSEJOS (puedes editar o ampliar) ---------- */
const TIPS = [
  "Limpia tu cara dos veces al día con un limpiador suave para eliminar impurezas.",
  "Usa protector solar todos los días, incluso cuando esté nublado.",
  "Mantén hidratada tu piel: aplica una crema hidratante adecuada a tu tipo de piel.",
  "No te acuestes con maquillaje. Esto evita obstrucción de poros y daños.",
  "Exfolia suavemente 1-2 veces por semana para eliminar células muertas.",
  "Mantén una dieta equilibrada y bebe suficiente agua para favorecer la piel.",
];

export default function Skin() {
  // Solo elementos de categoría "piel" — si tu hook acepta un filtro como parámetro
  const { items } = useRoutine?.("piel") ?? useRoutine(); // fallback por seguridad
  // ordenar o memoizar si quieres
  const products = useMemo(() => items?.slice?.() ?? [], [items]);

  // Modal de consejos
  const [tipOpen, setTipOpen] = useState(false);
  const [currentTip, setCurrentTip] = useState<string | null>(null);

  function openTip() {
    const choice = TIPS[Math.floor(Math.random() * TIPS.length)];
    setCurrentTip(choice);
    setTipOpen(true);
  }
  function closeTip() {
    setTipOpen(false);
    // opcional: limpiar tip tras cerrar
    setTimeout(() => setCurrentTip(null), 200);
  }

  return (
    <div className={s.wrap}>
        <header className={s.header}>
          <div className={s.logoWrap}>
            <Logo className={s.logo} />
          </div>

          <h1 className={s.titleTop}>Piel</h1>

          <div className={s.headerRight}>
            <SkinIcon className={s.skinIcon} />
          </div>
        </header>
      <div className={s.container}>
        {/* Header: título centrado. logo left, icon right (absolute) */}


        {/* Botón Mi SkinCare */}
        <button className={s.skinBtn}>Mi SkinCare</button>

        {/* Mis productos */}
        <h2 className={s.h2}>Mis productos</h2>
        <div className={s.products}>
          {products.length === 0 ? (
            <div className={s.emptyText}>Aún no tienes productos de piel en tu rutina.</div>
          ) : (
            products.map((it: any) => (
              <button key={it.id} className={s.productBtn}>
                <span className={s.prodIcon}><SmallSkin /></span>
                <span className={s.prodName}>{it.name}</span>
              </button>
            ))
          )}
        </div>

        {/* Crear rutina -> /routine */}
        <Link to="/routine" className={s.createBtn}>Crear rutina</Link>

        {/* Consejos (abre modal) */}
        <button className={s.tipsBtn} onClick={openTip}>Consejos</button>
      </div>

      {/* Chip / BottomNav centering wrapper */}
          <BottomNav />

      {/* Modal de consejo */}
      {tipOpen && (
        <div className={s.modalBackdrop} onClick={closeTip} role="dialog" aria-modal="true">
          <div className={s.modalCard} onClick={(e) => e.stopPropagation()}>
            <h3 className={s.modalTitle}>Consejo</h3>
            <p className={s.modalText}>{currentTip}</p>
            <button className={s.modalClose} onClick={closeTip}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
