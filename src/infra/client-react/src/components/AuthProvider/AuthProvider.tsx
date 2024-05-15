import axios, { AxiosError, AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../api/current.user";
import { AuthContext } from "../../context";
import { AuthInput } from "../../types";
import { CurrentUserResponse } from "../../types/current.user.response";

interface AuthProviderProps {
  children: ReactNode;
}

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
    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:3000/auth/login",
        credentials
      );
      if (response.data) {
        const token = response.data.token;
        localStorage.setItem("BookToken", JSON.stringify(token));

        await getUser();
        navigate("/");
      }
    } catch (error) {
      if (error && (error as AxiosError).message === "Network Error") {
        enqueueSnackbar("Une erreur est survenue", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          style: {
            color: "white",
            textAlign: "center",
            margin: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        });
      }

      if (
        (error as AxiosError).response &&
        (error as AxiosError).response!.status === 401
      ) {
        enqueueSnackbar("Mauvais email/mot de passe!", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          style: {
            color: "white",
            textAlign: "center",
            margin: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        });
      }
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
