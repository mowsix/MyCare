import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="mx-auto w-full max-w-[393px] min-h-dvh bg-white shadow-lg">
      <Outlet />
    </div>
  );
}
