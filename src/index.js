import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { FirestoreProvider } from "./context/GeneralFirestore";
import { BrowserRouter } from "react-router-dom";
import { CardProvider } from "./context/GeneralCard";
import { AuthProvider } from "./context/GeneralContext";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <FirestoreProvider>
    <AuthProvider>
      <CardProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CardProvider>
    </AuthProvider>
  </FirestoreProvider>
);
