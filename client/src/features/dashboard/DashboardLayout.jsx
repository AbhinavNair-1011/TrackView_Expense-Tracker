import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />

    <div className="flex mt-14 flex-col md:flex-row">
  <Sidebar 
    isCollapsed={isCollapsed}
    setIsCollapsed={setIsCollapsed}
    className={`${isCollapsed ? 'w-16' : 'w-52'} md:w-auto`} // Mobile: full width, Desktop: collapsed/expanded width
  />

  <main className={`flex-1 bg-gray-50 p-4 overflow-y-auto 
    ${isCollapsed ? 'md:ml-16' : 'md:ml-52'}`}
  >
    <Outlet />
  </main>
</div>
    </div>
  );
};

export default DashboardLayout;
