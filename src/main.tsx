import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { SortingAlgorithmProvider } from "./context/Visualiser";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SortingAlgorithmProvider>
      <App />
    </SortingAlgorithmProvider>
  </React.StrictMode>
);
