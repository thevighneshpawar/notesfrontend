import { createContext } from "react";

export interface User {
  id: string;
  name: string;
  dob: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
