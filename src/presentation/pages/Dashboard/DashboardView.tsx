import { useEffect, useState } from "react";
import { getCurrentUser } from "../../../domain/usecases/getCurrentUser";
import { UserSession } from "../../../domain/models/User";
import { User } from "../../../domain/models/User";
import { UserService } from "../../../infrastructure/services/userService";
import { ProductViewer } from "./ProductViewer";
import { v4 as uuidv4 } from "uuid";
import "./UserDashboard.css";
import { ProductCrud } from "./ProductCrud";

export const DashboardView = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<Omit<User, "id">>({
    name: "",
    email: "",
    password: "",
    role: "vendedor",
  });
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    if (currentUser?.role === "admin") {
      const allUsers = UserService.getAll();
      setUsers(allUsers);
    }
  }, []);

  const handleAddUser = () => {
    const createdUser: User = { id: uuidv4(), ...newUser };
    UserService.create(createdUser);
    setUsers(UserService.getAll());
    setNewUser({ name: "", email: "", password: "", role: "vendedor" });
  };

  const handleDeleteUser = (id: string) => {
    UserService.delete(id);
    setUsers(UserService.getAll());
  };

  if (!user) return <p style={{ color: "white" }}>Cargando sesión...</p>;

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-window">
        <h2>Bienvenido, {user.name}</h2>
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
              <button onClick={handleAddUser}>Agregar usuario</button>
            </div>
  
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
                      <button className="btn-edit">Editar</button>
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
