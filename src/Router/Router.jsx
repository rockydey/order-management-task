import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import ActiveSale from "../pages/ActiveSale/ActiveSale";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <ActiveSale />,
      },
    ],
  },
]);

export default router;
