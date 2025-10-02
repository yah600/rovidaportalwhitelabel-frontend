import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import "./i18n"; // Import i18n configuration
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { UserProvider } from "./context/UserContext"; // Import UserProvider here

console.log('main.tsx: I18nextProvider is wrapping the App.');

try {
  createRoot(document.getElementById("root")!).render(
    <I18nextProvider i18n={i18n}>
      <UserProvider> {/* UserProvider now wraps App */}
        <App />
      </UserProvider>
    </I18nextProvider>
  );
} catch (error) {
  console.error("Failed to render React app:", error);
  // You might want to display a fallback UI here as well
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #fee2e2; padding: 1rem;">
        <div style="background-color: white; padding: 2rem; border-radius: 0.5rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); text-align: center; max-width: 28rem;">
          <h1 style="font-size: 1.5rem; font-weight: bold; color: #ef4444; margin-bottom: 1rem;">Application Error</h1>
          <p style="color: #4b5563; margin-bottom: 1rem;">An unexpected error occurred during startup. Please check the console for details.</p>
          <button onclick="window.location.reload()" style="padding: 0.5rem 1rem; background-color: #3b82f6; color: white; border-radius: 0.375rem; border: none; cursor: pointer;">Reload Page</button>
        </div>
      </div>
    `;
  }
}