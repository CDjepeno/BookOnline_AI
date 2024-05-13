import { useContext } from "react";
import { Navigate, Route, createBrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthContext } from "./context";
import { HomePage } from "./pages/Homepage/HomePage";
import AddBook from "./pages/book/Add-book";
import Category from "./pages/book/Category";
import Login from "./pages/login/login";
import Register from "./pages/register/Register";
import { AuthContextValue } from "./types/auth.context.value";

interface ProtectedRouteProps {
  element: React.ReactNode;
  path: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element: Element,
  path,
}: ProtectedRouteProps) => {
  const { user } = useContext(AuthContext) as AuthContextValue;

  return (
    <Route
      path={path}
      element={user ? <Element /> : <Navigate to="/login" replace />}
    />
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/Add-book", element: <ProtectedRoute element={<AddBook />} /> },
      // { path: "/Add-book", element: <AddBook /> },
      { path: "/Category", element: <Category /> },
    ],
  },
]);
