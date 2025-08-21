import React, { useMemo, useState } from "react";
import s from "./CreateRoutine.module.scss";
import type { Category, Meridiem } from "../../lib/routineStore";
import { RoutineDB } from "../../lib/routineStore";
import { useNavigate } from "react-router-dom";

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

  const normHour = useMemo(() => Math.max(1, Math.min(12, draftHour || 1)), [draftHour]);
  const normMinute = useMemo(() => Math.max(0, Math.min(59, draftMinute || 0)), [draftMinute]);

  function addQuery() {
    const name = query.trim();
    if (!name) return;
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
      alert("Selecciona una categoría.");
      return;
    }
    const selectedDays = draftDays.map((v, i) => (v ? i : -1)).filter((x) => x >= 0);
    if (selectedDays.length === 0) {
      alert("Selecciona al menos un día.");
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
  }

  function removePending(idx: number) {
    setPending((p) => p.filter((_, i) => i !== idx));
  }

  function onSaveAll() {
    if (pending.length === 0) {
      alert("Agrega al menos un producto a la lista.");
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
    navigate("/home", { replace: true });
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
          <svg className={s.searchIcon} viewBox="0 0 24 24">
            <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.471 6.471 0 1 0-.71.71l.27.28v.79L20 20.49 21.49 19l-5.99-5zM6.5 11a4.5 4.5 0 1 1 9.001.001A4.5 4.5 0 0 1 6.5 11z"/>
          </svg>
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
                <button className={s.rm} onClick={() => removePending(idx)}>×</button>
              </div>
            ))
          )}
        </section>

        {/* Guardar todo */}
        <button className={s.saveBtn} onClick={onSaveAll}>Guardar</button>

        {/* Ilustración */}
        <div className={s.illus}>
          <img
            alt="Ilustración"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBj7sQDeZiXHJbhoPAvv1kfQVAB7tw0j-Imkempzlu_V_mOWhMd1P8YAPWF8F3rM0NZfsc4ubfAMnT4QYfWDA9ffOs4UKMvG4tIcnj3Bb2HTIxNkbMaSXtATBkN5kSAyehPSRX4mgqiRDIx-lWpYkJoGMGvmOai3SByZMIgtji97wGA5e20TsHlp_2-qs_nu10PmJosyo7W2jpzB1cHrSrk9_PwwWnEoVG7b9zzicnjN6tOEdSdKg4GP-Dbmt-HBpQWkTeQ3Nm4RkM5"
          />
        </div>
      </div>

      {/* MODAL: categoría + días + hora */}
      {modalOpen && (
        <div className={s.modalMask} onClick={() => setModalOpen(false)}>
          <div className={s.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={s.modalTitle}>Configurar “{draftName}”</div>

            {/* Categoría */}
            <div className={s.modalSub}>Categoría</div>
            <div className={s.modalRow}>
              {(["pastillas","piel","cabello"] as Category[]).map((c) => (
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
              <button className="cancel" onClick={() => setModalOpen(false)}>Cancelar</button>
              <button className="confirm" onClick={confirmDraft}>Añadir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
