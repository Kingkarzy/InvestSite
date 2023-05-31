import { Link } from "react-router-dom";


function Navbar() {
  return (
    <nav className="flex justify-between">
      <div className="">
        {/* BURGER MENU HERE*/}
        =
      </div>
      <div>
        <Link to="/">Logo</Link>
      </div>
      <div className=" flex gap-5">
        <Link to="/settings">User Account</Link>
        <Link to="/logout">Logout</Link>
      </div>
    </nav>
  );
}

export default Navbar;

