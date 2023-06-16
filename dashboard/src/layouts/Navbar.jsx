/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { Close, Menu, Settings } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../state/index";
import logo from "../assets/images/3-removebg-preview.png";
import LogoutIcon from "@mui/icons-material/Logout";

function Navbar({ onToggleSidebar }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
    onToggleSidebar(); // Call the onToggleSidebar function from props
  };

  return (
    <nav className="flex justify-between px-5 py-5 bg-white">
      <button className="" onClick={handleClick}>
        {click ? <Menu /> : <Close />}
      </button>
      <div>
        <Link to="https://goobull.com">
          <img src={logo} className="w-[25px]" alt="logo" />
        </Link>
      </div>
      <div className="flex gap-5">
        <Link to="/settings" className="flex gap-5 hover:scale-95">
          <Settings />
        </Link>{" "}
        <span className="">
          <h2>{user.username}</h2>
        </span>
        <button
          className="px-3 hover:font-semibold hover:text-red-500"
          onClick={() => dispatch(setLogout())}
        >
          Logout <LogoutIcon />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
