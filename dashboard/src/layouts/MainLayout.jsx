import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useState } from 'react';
function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className='w-full h-full flex flex-col justify-evenly bg-gray-100'>
      <Navbar onToggleSidebar={handleToggleSidebar} />
      <div className='flex h-4/5 min-h-[85vh]'>
        <div
          className={`border-amber-500 p-5 w-56 z-50 fixed bg-white left-0 lg:relative ${
            isSidebarOpen ? '' : 'hidden'
          }`}
          style={{
            height: '85vh',
            '@media (minWidth: 768px)': {
              height: 'auto',
            },
          }}
        >
          <Sidebar />
        </div>
        <div className='flex-grow border-cyan-950 p-3 rounded-xl'>
          <Outlet />
        </div>
      </div>
      <div className='py-5 bg-slate-200'>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
