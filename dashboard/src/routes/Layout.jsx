import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
function Layout() {
  return (
    <div className="w-full h-screen flex flex-col justify-between bg-gray-300 p-5">
      <Navbar />
      <div className="flex gap-5 h-4/5">
        <div className="border border-amber-500 p-5">
          <Sidebar />
        </div>
        <div className="border flex-grow border-cyan-950 p-5">
          <Outlet />
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
