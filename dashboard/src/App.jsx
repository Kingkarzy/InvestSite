/* eslint-disable no-unused-vars */
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './layouts/MainLayout';
// import Account from './pages/MyAccount/Account';
import Balance from './pages/MyAccount/Balance';
import Withdraw from './pages/MyAccount/WithDraw';
import Deposit from './pages/MyAccount/Deposit';
import Refer from './pages/Refer/Refer';
import Subscription from './pages/Subscription/Subscription';
import Support from './pages/Support/Support';
import Trade from './pages/Trade/Trade';
import Setting from './pages/AcctDetails/MyAccount';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound/NotFound';
import Login from './pages/Form/Login';
import Register from './pages/Form/Register';
import Home from './pages/Admin/Home';
import UserList from './pages/Admin/UserList';
import Deposits from './pages/Admin/Deposits';
import Sidebar from './pages/Admin/Sidebar';
import Withdrawals from './pages/Admin/Withdrawals';
import Plans from './pages/Admin/Plans';

function App() {
  const isAuth = useSelector((state) => Boolean(state.token));
  const user = useSelector((state) => state.user);
  const isAdmin = user && user.isAdmin;
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/login'
            index
            element={<Login />}
          />
          <Route
            path='/register'
            element={<Register />}
          />
          <Route
            path='/login'
            index
            element={<Login />}
          />
          <Route
            path='/register'
            element={<Register />}
          />

          {/* ========== SET ADMIN ROUTES ========== */}
          <Route
            path='/admin'
            element={isAdmin ? <Sidebar /> : <Navigate to='/' />}
          >
            <Route
              path='/admin'
              element={isAdmin ? <Home /> : <Navigate to='/' />}
            />
            <Route
              path='/admin/users'
              element={isAdmin ? <UserList /> : <Navigate to='/' />}
            />
            <Route
              path='/admin/withdrawals/'
              element={
                isAdmin ? <Withdrawals /> : <Navigate to='/' />
              }
            />
            <Route
              path='/admin/deposits'
              element={isAdmin ? <Deposits /> : <Navigate to='/' />}
            />
            <Route
              path='/admin/plans'
              element={isAdmin ? <Plans /> : <Navigate to='/' />}
            />
          </Route>

          {/* ========== SET USER ROUTES ========== */}
          <Route
            path='/'
            element={isAuth ? <Layout /> : <Navigate to='/login' />}
          >
            <Route
              path='/'
              element={
                isAuth ? <Dashboard /> : <Navigate to='/login' />
              }
            />
            <Route path='/myaccount'>
              <Route
                index
                element={
                  isAuth ? <Balance /> : <Navigate to='/login' />
                }
              />
              <Route
                path='withdraw'
                element={
                  isAuth ? <Withdraw /> : <Navigate to='/login' />
                }
              />
              <Route
                path='deposit'
                element={
                  isAuth ? <Deposit /> : <Navigate to='/login' />
                }
              />
            </Route>
            <Route
              path='/refer'
              element={isAuth ? <Refer /> : <Navigate to='/login' />}
            />
            <Route
              path='/trade'
              element={isAuth ? <Trade /> : <Navigate to='/login' />}
            />
            <Route
              path='/subscription'
              element={
                isAuth ? <Subscription /> : <Navigate to='/login' />
              }
            />
            <Route
              path='/settings'
              element={
                isAuth ? <Setting /> : <Navigate to='/login' />
              }
            />
            <Route
              path='/support'
              element={
                isAuth ? <Support /> : <Navigate to='/login' />
              }
            />
          </Route>

          {/* ========== SET NOTFOUND ROUTES ========== */}
          <Route
            path='*'
            element={isAuth ? <NotFound /> : <Navigate to='/login' />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
