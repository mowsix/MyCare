import React, { useMemo } from "react";
import s from "../CreateRoutine.module.scss";
import type { Meridiem } from "../../../lib/routineStore";

type Props = {
  hour: number;               // 1..12
  minute: number;             // 0..59
  meridiem: Meridiem;         // "AM" | "PM"
  onChange: (v: { hour: number; minute: number; meridiem: Meridiem }) => void;
};

export default function TimeSelector({ hour, minute, meridiem, onChange }: Props) {
  const h = useMemo(() => Math.max(1, Math.min(12, Number.isFinite(hour) ? hour : 1)), [hour]);
  const m = useMemo(() => Math.max(0, Math.min(59, Number.isFinite(minute) ? minute : 0)), [minute]);

  const setHour = (v: number) => onChange({ hour: v, minute: m, meridiem });
  const setMinute = (v: number) => onChange({ hour: h, minute: v, meridiem });
  const setMer = (mer: Meridiem) => onChange({ hour: h, minute: m, meridiem: mer });

  return (
    <section className={s.timeWrap}>
      <div className={s.timeNum}>
        <input
          type="number"
          value={h}
          min={1}
          max={12}
          onChange={(e) => setHour(parseInt(e.target.value || "0"))}
        />
      </div>
      <div className={s.timeSep}>:</div>
      <div className={s.timeNum}>
        <input
          type="number"
          value={String(m).padStart(2, "0")}
          min={0}
          max={59}
          onChange={(e) => setMinute(parseInt(e.target.value || "0"))}
        />
      </div>
      <div className={s.mer}>
        <button className={meridiem === "AM" ? "on" : ""} onClick={() => setMer("AM")}>AM</button>
        <button className={meridiem === "PM" ? "on" : ""} onClick={() => setMer("PM")}>PM</button>
      </div>
    </section>
  );
}
