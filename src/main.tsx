import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import "./i18n"; // Import i18n configuration
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { UserProvider } from "./context/UserContext"; // Import UserProvider here

console.log('main.tsx: I18nextProvider is wrapping the App.');

createRoot(document.getElementById("root")!).render(
  <I18nextProvider i18n={i18n}>
    <UserProvider> {/* UserProvider now wraps App */}
      <App />
    </UserProvider>
  </I18nextProvider>
);