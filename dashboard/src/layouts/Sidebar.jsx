import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ExpandMore,
  ExpandLess,
  Settings,
  ChevronLeftRounded,
} from '@mui/icons-material';
function Sidebar() {
  const [click, setClick] = useState(false);
  const handleclick = () => {
    setClick(!click);
  };
  return (
    <nav className='bg-white w-full p-5'>
      <ul className='flex flex-col justify-evenly h-[75vh]'>
        <li>
          <Link
            to='/'
            className='sidebarlinks'
          >
            Dashboard
          </Link>
        </li>
        <li>
          <span
            // to="/myaccount"
            className='sidebarlinks flex justify-between cursor-pointer'
            onClick={handleclick}
          >
            My Account
            {click ? <ExpandLess /> : <ExpandMore />}
          </span>
          {
            <ul className={`${click ? '' : 'hidden'} mt-3`}>
              <li>
                <Link
                  to='/myaccount/balance'
                  className='sidebarlinks text-gray-700 block px-4 py-2 text-sm'
                >
                  Account Balance
                </Link>
              </li>
              <li>
                <Link
                  to='/myaccount/withdraw'
                  className='sidebarlinks text-gray-700 block px-4 py-2 text-sm'
                >
                  Account Withdraw
                </Link>
              </li>
              <li>
                <Link
                  to='/myaccount/deposit'
                  className='sidebarlinks text-gray-700 block px-4 py-2 text-sm'
                >
                  Account Deposit
                </Link>
              </li>
            </ul>
          }
        </li>
        <li>
          <Link
            to='/trade'
            className='sidebarlinks'
          >
            Start Trade
          </Link>
        </li>
        {/* <li>
          <Link to="/refer" className="sidebarlinks">
            Refer Users
          </Link>
        </li> */}
        <li>
          <Link
            to='/support'
            className='sidebarlinks'
          >
            Support
          </Link>
        </li>
        <li>
          <Link
            to='/subscription'
            className='sidebarlinks'
          >
            Subscription
          </Link>
        </li>
        <li className=''>
          <Link
            to='/settings'
            className='flex gap-5 hover:scale-95'
          >
            Settings
            <Settings />
          </Link>
        </li>
        <li>
          <Link
            to='https://goobull.com'
            className='flex items-center'
          >
            <ChevronLeftRounded sx={{ fontSize: '2rem' }} />
            Return Home
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
