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
            element={
              isAdmin ? (
                <Navigate to='/admin' />
              ) : isAuth ? (
                <Navigate to='/' />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path='/register'
            element={
              isAdmin ? (
                <Navigate to='/admin' />
              ) : isAuth ? (
                <Navigate to='/' />
              ) : (
                <Register />
              )
            }
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
            element={
              isAdmin ? (
                <Navigate to='/admin' />
              ) : isAuth ? (
                <Layout />
              ) : (
                <Navigate to='/login' />
              )
            }
          >
            <Route
              path='/'
              element={
                isAdmin ? (
                  <Navigate to='/admin' />
                ) : isAuth ? (
                  <Dashboard />
                ) : (
                  <Navigate to='/login' />
                )
              }
            />
            <Route path='/myaccount'>
              <Route
                index
                element={
                  isAdmin ? (
                    <Navigate to='/admin' />
                  ) : isAuth ? (
                    <Balance />
                  ) : (
                    <Navigate to='/login' />
                  )
                }
              />
              <Route
                path='withdraw'
                element={
                  isAdmin ? (
                    <Navigate to='/admin' />
                  ) : isAuth ? (
                    <Withdraw />
                  ) : (
                    <Navigate to='/login' />
                  )
                }
              />
              <Route
                path='deposit'
                element={
                  isAdmin ? (
                    <Navigate to='/admin' />
                  ) : isAuth ? (
                    <Deposit />
                  ) : (
                    <Navigate to='/login' />
                  )
                }
              />
            </Route>
            <Route
              path='/refer'
              element={
                isAdmin ? (
                  <Navigate to='/admin' />
                ) : isAuth ? (
                  <Refer />
                ) : (
                  <Navigate to='/login' />
                )
              }
            />
            <Route
              path='/trade'
              element={
                isAdmin ? (
                  <Navigate to='/admin' />
                ) : isAuth ? (
                  <Trade />
                ) : (
                  <Navigate to='/login' />
                )
              }
            />
            <Route
              path='/subscription'
              element={
                isAdmin ? (
                  <Navigate to='/admin' />
                ) : isAuth ? (
                  <Subscription />
                ) : (
                  <Navigate to='/login' />
                )
              }
            />
            <Route
              path='/settings'
              element={
                isAdmin ? (
                  <Navigate to='/admin' />
                ) : isAuth ? (
                  <Setting />
                ) : (
                  <Navigate to='/login' />
                )
              }
            />
            <Route
              path='/support'
              element={
                isAdmin ? (
                  <Navigate to='/admin' />
                ) : isAuth ? (
                  <Support />
                ) : (
                  <Navigate to='/login' />
                )
              }
            />
          </Route>

          {/* ========== SET NOTFOUND ROUTES ========== */}
          <Route
            path='*'
            element={
              isAdmin ? (
                <Navigate to='/admin' />
              ) : isAuth ? (
                <NotFound />
              ) : (
                <Navigate to='/login' />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
