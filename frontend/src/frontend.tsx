import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import ThemeProvider from "./lib/theme-provider";

const elem = document.getElementById("root")!;
const app = (
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);

(import.meta.hot.data.root ??= createRoot(elem)).render(app);
