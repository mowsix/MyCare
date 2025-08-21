import React from "react";
import s from "../CreateRoutine.module.scss";

const LABELS = ["D", "L", "M", "M", "J", "V", "S"] as const;

type Props = {
  value: boolean[];                 // 7 posiciones, D..S
  onChange: (next: boolean[]) => void;
};

export default function DaySelector({ value, onChange }: Props) {
  const toggle = (i: number) => {
    const next = value.map((v, idx) => (idx === i ? !v : v));
    onChange(next);
  };

  return (
    <section className={s.days}>
      <h3 className={s.daysTitle}>Día</h3>
      <div className={s.dayRow}>
        {LABELS.map((label, i) => (
          <div
            key={i}
            role="button"
            tabIndex={0}
            className={`${s.dayCell} ${value[i] ? "on" : ""}`}
            onClick={() => toggle(i)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggle(i)}
          >
            <div>{label}</div>
            <div className={s.box} />
          </div>
        ))}
      </div>
    </section>
  );
}
