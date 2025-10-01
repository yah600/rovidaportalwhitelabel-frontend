import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import Topbar from './Topbar';
import Sidebar from './Sidebar';
// import MobileBottomNav from './MobileBottomNav'; // Removed
import { MadeWithDyad } from '@/components/made-with-dyad';
import Aurora from '@/components/Aurora'; // Import Aurora component
import Dock from '@/components/Dock'; // Import Dock
import { LayoutDashboard, ClipboardList, MessageSquare, MoreHorizontal, Settings, User } from 'lucide-react'; // Import icons for Dock
import { useTranslation } from 'react-i18next'; // Import useTranslation

interface AppShellProps {
  // children: React.ReactNode; // No longer needed with Outlet
}

const AppShell = (/* { children }: AppShellProps */) => { // Remove children prop
  const { t } = useTranslation();

  const dockItems = [
    { icon: <LayoutDashboard size={24} />, label: t('dashboard'), onClick: () => window.location.href = '/dashboard' },
    { icon: <ClipboardList size={24} />, label: t('issues'), onClick: () => window.location.href = '/issues' },
    { icon: <MessageSquare size={24} />, label: t('communications'), onClick: () => window.location.href = '/comms' },
    { icon: <Settings size={24} />, label: t('settings'), onClick: () => window.location.href = '/settings' },
    { icon: <User size={24} />, label: t('profile'), onClick: () => window.location.href = '/profile' },
  ];

  return (
    <div className="relative grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Aurora
        colorStops={["#183747", "#C4972E", "#7C8D89"]} // Using Rovida palette colors
        blend={0.7} // Increased blend for softer edges
        amplitude={0.7} // Reduced amplitude for more subtle waves
        speed={0.3} // Reduced speed for a calmer animation
      />
      <Sidebar />
      <div className="flex flex-col">
        <Topbar />
        <main className="flex flex-1 flex-col gap-6 p-6"> {/* Increased gap and padding for more negative space */}
          <Outlet /> {/* Render child routes here */}
        </main>
        <MadeWithDyad />
      </div>
      {/* <MobileBottomNav /> */} {/* Replaced by Dock */}
      <div className="md:hidden"> {/* Only show Dock on mobile */}
        <Dock items={dockItems} />
      </div>
    </div>
  );
};

export default AppShell;