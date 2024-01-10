import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { HomePage } from "./pages/Homepage/HomePage";
import Register from "./pages/register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);
