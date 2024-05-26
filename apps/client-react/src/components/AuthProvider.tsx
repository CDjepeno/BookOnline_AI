import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../api/current.user";
import { AuthContext } from "../context";
import { UseRequestApi } from "../request/commons/useApiRequest";
import { LOGIN_ROUTE, MethodHttpEnum } from "../request/route-http/route-http";
import { AuthInput } from "../types";
import { CurrentUserResponse } from "../types/current.user.response";

interface AuthProviderProps {
  children: ReactNode;
}

export type SigninResponse = {
  name: string;
  email: string;
  token: string;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<CurrentUserResponse | null>(null);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const currentUser = await getCurrentUser();

      setUser(currentUser);
    } catch (error) {
      console.error("Error getting current user:", error);
    }
  };

  const signin = async (credentials: AuthInput) => {
    const response = await UseRequestApi<SigninResponse, unknown>({
      method: MethodHttpEnum.POST,
      path: LOGIN_ROUTE,
      params: credentials,
      includeAuthorizationHeader: false,
    });

    if (response) {
      const token = response.token;
      localStorage.setItem("BookToken", JSON.stringify(token));
      await getUser();
    }
  };

  const signout = async () => {
    localStorage.removeItem("BookToken");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
