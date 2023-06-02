import { Outlet } from 'react-router-dom';

function Account() {
  return (
    <div className=''>
      <div className=' border border-blue-300 mb-5 p-5'>
        My Account
      </div>
      <div className=''>
        <Outlet />
      </div>
    </div>
  );
}

export default Account;
