import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/MainLayout';
import Account from '../pages/MyAccount/Account';
import Balance from '../pages/MyAccount/Balance';
import Withdraw from '../pages/MyAccount/WithDraw';
import Deposit from '../pages/MyAccount/Deposit';
import Refer from '../pages/Refer/Refer';
import Subscription from '../pages/Subscription/Subscription';
import Support from '../pages/Support/Support';
import Trade from '../pages/Trade/Trade';
import Setting from '../pages/AcctDetails/MyAccount';
import Dashboard from '../pages/Dashboard/Dashboard';
import NotFound from '../pages/NotFound/NotFound';
import Login from '../pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    index: true,
    element: <Login />,
  },
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/myaccount',
        element: <Account />,
        children: [
          {
            path: 'balance',
            element: <Balance />,
          },
          {
            path: 'withdraw',
            element: <Withdraw />,
          },
          {
            path: 'deposit',
            element: <Deposit />,
          },
        ],
      },

      {
        path: '/trade',
        element: <Trade />,
      },
      {
        path: '/subscription',
        element: <Subscription />,
      },
      {
        path: '/refer',
        element: <Refer />,
      },
      {
        path: '/support',
        element: <Support />,
      },
      {
        path: '/settings',
        element: <Setting />,
      },
    ],
  },
]);

export default router;
