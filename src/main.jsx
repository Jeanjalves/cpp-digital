import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import App from "./App";
import PDFViewer from "./pages/PDFViewer";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<App />} />

        <Route
          path="/viewer"
          element={<PDFViewer />}
        />

      </Routes>

    </BrowserRouter>

  </React.StrictMode>
);