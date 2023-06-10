import {
  LineStyle,
  TrendingUp,
  PermIdentity,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
} from '@mui/icons-material';
import { Link, Outlet } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className='flex h-screen bg-[rgb(251,251,255)] sticky top-[50px] justify-between'>
      <div className='p-5 text-[#555] flex flex-col gap-10 justify-center fixed bg-yellow-400 top-0 bottom-0'>
        <div className='mb-[10px]'>
          <h3 className='text-sm text-[rgb(187,186,186)]'>
            Dashboard
          </h3>
          <ul className='p-[5px] list-none'>
            <Link
              to='/admin'
              className='link'
            >
              <li className='p-[5px] cursor-pointer flex items-center rounded-[10px] hover:bg-[rgb(24,240,255)]'>
                <LineStyle className='mr-[5px] text-xl' />
                Home
              </li>
            </Link>
            <li className='p-[5px] cursor-pointer flex items-center rounded-[10px] hover:bg-[rgb(24,240,255)]'>
              <TrendingUp className='mr-[5px] text-xl' />
              Plans
            </li>
          </ul>
        </div>
        <div className='mb-[10px]'>
          <h3 className='text-sm text-[rgb(187,186,186)]'>
            Quick Menu
          </h3>
          <ul className='p-[5px] list-none'>
            <Link
              to='users'
              className='link'
            >
              <li className='p-[5px] cursor-pointer flex items-center rounded-[10px] hover:bg-[rgb(255,131,87)]'>
                <PermIdentity className='mr-[5px] text-xl' />
                Users
              </li>
            </Link>
            <Link
              to='deposits'
              className='link'
            >
              <li className='p-[5px] cursor-pointer flex items-center rounded-[10px] hover:bg-[rgb(255,131,87)]'>
                <AttachMoney className='mr-[5px] text-xl' />
                Deposits
              </li>
            </Link>
            <Link to='withdrawals'>
              <li className='p-[5px] cursor-pointer flex items-center rounded-[10px] hover:bg-[rgb(255,131,87)]'>
                <AttachMoney className='mr-[5px] text-xl' />
                Withdrawals
              </li>
            </Link>
            <li className='p-[5px] cursor-pointer flex items-center rounded-[10px] hover:bg-[rgb(255,131,87)]'>
              <BarChart className='mr-[5px] text-xl' />
              Reports
            </li>
          </ul>
        </div>
        <div className='mb-[10px]'>
          <h3 className='text-sm text-[rgb(187,186,186)]'>
            Notifications
          </h3>
          <ul className='p-[5px] list-none'>
            <li className='p-[5px] cursor-pointer flex items-center rounded-[10px] hover:bg-[rgb(187,48,255)]'>
              <MailOutline className='mr-[5px] text-xl' />
              Mail
            </li>
            <li className='p-[5px] cursor-pointer flex items-center rounded-[10px] hover:bg-[rgb(187,48,255)]'>
              <DynamicFeed className='mr-[5px] text-xl' />
              Feedback
            </li>
            <li className='p-[5px] cursor-pointer flex items-center rounded-[10px] hover:bg-[rgb(187,48,255)]'>
              <ChatBubbleOutline className='mr-[5px] text-xl' />
              Messages
            </li>
          </ul>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
