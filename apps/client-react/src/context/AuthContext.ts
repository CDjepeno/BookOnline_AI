import { createContext } from "react";
import { AuthContextValue } from "../types/user/auth.context.value";

export const AuthContext = createContext<AuthContextValue | null>(null);
