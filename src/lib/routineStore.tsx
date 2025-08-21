// Persistencia simple en localStorage + eventos para refrescar otras vistas
export type Category = "pastillas" | "piel" | "cabello";
export type Meridiem = "AM" | "PM";

export interface RoutineItem {
  id: string;
  name: string;
  category: Category;
  hour: number;   // 1..12
  minute: number; // 0..59
  meridiem: Meridiem;
  days: number[]; // índices seleccionados 0..6 (D..S)
  createdAt: number;
}

const KEY = "mycare:routine:v1";
const EVT = "routine:updated";

function readAll(): RoutineItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as RoutineItem[];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function writeAll(items: RoutineItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(EVT));
}

export const RoutineDB = {
  all(): RoutineItem[] {
    return readAll();
  },
  byCategory(category: Category) {
    return readAll().filter((i) => i.category === category);
  },
  add(data: Omit<RoutineItem, "id" | "createdAt">): RoutineItem {
    const item: RoutineItem = {
      id: (crypto as any)?.randomUUID?.() ?? String(Date.now() + Math.random()),
      createdAt: Date.now(),
      ...data,
    };
    const now = readAll();
    now.push(item);
    writeAll(now);
    return item;
  },
  remove(id: string) {
    writeAll(readAll().filter((i) => i.id !== id));
  },
  clear() {
    writeAll([]);
  },
};

// Hook React para mantenerse sincronizado con cambios (esta pestaña u otras)
import { useEffect, useState } from "react";
export function useRoutine(category?: Category) {
  const pick = () => (category ? RoutineDB.byCategory(category) : RoutineDB.all());
  const [items, setItems] = useState<RoutineItem[]>(pick);

  useEffect(() => {
    const update = () => setItems(pick());
    const onStorage = (e: StorageEvent) => { if (e.key === KEY) update(); };

    window.addEventListener(EVT, update);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(EVT, update);
      window.removeEventListener("storage", onStorage);
    };
  }, [category]);

  return { items, refresh: () => setItems(pick()) };
}

// Utilidad para mostrar hora
export function formatTime(h: number, m: number, mer: Meridiem) {
  const hh = Math.max(1, Math.min(12, h));
  const mm = String(Math.max(0, Math.min(59, m))).padStart(2, "0");
  return `${hh}:${mm} ${mer}`;
}
