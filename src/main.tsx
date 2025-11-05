import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "./components/ui/sonner";
import { SearchProvider } from "./contexts/SearchContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";

createRoot(document.getElementById("root")!).render(
  <SearchProvider>
    <FavoritesProvider>
      <App />
      <Toaster />
    </FavoritesProvider>
  </SearchProvider>
);
  