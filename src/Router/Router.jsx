import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import ActiveSale from "../pages/ActiveSale/ActiveSale";
import Login from "../pages/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <ActiveSale />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
