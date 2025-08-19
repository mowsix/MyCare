import { createBrowserRouter } from "react-router-dom";
import Splash from "./pages/Splash.tsx";
import Login from "./pages/login/Login.tsx";


export const router = createBrowserRouter([
  { path: "/", element: <Splash /> },     // raíz: Splash
  { path: "/login", element: <Login /> }, // después de 3s navegamos aquí
]);
