import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  return !!localStorage.getItem("BookToken");
};

interface PrivateRouteProps {
  element: ReactNode;
}

export const PrivateRoute = ({ element }: PrivateRouteProps) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
