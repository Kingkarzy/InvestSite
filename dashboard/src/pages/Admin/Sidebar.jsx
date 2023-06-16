import {
  LineStyle,
  TrendingUp,
  PermIdentity,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
} from "@mui/icons-material";
import { Link, Outlet } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../state/index";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Sidebar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <div className="flex w-full h-screen bg-[rgb(251,251,255)] top-[50px]">
      <div className="p-5 w-fit text-[#555] flex flex-col gap-10 justify-center  bg-yellow-450 top-0 bottom-0 left-0">
        <span className=" text-center capitalize font-semibold bg-gray-200 rounded-sm shadow-xl">
          <h2>{user.username}</h2>
        </span>
        <div className="mb-[10px]">
          <h3 className="text-sm text-[rgb(187,186,186)]">Dashboard</h3>
          <ul className="p-[5px] list-none">
            <Link to="/admin" className="link">
              <li className="p-[5px] cursor-pointer flex items-center rounded-[10px] hover:bg-[rgb(24,240,255)]">
                <LineStyle className="mr-[5px] text-xl" />
                Home
              </li>
            </Link>
            <Link to="plans" className="link">
              <li className="p-[5px] cursor-pointer flex items-center rounded-[10px] hover:bg-[rgb(24,240,255)]">
                <TrendingUp className="mr-[5px] text-xl" />
                Plans
              </li>
            </Link>
          </ul>
        </div>
        <div className="mb-[10px]">
          <h3 className="text-sm text-[rgb(187,186,186)]">Quick Menu</h3>
          <ul className="p-[5px] list-none">
            <Link to="users" className="link">
              <li className="p-[5px] cursor-pointer flex items-center rounded-[10px] hover:bg-[rgb(255,131,87)]">
                <PermIdentity className="mr-[5px] text-xl" />
                Users
              </li>
            </Link>
            <Link to="deposits" className="link">
              <li className="p-[5px] cursor-pointer flex items-center rounded-[10px] hover:bg-[rgb(255,131,87)]">
                <AttachMoney className="mr-[5px] text-xl" />
                Deposits
              </li>
            </Link>
            <Link to="withdrawals">
              <li className="p-[5px] cursor-pointer flex items-center rounded-[10px] hover:bg-[rgb(255,131,87)]">
                <AttachMoney className="mr-[5px] text-xl" />
                Withdrawals
              </li>
            </Link>
            <li className="p-[5px] cursor-pointer flex items-center rounded-[10px] hover:bg-[rgb(255,131,87)]">
              <BarChart className="mr-[5px] text-xl" />
              Reports
            </li>
          </ul>
        </div>
        <div className="mb-[10px]">
          <h3 className="text-sm text-[rgb(187,186,186)]">Notifications</h3>
          <ul className="p-[5px] list-none">
            <li className="p-[5px] cursor-pointer flex items-center rounded-[10px] hover:bg-[rgb(187,48,255)]">
              <MailOutline className="mr-[5px] text-xl" />
              Mail
            </li>
            <li className="p-[5px] cursor-pointer flex items-center rounded-[10px] hover:bg-[rgb(187,48,255)]">
              <DynamicFeed className="mr-[5px] text-xl" />
              Feedback
            </li>
            <li className="p-[5px] cursor-pointer flex items-center rounded-[10px] hover:bg-[rgb(187,48,255)]">
              <ChatBubbleOutline className="mr-[5px] text-xl" />
              Messages
            </li>
          </ul>
          <br />
          <li className="p-[5px] flex items-center rounded-[10px] hover:bg-black">
            <button
              className="px-3 w-full h-full border border-black font-semibold text-red-500"
              onClick={() => dispatch(setLogout())}
            >
              Logout <LogoutIcon />
            </button>
          </li>
          <li className=" mt-5 flex items-center  ">
            <Link to="https://goobull.com" className="hover:scale-110">
              <ArrowBackIcon /> {""}
              return home
            </Link>
          </li>
        </div>
      </div>
      <div className="w-4/5 p-10 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
