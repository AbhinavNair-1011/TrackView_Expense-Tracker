import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/NavBar';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
