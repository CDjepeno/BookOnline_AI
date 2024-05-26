import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { Route } from "./request/route-http/route-http";

const isAuthenticated = () => {
  return !!localStorage.getItem("BookToken");
};

interface PrivateRouteProps {
  element: ReactNode;
}

export const PrivateRoute = ({ element }: PrivateRouteProps) => {
  return isAuthenticated() ? element : <Navigate to= {Route.LOGIN} />;
};

export default PrivateRoute;
