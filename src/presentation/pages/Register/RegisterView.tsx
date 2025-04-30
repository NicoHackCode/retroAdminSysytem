import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../../domain/models/User";
import { AuthService } from "../../../infrastructure/services/authService";
import { v4 as uuidv4 } from "uuid";
import "./Register.css";

export const RegisterView = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Omit<User, "id">>({
    name: "",
    email: "",
    password: "",
    role: "vendedor",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const newUser: User = {
      id: uuidv4(),
      ...formData,
    };

    const success = await AuthService.register(newUser);
    
    if (success) {
      alert("Usuario registrado con éxito");
      navigate("/login");
    } else {
      setError("El correo electrónico ya está registrado");
    }
  };

  return (
    <div className="register-wrapper">
      <form className="register-window" onSubmit={handleSubmit}>
        <h2>Registro</h2>

        <div className="input-group">
          <label>Nombre</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
        </div>

        <div className="input-group">
          <label>Correo</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        <div className="input-group">
          <label>Contraseña</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        {/* Dejo esto listo por si lo voy a manejar por rol */}
        {/* <div className="input-group">
          <label>Rol</label>
          <select
            value={formData.role}
            onChange={(e) =>
              setFormData({
                ...formData,
                role: e.target.value as User["role"],
              })
            }
          >
            <option value="vendedor">Vendedor</option>
            <option value="admin">Administrador</option>
          </select>
        </div> */}

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="button-submit">
          Registrarse
        </button>

        <p className="redirect-message">
          ¿Ya tienes una cuenta?{" "}
          <span onClick={() => navigate("/login")}>Ingresa aquí</span>
        </p>
      </form>
    </div>
  );
};
