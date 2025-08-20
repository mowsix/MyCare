import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type User = { username: string; password: string };

type UsersContextValue = {
  users: User[];
  register: (username: string, password: string) => void; // agrega usuario
  validate: (username: string, password: string) => boolean; // valida credenciales
};

const UsersContext = createContext<UsersContextValue | null>(null);
const STORAGE_KEY = "mc_users_v1";

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed: User[] = JSON.parse(raw);
        setUsers(Array.isArray(parsed) ? parsed : []);
      } catch {
        setUsers([]);
      }
    }
  }, []);

  // Guardar en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  const register = (username: string, password: string) => {
    const u = username.trim();
    if (!u || !password) throw new Error("Completa usuario y contraseña");
    const exists = users.some(x => x.username.toLowerCase() === u.toLowerCase());
    if (exists) throw new Error("Ese usuario ya existe");
    setUsers(prev => [...prev, { username: u, password }]);
  };

  const validate = (username: string, password: string) =>
    users.some(u => u.username === username && u.password === password);

  const value = useMemo(() => ({ users, register, validate }), [users]);

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
}

export function useUsers() {
  const ctx = useContext(UsersContext);
  if (!ctx) throw new Error("useUsers debe usarse dentro de <UsersProvider>");
  return ctx;
}
