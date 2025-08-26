import React, { useState } from "react";
import Logo from "../../assets/Logo";
import s from "./Calendar.module.scss";
import BottomNav from "../../components/BottomNav";
import { useRoutine, formatTime } from "../../lib/routineStore";

const DAYS = ["D", "L", "M", "W", "J", "V", "S"];


export default function Calendar() {
  const { items } = useRoutine();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Filtrar rutinas por día seleccionado
  const dayRoutines = selectedDay !== null
    ? items.filter((it) => it.days.includes(selectedDay))
    : [];

  return (
    <div className={s.wrap}>
      {/* Header */}
      <header className={s.header}>
        <Logo className={s.logo} />

        {/*------ por si en un futuro se quiere aguegar notidicaciones*------------/}

        {/*<div className={s.actions}>
          <span className="material-icons">notifications_none</span>
          <span className="material-icons">menu</span>
        </div>*/}

      </header>

      {/* Main */}
      <main className={s.main}>
        <h1 className={s.title}>Calendario</h1>
        <h2 className={s.subtitle}>Semana</h2>

        {/* Semana */}
        <div className={s.weekRow}>
          {DAYS.map((d, i) => (
            <div key={i} className={s.weekDay}>{d}</div>
          ))}
        </div>

        <div className={s.daysRow}>
          {Array.from({ length: 7 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setSelectedDay(i)}
              className={`${s.dayBox} ${selectedDay === i ? s.active : ""}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </main>

      {/* Popup de rutinas del día */}
      {selectedDay !== null && (
        <div className={s.popup}>
          <div className={s.popupContent}>
            <h3>Rutinas del día {DAYS[selectedDay]}</h3>
            {dayRoutines.length === 0 ? (
              <p>No hay rutinas guardadas</p>
            ) : (
              <ul>
                {dayRoutines.map((it) => (
                  <li key={it.id}>
                    {it.name} — {formatTime(it.hour, it.minute, it.meridiem)}
                  </li>
                ))}
              </ul>
            )}
            <button onClick={() => setSelectedDay(null)} className={s.closeBtn}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* BottomNav global */}
      <BottomNav />
    </div>
  );
}
