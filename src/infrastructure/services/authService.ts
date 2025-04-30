import { User, UserSession } from "../../domain/models";
import usersData from "../data/users.json";

const STORAGE_KEY = "usuarios";

if (!localStorage.getItem(STORAGE_KEY)) {
  console.log("Inicializando usuarios por defecto");
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usersData.users));
}

export const AuthService = {
  login: async (email: string, password: string): Promise<UserSession | null> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const foundUser = users.find(
      (user: User) => user.email === email && user.password === password
    );

    if (foundUser) {
      const sessionData: UserSession = {
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        sessionId: crypto.randomUUID(),
      };

      localStorage.setItem("user", JSON.stringify(sessionData));
      return sessionData;
    }

    return null;
  },

  register: async (user: User): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      
      // Verifico si el email ya existe
      if (users.some((u: User) => u.email === user.email)) {
        return false;
      }

      // Agrego nuevo usuario
      users.push(user);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
      
      return true;
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      return false;
    }
  },

  getCurrentUser: (): UserSession | null => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  logout: (): void => {
    localStorage.removeItem("user");
  },

  getUsers: async (): Promise<User[]> => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    console.log("Usuarios obtenidos:", users);
    return users;
  },

  saveUsers: async (users: User[]): Promise<void> => {
    console.log("Guardando usuarios:", users);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    console.log("Usuarios guardados correctamente");
  },

  deleteUser: async (id: string): Promise<void> => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const updatedUsers = users.filter((user: User) => user.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));
  }
};