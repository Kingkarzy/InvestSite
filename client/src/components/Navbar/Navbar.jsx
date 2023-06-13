import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import { Button } from './Button';
import { Menu, Close } from '@mui/icons-material';
import Logo from '../../assets/images/black_logo.png';
// import Logo2 from "../../assets/images/white_logo.png";
import './Navbar.css';
import '../../index.css';

function embedTradingViewWidget() {
  window.onload = function () {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = `
    {
      "symbols": [
        {
          "proName": "BITSTAMP:BTCUSD",
          "title": "Bitcoin"
        },
        {
          "proName": "BITSTAMP:ETHUSD",
          "title": "Ethereum"
        },
        {
          "description": "TESLA",
          "proName": "NASDAQ:TSLA"
        },
        {
          "description": "Doge",
          "proName": "BINANCE:DOGEUSD"
        },
        {
          "description": "APPLE",
          "proName": "NASDAQ:AAPL"
        },
        {
          "description": "NVIDIA",
          "proName": "NASDAQ:NVDA"
        }
      ],
      "showSymbolLogo": true,
      "colorTheme": "light",
      "isTransparent": false,
      "displayMode": "adaptive",
      "locale": "en"
    }`;

    const container = document.querySelector(
      '.tradingview-widget-container__widget'
    );
    container.appendChild(script);
  };

  return undefined;
}

function Navbar() {
  useEffect(embedTradingViewWidget, []);

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <div className='mb-20'>
      <nav className='background-gradient navbar'>
        <div className='navbar-container'>
          <NavLink
            to='/'
            className='navbar-logo cursor-pointer'
            onClick={closeMobileMenu}
          >
            <img
              src={Logo}
              alt=' '
              className='logo-img lg:mt-1 mt-4 w-[50px] h-[50px]'
            />
          </NavLink>

          <div
            className='menu-icon text-lg'
            onClick={handleClick}
          >
            {click ? (
              <Close sx={{ color: 'white' }} />
            ) : (
              <Menu sx={{ color: 'white' }} />
            )}
          </div>

          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <NavLink
                to='/'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='/About'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                About Us
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='/packages'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Packages
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='/faq'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                FAQ
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='/terms'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Terms
              </NavLink>
            </li>
            <li className='nav-item flex items-center justify-center'>
              <NavLink
                to='http://dashboard.goobull.com/login'
                className=''
                onClick={closeMobileMenu}
              >
                <button className='text-base px-10 lg:ml-4 lg:mr-2 font-medium hover:border-transparent border  hover:border-indigo-450 bg-black  text-white hover:text-black hover:scale-110 hover:bg-yellow-450'>
                  Login
                </button>
              </NavLink>
            </li>
            <li className='nav-item flex items-center justify-center'>
              <NavLink
                to='http://dashboard.goobull.com/register'
                className=''
                onClick={closeMobileMenu}
              >
                <button className='text-base font-medium px-8 bg-slate-50 dark:bg-slate-700 hover:bg-yellow-450 hover:text-black hover:scale-110 dark:text-white'>
                  Create an account
                </button>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      {/* TradingView Widget */}
      <div className='tradingview-widget-container fixed left-0 right-0 top-[4.95rem] z-[99]'>
        <div className='tradingview-widget-container__widget'></div>
      </div>
    </div>
  );
}

export default Navbar;
