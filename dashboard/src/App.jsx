import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./layouts/MainLayout";
import Account from "./pages/MyAccount/Account";
import Balance from "./pages/MyAccount/Balance";
import Withdraw from "./pages/MyAccount/WithDraw";
import Deposit from "./pages/MyAccount/Deposit";
import Refer from "./pages/Refer/Refer";
import Subscription from "./pages/Subscription/Subscription";
import Support from "./pages/Support/Support";
import Trade from "./pages/Trade/Trade";
import Setting from "./pages/AcctDetails/MyAccount";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Login />} />
          <Route
            path="/home"
            element={isAuth ? <Layout /> : <Navigate to="/" />}
          />
          <Route
            path="/dashboard"
            element={isAuth ? <Dashboard /> : <Navigate to="/" />}
          />
          vars
          <Route
            path="/myaccount"
            element={isAuth ? <Account /> : <Navigate to="/" />}
          >
            <Route
              path="withdraw"
              element={isAuth ? <Withdraw /> : <Navigate to="/" />}
            />
            <Route
              path="deposit"
              element={isAuth ? <Deposit /> : <Navigate to="/" />}
            />
            <Route
              path="balance"
              element={isAuth ? <Balance /> : <Navigate to="/" />}
            />
          </Route>
          <Route
            path="/refer"
            element={isAuth ? <Refer /> : <Navigate to="/" />}
          />
          <Route
            path="/trade"
            element={isAuth ? <Trade /> : <Navigate to="/" />}
          />
          <Route
            path="/subscription"
            element={isAuth ? <Subscription /> : <Navigate to="/" />}
          />
          <Route
            path="/setting"
            element={isAuth ? <Setting /> : <Navigate to="/" />}
          />
          <Route
            path="/support"
            element={isAuth ? <Support /> : <Navigate to="/" />}
          />
          <Route
            path="*"
            element={isAuth ? <NotFound /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
