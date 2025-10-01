import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import MobileBottomNav from './MobileBottomNav';
import { MadeWithDyad } from '@/components/made-with-dyad';

interface AppShellProps {
  // children: React.ReactNode; // No longer needed with Outlet
}

const AppShell = (/* { children }: AppShellProps */) => { // Remove children prop
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Topbar />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet /> {/* Render child routes here */}
        </main>
        <MadeWithDyad />
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default AppShell;