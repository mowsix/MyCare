import './index.css'
import "./tailwind.css";

// import "./styles/main.scss"; // solo si estás usando SASS también
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes";
import { UsersProvider } from "./app/providers/users-store";



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UsersProvider>
      <div style={{ position: 'relative', overflow: 'hidden', height: '100vh' }}>
        <RouterProvider router={router} />
      </div>
    </UsersProvider>
  </React.StrictMode>
);





