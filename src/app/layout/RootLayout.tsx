import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="w-full min-h-dvh bg-white flex items-center justify-center">
      <div className="w-full" style={{maxWidth: 'min(790px, 100vw)'}}>
        <Outlet />
      </div>
    </div>
  );
}