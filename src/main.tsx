import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Quitamos y eliminamos el componente App.tsx, y lo sustituimos por nuestro
    componente router.tsx */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
