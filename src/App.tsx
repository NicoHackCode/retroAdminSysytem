import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LoginView } from "./presentation/pages/Login";
import { DashboardView } from "./presentation/pages/Dashboard/DashboardView";
import { RegisterView } from "./presentation/pages/Register/RegisterView";
import { ProtectedRoute } from "./presentation/components/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardView />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
}
