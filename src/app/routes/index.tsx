import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Splash from "../../pages/Splash.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Splash /> },
    ],
  },
]);
