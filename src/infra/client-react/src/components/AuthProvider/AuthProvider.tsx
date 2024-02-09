import axios, { AxiosResponse } from "axios";
import { ReactNode, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context";
import { AuthInput } from "../../types";
import { CurrentUserResponse } from "../../types/current.user.response";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const initialUser: CurrentUserResponse | unknown = useLoaderData();
  const [user, setUser] = useState<CurrentUserResponse | unknown>(initialUser);
  const signin = async (credentials: AuthInput) => {
    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:3000/auth/login",
        credentials
      );
      const token = response.data.token;
      localStorage.setItem("BookToken", JSON.stringify(token));
      setUser(response.data);
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  };

  const signout = async () => {
    localStorage.removeItem("BookToken");
    setUser(null)
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
