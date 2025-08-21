import React, { useMemo, useState } from "react";
import s from "./CreateRoutine.module.scss";
import type { Category } from "../../lib/routineStore";
import type { Meridiem } from "../../lib/routineStore";
import { RoutineDB } from "../../lib/routineStore";

const DAYS = ["D", "L", "M", "M", "J", "V", "S"] as const;

export default function CreateRoutine() {
  const [query, setQuery] = useState("");
  const [hour, setHour] = useState<number>(8);
  const [minute, setMinute] = useState<number>(0);
  const [meridiem, setMeridiem] = useState<Meridiem>("AM");
  const [days, setDays] = useState<boolean[]>([false, false, false, false, false, true, false]); // V marcado como en el mock

  // Lista provisional de lo que el usuario va agregando antes de guardar
  type Pending = { name: string; category?: Category };
  const [pending, setPending] = useState<Pending[]>([]);

  // Modal de categoría
  const [askFor, setAskFor] = useState<string | null>(null); // nombre del item a clasificar

  const normalizedHour = useMemo(() => Math.max(1, Math.min(12, hour || 1)), [hour]);
  const normalizedMinute = useMemo(() => Math.max(0, Math.min(59, minute || 0)), [minute]);

  const toggleDay = (i: number) =>
    setDays((d) => d.map((v, idx) => (idx === i ? !v : v)));

  function addQuery() {
    const name = query.trim();
    if (!name) return;
    // abrir selector de categoría
    setAskFor(name);
  }

  function pickCategory(cat: Category) {
    if (!askFor) return;
    setPending((p) => [...p, { name: askFor, category: cat }]);
    setAskFor(null);
    setQuery("");
  }

  function removePending(idx: number) {
    setPending((p) => p.filter((_, i) => i !== idx));
  }

  function onSave() {
    if (pending.length === 0) {
      alert("Agrega al menos un producto a la lista.");
      return;
    }
    const selectedDays = days
      .map((v, i) => (v ? i : -1))
      .filter((x) => x >= 0);

    pending.forEach((p) => {
      if (!p.category) return; // por seguridad
      RoutineDB.add({
        name: p.name,
        category: p.category,
        hour: normalizedHour,
        minute: normalizedMinute,
        meridiem,
        days: selectedDays,
      });
    });

    // limpiar
    setPending([]);
    alert("Rutina guardada ✅");
  }

  return (
    <div className={s.wrap}>
      <div className={s.container}>
        <h1 className={s.h1}>Crea tu rutina</h1>

        {/* Buscador / entrada */}
        <div className={s.searchWrap}>
          <input
            className={s.search}
            type="text"
            placeholder="Busca o escribe tu producto"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") addQuery(); }}
          />
          {/* icono lupa */}
          <svg className={s.searchIcon} viewBox="0 0 24 24">
            <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.471 6.471 0 1 0-.71.71l.27.28v.79L20 20.49 21.49 19l-5.99-5zM6.5 11a4.5 4.5 0 1 1 9.001.001A4.5 4.5 0 0 1 6.5 11z"/>
          </svg>
        </div>
        <button className={s.addBtn} onClick={addQuery}>Agregar a la lista</button>

        {/* Días */}
        <section className={s.days}>
          <h3 className={s.daysTitle}>Día</h3>
          <div className={s.dayRow}>
            {DAYS.map((d, i) => (
              <div
                key={i}
                className={`${s.dayCell} ${days[i] ? "on" : ""}`}
                onClick={() => toggleDay(i)}
              >
                <div>{d}</div>
                <div className="box" />
              </div>
            ))}
          </div>
        </section>

        {/* Hora */}
        <section className={s.timeWrap}>
          <div className={s.timeNum}>
            <input
              type="number"
              value={normalizedHour}
              onChange={(e) => setHour(parseInt(e.target.value || "0"))}
              min={1}
              max={12}
            />
          </div>
          <div className={s.timeSep}>:</div>
          <div className={s.timeNum}>
            <input
              type="number"
              value={normalizedMinute.toString().padStart(2, "0")}
              onChange={(e) => setMinute(parseInt(e.target.value || "0"))}
              min={0}
              max={59}
            />
          </div>
          <div className={s.mer}>
            <button
              className={meridiem === "AM" ? "on" : ""}
              onClick={() => setMeridiem("AM")}
            >
              AM
            </button>
            <button
              className={meridiem === "PM" ? "on" : ""}
              onClick={() => setMeridiem("PM")}
            >
              PM
            </button>
          </div>
        </section>

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
                  {p.category && <span className={s.cat}>{p.category}</span>}
                </div>
                <button className={s.rm} onClick={() => removePending(idx)}>×</button>
              </div>
            ))
          )}
        </section>

        {/* Guardar */}
        <button className={s.saveBtn} onClick={onSave}>Guardar</button>

        {/* Ilustración */}
        <div className={s.illus}>
          <img
            alt="Ilustración"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBj7sQDeZiXHJbhoPAvv1kfQVAB7tw0j-Imkempzlu_V_mOWhMd1P8YAPWF8F3rM0NZfsc4ubfAMnT4QYfWDA9ffOs4UKMvG4tIcnj3Bb2HTIxNkbMaSXtATBkN5kSAyehPSRX4mgqiRDIx-lWpYkJoGMGvmOai3SByZMIgtji97wGA5e20TsHlp_2-qs_nu10PmJosyo7W2jpzB1cHrSrk9_PwwWnEoVG7b9zzicnjN6tOEdSdKg4GP-Dbmt-HBpQWkTeQ3Nm4RkM5"
          />
        </div>
      </div>

      {/* Modal de categoría */}
      {askFor && (
        <div className={s.modalMask} onClick={() => setAskFor(null)}>
          <div className={s.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={s.modalTitle}>¿A qué categoría pertenece?</div>
            <div style={{ marginBottom: 6, color: "#334155", fontWeight: 700 }}>{askFor}</div>
            <div className={s.modalRow}>
              <button onClick={() => pickCategory("pastillas")}>Pastillas</button>
              <button onClick={() => pickCategory("piel")}>Piel</button>
              <button onClick={() => pickCategory("cabello")}>Cabello</button>
            </div>
            <button className={s.modalCancel} onClick={() => setAskFor(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
