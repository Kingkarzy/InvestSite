/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { Close, Menu } from '@mui/icons-material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../state/index';

function Navbar({ onToggleSidebar }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  console.log(user);
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
    onToggleSidebar(); // Call the onToggleSidebar function from props
  };

  return (
    <nav className='flex justify-between px-5 py-5 bg-slate-200'>
      <button
        className=''
        onClick={handleClick}
      >
        {click ? <Menu /> : <Close />}
      </button>
      <div>
        <Link to='/'>Logo</Link>
      </div>
      <div className=' flex gap-5'>
        <Link to='/settings'>User Account</Link>
        <h2></h2>
        <button onClick={() => dispatch(setLogout())}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
