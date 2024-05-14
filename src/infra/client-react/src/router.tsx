import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "./App";
import AddBook from "./pages/book/Add-book";
import Category from "./pages/book/Category";
import { HomePage } from "./pages/Homepage/HomePage";
import Login from "./pages/login/login";
import Register from "./pages/register/Register";
import PrivateRoute from "./Private-route";

type CustomRouteObject = RouteObject & {
  element: JSX.Element;
};

const routes: CustomRouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/Add-book", element: <PrivateRoute element={<AddBook />} /> },
      { path: "/Category", element: <Category /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
