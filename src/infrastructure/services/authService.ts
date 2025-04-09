import { User, UserSession } from "../../domain/models";


const mockUsers: User[] = [
  {
    id:"890826",
    name: "Nicolás",
    email: "nico.hackcode@gmail.com",
    password: "123456",
    role: "admin",
  },
  {
    id: "58387",
    name: "Grecia",
    email: "grecia.user@example.com",
    password: "654321",
    role: "vendedor",
  },
];

export const AuthService = {
  login: async (email: string, password: string): Promise<UserSession | null> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const foundUser = mockUsers.find(
      (user) => user.email === email && user.password === password
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
};