import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./pages/App.jsx";
import NotFound from "./pages/Error.jsx";
import Navbar from "./components/Navbar.jsx";
import { CreateButton } from "./components/Navbar.jsx";
import NoteEdit from "./pages/NoteEdit.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import HomeView from "./pages/Home.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <div className="w-full">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/notes" element={<App />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/note" element={<NoteEdit />} />
          <Route path="/note/:id" element={<NoteEdit />} />
        </Routes>
      </div>
      <CreateButton />
    </BrowserRouter>
  </StrictMode>,
);
