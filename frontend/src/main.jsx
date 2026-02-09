import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./index.css";
import { Home, NoteView } from "./pages/App.jsx";
import NotFound from "./pages/Error.jsx";
import Navbar from "./components/Navbar.jsx";
import NoteEdit from "./pages/NoteEdit.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import FloatBtn from "./pages/App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Navbar />
    <div className="w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<NoteView />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/note" element={<NoteEdit />} />
          <Route path="/note/:id" element={<NoteEdit />} />
        </Routes>
      </BrowserRouter>
    </div>
  </StrictMode>,
);
