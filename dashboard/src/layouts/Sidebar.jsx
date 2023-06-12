import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

function Sidebar() {
  const [click, setClick] = useState(false);
  const handleclick = () => {
    setClick(!click);
  };
  return (
    <nav>
      <ul className="flex flex-col justify-evenly h-[75vh]">
        <li>
          <Link to="/" className="sidebarlinks">
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/myaccount"
            className="sidebarlinks flex justify-between "
            onClick={handleclick}
          >
            My Account
            {click ? <ExpandLess /> : <ExpandMore />}
          </Link>
          {
            <ul className={`${click ? "" : "hidden"} mt-3`}>
              {/* <li>
                <Link
                  to='myaccount/balance'
                  className='text-gray-700 block px-4 py-2 text-sm'
                >
                  Account Balance
                </Link>
              </li> */}
              <li>
                <Link
                  to="/myaccount/withdraw"
                  className="sidebarlinks text-gray-700 block px-4 py-2 text-sm"
                >
                  Account Withdraw
                </Link>
              </li>
              <li>
                <Link
                  to="/myaccount/deposit"
                  className="sidebarlinks text-gray-700 block px-4 py-2 text-sm"
                >
                  Account Deposit
                </Link>
              </li>
            </ul>
          }
        </li>
        <li>
          <Link to="/trade" className="sidebarlinks">
            Start Trade
          </Link>
        </li>
        <li>
          <Link to="/refer" className="sidebarlinks">
            Refer Users
          </Link>
        </li>
        <li>
          <Link to="/support" className="sidebarlinks">
            Support
          </Link>
        </li>
        <li>
          <Link to="/subscription" className="sidebarlinks">
            Subscription
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
