// src/app/routes/index.tsx
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./app/layout/RootLayout";

// Páginas
import Splash from "./pages/Splash";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";

// (stubs opcionales; puedes crearlos vacíos si aún no existen)
const Meds = () => <div className="p-6">Meds</div>;
const Profile = () => <div className="p-6">Profile</div>;
const Kit = () => <div className="p-6">Kit</div>;
const Calendar = () => <div className="p-6">Calendar</div>;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      // Splash como índice
      { index: true, element: <Splash /> },

      // Auth
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // App
      { path: "home", element: <Home /> },
      { path: "meds", element: <Meds /> },
      { path: "profile", element: <Profile /> },
      { path: "kit", element: <Kit /> },
      { path: "calendar", element: <Calendar /> },
    ],
  },
]);
