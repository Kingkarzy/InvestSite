/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { Close, Menu } from '@mui/icons-material';
import { useState } from 'react';

function Navbar({ onToggleSidebar }) {
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
        <Link to='/logout'>Logout</Link>
      </div>
    </nav>
  );
}

export default Navbar;
