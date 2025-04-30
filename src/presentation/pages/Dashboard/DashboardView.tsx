import { useEffect, useState } from "react";
import { getCurrentUser } from "../../../domain/usecases/getCurrentUser";
import { UserSession } from "../../../domain/models/User";
import { User } from "../../../domain/models/User";
import { AuthService } from "../../../infrastructure/services/authService";
import { ProductViewer } from "./ProductViewer";
import { v4 as uuidv4 } from "uuid";
import "./UserDashboard.css";
import { ProductCrud } from "./ProductCrud";
import { useNavigate } from "react-router-dom";

export const DashboardView = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<Omit<User, "id">>({
    name: "",
    email: "",
    password: "",
    role: "vendedor",
  });
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [user, setUser] = useState<UserSession | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    if (currentUser?.role === "admin") {
      loadUsers();
    }
  }, []);

  const loadUsers = async () => {
    try {
      const allUsers = await AuthService.getUsers();
      setUsers(allUsers);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      setError("Error al cargar usuarios");
    }
  };

  const handleAddUser = async () => {
    setLoading(true);
    setError("");

    try {
      const createdUser: User = { id: uuidv4(), ...newUser };
      const success = await AuthService.register(createdUser);
      
      if (success) {
        await loadUsers();
        setNewUser({ name: "", email: "", password: "", role: "vendedor" });
      } else {
        setError("El correo electrónico ya está registrado");
      }
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      setError("Error al agregar usuario");
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    });
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;

    setLoading(true);
    setError("");

    try {
      const updatedUser: User = {
        ...editingUser,
        ...newUser,
      };

      const users = await AuthService.getUsers();
      const updatedUsers = users.map(u => 
        u.id === updatedUser.id ? updatedUser : u
      );

      await AuthService.saveUsers(updatedUsers);
      await loadUsers();
      setEditingUser(null);
      setNewUser({ name: "", email: "", password: "", role: "vendedor" });
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      setError("Error al actualizar usuario");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await AuthService.deleteUser(id);
      await loadUsers();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      setError("Error al eliminar usuario");
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  if (!user) return <p style={{ color: "white" }}>Cargando sesión...</p>;

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-window">
        <div className="dashboard-header">
          <h2>Bienvenido, {user.name}</h2>
          <button className="btn-logout" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
        <p>Rol: {user.role}</p>
          
        {user.role === "admin" && (
          <>
            <h3>Gestión de usuarios</h3>
  
            <div>
              <input
                type="text"
                placeholder="Nombre"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Correo"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
              <select
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    role: e.target.value as User["role"],
                  })
                }
              >
                <option value="admin">Administrador</option>
                <option value="vendedor">Vendedor</option>
              </select>
              {editingUser ? (
                <>
                  <button onClick={handleUpdateUser} disabled={loading}>
                    {loading ? "Actualizando..." : "Actualizar"}
                  </button>
                  <button 
                    onClick={() => {
                      setEditingUser(null);
                      setNewUser({ name: "", email: "", password: "", role: "vendedor" });
                    }}
                    className="btn-cancel"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <button onClick={handleAddUser} disabled={loading}>
                  {loading ? "Agregando..." : "Agregar usuario"}
                </button>
              )}
            </div>

            {error && <p className="error-message">{error}</p>}
  
            <table style={{ width: "100%", marginTop: "1rem" }}>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>
                      <button 
                        className="btn-edit"
                        onClick={() => handleEditUser(u)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteUser(u.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
  
        {["admin", "vendedor"].includes(user.role) && (
          <>
            <h3>Gestión de productos</h3>
            <ProductCrud />
          </>
        )}
  
        {!["admin", "vendedor"].includes(user.role) && (
          <>
            <h3>Inventario</h3>
            <ProductViewer />
          </>
        )}
      </div>
    </div>
  );
};
