import { User } from "../../domain/models/User";

const STORAGE_KEY = "users";

export const UserService = {
  getAll: (): User[] => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  },

  create: (user: User): void => {
    const users = UserService.getAll();
    users.push(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  },

  update: (updatedUser: User): void => {
    const users = UserService.getAll().map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  },

  delete: (id: string): void => {
    const users = UserService.getAll().filter((u) => u.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  },
};
