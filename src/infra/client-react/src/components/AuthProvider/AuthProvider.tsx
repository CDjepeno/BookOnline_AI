import axios, { AxiosResponse } from "axios";
import { ReactNode } from "react";
import { AuthContext } from "../../context";
import { AuthInput } from "../../types";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const signin = async (credentials: AuthInput) => {
    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:3000/auth/login",
        credentials
      );
      const token = response.data.token;
      localStorage.setItem("BookToken", JSON.stringify(token));
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ signin }}>{children}</AuthContext.Provider>
  );
};
