import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './layouts/MainLayout';
import Account from './pages/MyAccount/Account';
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
import Login from './pages/Login';

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));
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
            path='/'
            element={isAuth ? <Layout /> : <Navigate to='/login' />}
          >
            <Route
              path='/'
              element={
                isAuth ? <Dashboard /> : <Navigate to='/login' />
              }
            />
            <Route
              path='/myaccount'
              element={
                isAuth ? <Account /> : <Navigate to='/login' />
              }
            >
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
              <Route
                path='balance'
                element={
                  isAuth ? <Balance /> : <Navigate to='/login' />
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
              path='/setting'
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
