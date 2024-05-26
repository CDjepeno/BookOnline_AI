import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { RouterEnum } from "./enum/enum";

const isAuthenticated = () => {
  return !!localStorage.getItem("BookToken");
};

interface PrivateRouteProps {
  element: ReactNode;
}

export const PrivateRoute = ({ element }: PrivateRouteProps) => {
  return isAuthenticated() ? element : <Navigate to= {RouterEnum.LOGIN} />;
};

export default PrivateRoute;
