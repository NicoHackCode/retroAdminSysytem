import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginView } from "./presentation/pages/Login";
import { DashboardView } from "./presentation/pages/Dashboard/DashboardView";
import { RegisterView } from "./presentation/pages/Register/RegisterView";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/dashboard" element={<DashboardView/>} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
}
