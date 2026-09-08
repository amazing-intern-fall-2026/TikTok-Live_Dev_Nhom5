import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme-provider";

type Theme = "light" | "dark";

const themeIcons: Record<Theme, typeof Sun> = {
  light: Sun,
  dark: Moon,
};

const themeLabels: Record<Theme, string> = {
  light: "Light",
  dark: "Dark",
};

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const CurrentIcon = themeIcons[theme];

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={toggleTheme}
      aria-label={`Current theme: ${themeLabels[theme]}`}
      title={themeLabels[theme]}
    >
      <CurrentIcon className="h-5 w-5" />
    </Button>
  );
}
