export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: "admin" | "vendedor";
  }
  
  export interface UserSession {
    name: string;
    email: string;
    role: "admin" | "vendedor";
    sessionId: string;
  }
  