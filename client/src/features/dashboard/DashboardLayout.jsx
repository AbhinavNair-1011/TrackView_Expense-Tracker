import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const mobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    if (mobile) {
      setIsMobile(true)
    }
    if (!mobile) {
      setIsMobile(false)
      setIsCollapsed(false)
    }


  }, []);

  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />

      <div className="flex mt-14 flex-col">
        <Sidebar
          isMobile={isMobile}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />

        <main className={`flex-1 bg-gray-50 p-3  md:p-6 pt-6 overflow-y-auto  transition-all duration-200 ease-in-out
           ${isCollapsed ? ' mt-16 sm:mt-0 sm:ml-16' : '  mt-16 sm:mt-0 sm:ml-52'}`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
