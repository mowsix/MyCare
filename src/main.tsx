import './index.css'
import "./tailwind.css";   // importa Tailwind globalmente
// import "./styles/main.scss"; // solo si estás usando SASS también
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes";
import { UsersProvider } from "./app/providers/users-store";
// Make sure the file exists at ./pages/Splash/Splash.tsx or ./pages/Splash/Splash.jsx


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UsersProvider>
      <RouterProvider router={router} />
    </UsersProvider>
  </React.StrictMode>
);





