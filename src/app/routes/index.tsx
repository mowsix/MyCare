// src/app/routes/index.tsx
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Splash from "../../pages/Splash";          
import Login from "../../pages/login/Login";      
import Register from "../../pages/register/Register"; 
import Home from "../../pages/home/Home";
import Meds from "../../pages/meds/Meds";
import Routine from "../../pages/routine/CreateRoutine";
import Skin from "../../pages/skin/Skin";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Splash /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "home", element: <Home /> },
      { path: "meds", element: <Meds /> },
      { path: "routine", element: <Routine /> },
      { path: "skin", element: <Skin /> },
    ],
  },
]);