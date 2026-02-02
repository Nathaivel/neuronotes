import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./pages/App.jsx";
import NotFound from "./pages/Error.jsx";
import Navbar from "./components/Navbar.jsx";
import NoteEdit from "./pages/NoteEdit.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Navbar />

    <div className="w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/note" element={<NoteEdit />} />
          <Route
            path="/note/*"
            element={<NoteEdit id={window.location.pathname.slice(6)} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  </StrictMode>,
);
