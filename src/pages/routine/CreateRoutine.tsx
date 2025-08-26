import React, { useMemo, useState, useRef, useEffect, useCallback } from "react";
import s from "./CreateRoutine.module.scss";
import type { Category, Meridiem } from "../../lib/routineStore";
import { RoutineDB } from "../../lib/routineStore";
import { useNavigate } from "react-router-dom";
import Lupa from "../../assets/lupa.svg";

const DAY_LABELS = ["D", "L", "M", "M", "J", "V", "S"] as const;

type PendingItem = {
  name: string;
  category: Category;
  hour: number;
  minute: number;
  meridiem: Meridiem;
  days: number[];
};

export default function CreateRoutine() {
  const navigate = useNavigate();

  // Entrada
  const [query, setQuery] = useState("");

  // Lista provisional
  const [pending, setPending] = useState<PendingItem[]>([]);

  // Modal combinado
  const [modalOpen, setModalOpen] = useState(false);
  const [draftName, setDraftName] = useState<string>("");
  const [draftCategory, setDraftCategory] = useState<Category | null>(null);
  const [draftDays, setDraftDays] = useState<boolean[]>([false, false, false, false, false, true, false]); // V por defecto
  const [draftHour, setDraftHour] = useState<number>(8);
  const [draftMinute, setDraftMinute] = useState<number>(0);
  const [draftMeridiem, setDraftMeridiem] = useState<Meridiem>("AM");

  // Normalización
  const normHour = useMemo(() => Math.max(1, Math.min(12, draftHour || 1)), [draftHour]);
  const normMinute = useMemo(() => Math.max(0, Math.min(59, draftMinute || 0)), [draftMinute]);

  // Toast
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const toastTimer = useRef<number | null>(null);

  const triggerToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    if (toastTimer.current) {
      window.clearTimeout(toastTimer.current);
    }
    toastTimer.current = window.setTimeout(() => {
      setShowToast(false);
      toastTimer.current = null;
    }, 2500);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, []);

  function addQuery() {
    const name = query.trim();
    if (!name) {
      triggerToast("Escribe un nombre para agregar.");
      return;
    }
    setDraftName(name);
    setDraftCategory(null);
    setDraftDays([false, false, false, false, false, true, false]);
    setDraftHour(8);
    setDraftMinute(0);
    setDraftMeridiem("AM");
    setModalOpen(true);
  }

  function toggleDraftDay(i: number) {
    setDraftDays((arr) => arr.map((v, idx) => (idx === i ? !v : v)));
  }

  function confirmDraft() {
    if (!draftCategory) {
      triggerToast("Selecciona una categoría.");
      return;
    }
    const selectedDays = draftDays.map((v, i) => (v ? i : -1)).filter((x) => x >= 0);
    if (selectedDays.length === 0) {
      triggerToast("Selecciona al menos un día.");
      return;
    }

    setPending((p) => [
      ...p,
      {
        name: draftName,
        category: draftCategory,
        hour: normHour,
        minute: normMinute,
        meridiem: draftMeridiem,
        days: selectedDays,
      },
    ]);
    setModalOpen(false);
    setQuery("");
    triggerToast("Añadido a la lista ✅");
  }

  function removePending(idx: number) {
    setPending((p) => p.filter((_, i) => i !== idx));
  }

  function onSaveAll() {
    if (pending.length === 0) {
      triggerToast("Agrega al menos un producto a la lista.");
      return;
    }
    pending.forEach((p) => {
      RoutineDB.add({
        name: p.name,
        category: p.category,
        hour: p.hour,
        minute: p.minute,
        meridiem: p.meridiem,
        days: p.days,
      });
    });
    setPending([]);
    triggerToast("Rutina(s) guardada(s) 🎉");
    setTimeout(() => navigate("/home", { replace: true }), 300);
  }

  return (
    <div className={s.wrap}>
      <div className={s.container}>
        <h1 className={s.h1}>Crea tu rutina</h1>

        {/* Buscador */}
        <div className={s.searchWrap}>
          <input
            className={s.search}
            type="text"
            placeholder="Busca o escribe tu producto"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") addQuery(); }}
          />

          <img className={s.searchIcon} src={Lupa} alt="" />

        </div>
        <button className={s.addBtn} onClick={addQuery}>Agregar a la lista</button>

        {/* Lista provisional */}
        <section className={s.listBox}>
          {pending.length === 0 ? (
            <div style={{ textAlign: "center", color: "#64748b" }}>
              No hay productos en la lista. Agrega uno arriba.
            </div>
          ) : (
            pending.map((p, idx) => (
              <div key={idx} className={s.item}>
                <div>
                  <strong>{p.name}</strong>
                  <span className={s.cat}>
                    {p.category} — {String(p.hour).padStart(2, "0")}:
                    {String(p.minute).padStart(2, "0")} {p.meridiem}
                  </span>
                </div>
                <button className={s.rm} onClick={() => removePending(idx)} aria-label="Eliminar">×</button>
              </div>
            ))
          )}
        </section>

        {/* Guardar todo */}
        <button className={s.saveBtn} onClick={onSaveAll}>Guardar</button>

        {/* Regresar al inicio */}
        <button
          onClick={() => navigate("/home")}
          className={s.inicioBtn}
        >
          Regresar al inicio
        </button>
      </div>

      {/* MODAL: categoría + días + hora */}
      {modalOpen && (
        <div className={s.modalMask} onClick={() => setModalOpen(false)}>
          <div className={s.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={s.modalTitle}>Configurar “{draftName}”</div>

            {/* Categoría */}
            <div className={s.modalSub}>Categoría</div>
            <div className={s.modalRow}>
              {(["pastillas", "piel", "cabello"] as Category[]).map((c) => (
                <button
                  key={c}
                  data-active={draftCategory === c}
                  onClick={() => setDraftCategory(c)}
                >
                  {c[0].toUpperCase() + c.slice(1)}
                </button>
              ))}
            </div>

            {/* Días */}
            <div className={s.modalSub} style={{ marginTop: 14 }}>Día</div>
            <div className={s.modalDayGrid}>
              {DAY_LABELS.map((d, i) => {
                const on = draftDays[i];
                return (
                  <div
                    key={i}
                    className={s.modalDay}
                    data-on={on}
                    onClick={() => toggleDraftDay(i)}
                  >
                    <div>{d}</div>
                    <div className={s.modalBox} />
                  </div>
                );
              })}
            </div>

            {/* Hora */}
            <div className={s.modalSub} style={{ marginTop: 14 }}>Hora</div>
            <div className={s.modalTimeRow}>
              <div className={s.modalNum}>
                <input
                  type="number"
                  value={normHour}
                  min={1}
                  max={12}
                  onChange={(e) => setDraftHour(parseInt(e.target.value || "0"))}
                />
              </div>
              <div className={s.modalSep}>:</div>
              <div className={s.modalNum}>
                <input
                  type="number"
                  value={String(normMinute).padStart(2, "0")}
                  min={0}
                  max={59}
                  onChange={(e) => setDraftMinute(parseInt(e.target.value || "0"))}
                />
              </div>
              <div className={s.modalMer}>
                <button
                  data-active={draftMeridiem === "AM"}
                  onClick={() => setDraftMeridiem("AM")}
                >
                  AM
                </button>
                <button
                  data-active={draftMeridiem === "PM"}
                  onClick={() => setDraftMeridiem("PM")}
                >
                  PM
                </button>
              </div>
            </div>

            <div className={s.modalActions}>
              <button className={s.cancel} onClick={() => setModalOpen(false)}>Cancelar</button>
              <button className={s.confirm} onClick={confirmDraft}>Añadir</button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {showToast && (
        <div className={s.toast} role="status" aria-live="polite">
          {toastMsg}
        </div>
      )}
    </div>
  );
}
