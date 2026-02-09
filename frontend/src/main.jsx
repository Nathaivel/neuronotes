import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./pages/App.jsx";
import NotFound from "./pages/Error.jsx";
import Navbar from "./components/Navbar.jsx";
import NoteEdit from "./pages/NoteEdit.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import HomeView from "./pages/Home.jsx";
import FloatBtn from "./pages/App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Navbar />
    <div className="w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/notes" element={<App />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/note" element={<NoteEdit />} />
          <Route path="/note/:id" element={<NoteEdit />} />
        </Routes>
      </BrowserRouter>
    </div>
  </StrictMode>,
);
