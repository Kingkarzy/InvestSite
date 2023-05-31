import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./routes/Layout";
import Account from "./pages/MyAccount/Account";
import Balance from "./pages/MyAccount/Balance";
import Withdraw from "./pages/MyAccount/WithDraw";
import Deposit from "./pages/MyAccount/Deposit";
import Refer from "./pages/Refer/Refer";
import Subscription from "./pages/Subscription/Subscription";
import Support from "./pages/Support/Support";
import Trade from "./pages/Trade/Trade";
import Setting from "./pages/AcctDetails/MyAccount"
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/myaccount",
        element: <Account />,
        children: [
          {
            path: "balance",
            element: <Balance />,
          },
          {
            path: "withdraw",
            element: <Withdraw />,
          },
          {
            path: "deposit",
            element: <Deposit />,
          },
        ],
      },

      {
        path: "/trade",
        element: <Trade />,
      },
      {
        path: "/subscription",
        element: <Subscription />,
      },
      {
        path: "/refer",
        element: <Refer />,
      },
      {
        path: "/support",
        element: <Support />,
      },
      {
        path: "/settings",
        element: <Setting />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
