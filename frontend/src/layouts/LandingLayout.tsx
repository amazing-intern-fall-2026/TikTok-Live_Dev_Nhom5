import LandingBar from "@/components/LandingBar";
import { Outlet } from "react-router-dom";

export default function LandingLayout() {
  return (
    <div className="w-screen max-h-screen">
      <LandingBar />
      <Outlet />
    </div>
  );
}
