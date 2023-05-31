import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { useState } from 'react';
function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className='w-full h-screen flex flex-col justify-between bg-gray-300 p-5'>
      <Navbar onToggleSidebar={handleToggleSidebar} />
      <div className='flex gap-5 h-4/5'>
        <div
          className={`border border-amber-500 p-5 ${
            isSidebarOpen ? '' : 'hidden'
          }`}
        >
          <Sidebar />
        </div>
        <div className='border flex-grow border-cyan-950 p-5'>
          <Outlet />
        </div>
      </div>
      <div className=''>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
