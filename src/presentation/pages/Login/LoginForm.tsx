import { useState } from "react";
import { loginUser } from "../../../domain/usecases/loginUser";
import "./Login.css";
import { useNavigate } from "react-router-dom";


export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    const session = await loginUser({ email, password });
  
    if (session) {
      navigate("/dashboard");
    } else {
      setError("Credenciales inválidas.");
    }
  
    setLoading(false);
  };
  
  
  

  return (
    <form className="login-container" onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="input-group">
        <label htmlFor="email">Correo</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <button type="submit" className="button-submit" disabled={loading}>
        {loading ? "Cargando..." : "Entrar"}
      </button>
      <p className="redirect-message">
  ¿No tienes una cuenta?{" "}
  <span onClick={() => navigate("/register")}>Regístrate aquí</span>
</p>

    </form>
  );
};
