import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "./App";
import AddBook from "./pages/book/Add-book";
import { HomePage } from "./pages/Homepage/HomePage";
import Login from "./pages/login/login";
import Register from "./pages/register/Register";
import PrivateRoute from "./Private-route";
import { RouterEnum } from "./enum/enum";
import BookDetail from "./pages/book/BookDetail";

type CustomRouteObject = RouteObject & {
  element: JSX.Element;
};

const routes: CustomRouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: RouterEnum.HOME, element: <HomePage /> },
      { path: RouterEnum.REGISTER, element: <Register /> },
      { path: RouterEnum.LOGIN, element: <Login /> },
      { path: RouterEnum.ADD_BOOK, element: <PrivateRoute element={<AddBook />} /> },
      { path: RouterEnum.BOOK, element: <BookDetail/> },
    ],
  },
];

export const router = createBrowserRouter(routes);
