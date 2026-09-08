import { LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ui/theme-toggle";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/router/router";

export default function LandingBar() {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-none border-b border-border font-bold">
      <div className="flex mx-50 h-20 items-center">
        <div>Tiktok-Game-Interaction</div>

        <div className="flex ml-auto gap-4">
          <ThemeToggle />
          <Button
            variant="outline"
            onClick={() => navigate(ROUTES.OPERATOR_PAGE)}
          >
            <LogIn></LogIn>Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
