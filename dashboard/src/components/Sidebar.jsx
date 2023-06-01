import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

function Sidebar() {
  const [click, setClick] = useState(false);
  const handleclick = () => {
    // e.preventDefault()
    setClick(!click);
  };
  return (
    <nav>
      <ul className='flex flex-col gap-5'>
        <li>
          <Link to='/'>Dashboard</Link>
        </li>
        <li>
          <Link
            to='/myaccount'
            className='flex justify-between'
            onClick={handleclick}
          >
            My Account
            {click ? <ExpandLess /> : <ExpandMore />}
          </Link>
          {
            <ul className={`${click ? '' : 'hidden'} mt-3`}>
              <li>
                <Link
                  to='myaccount/balance'
                  className='text-gray-700 block px-4 py-2 text-sm'
                >
                  Account Balance
                </Link>
              </li>
              <li>
                <Link
                  to='/myaccount/withdraw'
                  className='text-gray-700 block px-4 py-2 text-sm'
                >
                  Account Withdraw
                </Link>
              </li>
              <li>
                <Link
                  to='/myaccount/deposit'
                  className='text-gray-700 block px-4 py-2 text-sm'
                >
                  Account Deposit
                </Link>
              </li>
            </ul>
          }
        </li>
        <li>
          <Link to='/trade'>Start Trade</Link>
        </li>
        <li>
          <Link to='/refer'>Refer Users</Link>
        </li>
        <li>
          <Link to='/support'>Support</Link>
        </li>
        <li>
          <Link to='/subscription'>Subscription</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
