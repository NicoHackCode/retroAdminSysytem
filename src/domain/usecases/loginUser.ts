import { AuthService } from "../../infrastructure/services/authService";

interface LoginInput {
  email: string;
  password: string;
}

export async function loginUser(input: LoginInput) {
  try {
    const session = await AuthService.login(input.email, input.password);
    return session;
  } catch (error) {
    console.error("Login failed in use case:", error);
    return null;
  }
}
