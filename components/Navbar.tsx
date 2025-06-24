import React from 'react'
import { SidebarTrigger } from './ui/sidebar';

const Dashboard = () => {
  return (
    <nav className="top-0 h-12 w-full flex bg-[#FAFAFA] border border-b-2 border-gray-100">
      <div className="p-6 flex items-center justify-between w-full"><SidebarTrigger/></div>
      <div className="flex items-center p-6">
        <h1 className="font-bold text-2xl text-gray-600">DevPulse</h1>
      </div>
    </nav>
  );
}

export default Dashboard