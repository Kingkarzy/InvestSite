/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { Close, Menu } from '@mui/icons-material';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../state/index';
import logo from '../assets/images/3-removebg-preview.png';
import LogoutIcon from '@mui/icons-material/Logout';
import { useMediaQuery } from '@mui/material';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

function Navbar({ onToggleSidebar }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userId = user._id;
  const [click, setClick] = useState(false);
  const [result, setResult] = useState([]);

  const isNonMobileScreens = useMediaQuery('(min-width: 1024px)');

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/admin/users/${userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setResult(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [userId, user.token]);

  useEffect(() => {
    isNonMobileScreens ? setClick(false) : setClick(true);
    fetchData();
  }, [isNonMobileScreens, fetchData]);

  const handleClick = () => {
    setClick(!click);
    onToggleSidebar(); // Call the onToggleSidebar function from props
  };

  return (
    <nav className='flex justify-between px-5 py-5 bg-white h-[8vh] z-[999]'>
      <button
        className=''
        onClick={handleClick}
      >
        {click ? <Menu /> : <Close />}
      </button>
      <div className='flex justify-center items-center'>
        <Link to='https://goobull.com'>
          <img
            src={logo}
            className='w-[25px]'
            alt='logo'
          />
        </Link>
      </div>
      <div className='flex gap-5 items-center justify-center'>
        <span className=''>
          <h2>{result.username}</h2>
        </span>
        <button
          className='px-3 hover:font-semibold hover:text-red-500'
          onClick={() => dispatch(setLogout())}
        >
          Logout <LogoutIcon />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
