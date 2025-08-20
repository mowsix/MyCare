// src/app/routes/index.tsx
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Splash from "../../pages/Splash";          // <-- OJO: sin .tsx si tu bundler resuelve
import Login from "../../pages/login/Login";      //     (puede ir con .tsx si prefieres)
import Register from "../../pages/register/Register"; 
import Home from "../../pages/home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Splash /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "home", element: <Home /> },
    ],
  },
]);