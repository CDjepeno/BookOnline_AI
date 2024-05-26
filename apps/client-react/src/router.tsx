import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "./App";
import AddBook from "./pages/book/Add-book";
import { HomePage } from "./pages/Homepage/HomePage";
import Login from "./pages/login/login";
import Register from "./pages/register/Register";
import PrivateRoute from "./Private-route";
import { Route } from "./request/route-http/route-http";

type CustomRouteObject = RouteObject & {
  element: JSX.Element;
};

const routes: CustomRouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: Route.HOME, element: <HomePage /> },
      { path: Route.REGISTER, element: <Register /> },
      { path: Route.LOGIN, element: <Login /> },
      { path: Route.ADD_BOOK, element: <PrivateRoute element={<AddBook />} /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
