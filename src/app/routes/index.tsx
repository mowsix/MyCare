// src/app/routes/index.tsx
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Splash from "../../pages/splash/Splash";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";
import Home from "../../pages/home/Home";
import Meds from "../../pages/meds/Meds";
import Routine from "../../pages/routine/CreateRoutine";
import Skin from "../../pages/skin/Skin";
import Hair from "../../pages/hair/Hair";
import Calendar from "../../pages/calendar/Calendar";
import SwipeablePage from "../../components/SwipeablePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Splash /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "home",
        element: (
          <SwipeablePage right="/meds">
            <Home />
          </SwipeablePage>
        ),
      },
      {
        path: "meds",
        element: (
          <SwipeablePage left="/home" right="/hair">
            <Meds />
          </SwipeablePage>
        ),
      },
      { path: "routine", element: <Routine /> },
      {
        path: "skin",
        element: (
          <SwipeablePage left="/hair">
            <Skin />
          </SwipeablePage>
        ),
      },
      {
        path: "hair",
        element: (
          <SwipeablePage left="/meds" right="/skin">
            <Hair />
          </SwipeablePage>
        ),
      },
      { path: "calendar", element: <Calendar /> },
    ],
  },
]);

export default router;