import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from "./Sidebar";
import Footer from './Footer';
import { useState } from 'react';
function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="w-full h-full gap-10 flex flex-col justify-evenly bg-gray-300 p-5">
      <Navbar onToggleSidebar={handleToggleSidebar} />
      <div className="flex gap-5 h-4/5">
        <div
          className={`border border-amber-500 p-5 w-56 ${
            isSidebarOpen ? "" : "hidden"
          }`}
        >
          <Sidebar />
        </div>
        <div className="border flex-grow border-cyan-950 p-5">
          <Outlet />
        </div>
      </div>
      <div className="ju">
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
