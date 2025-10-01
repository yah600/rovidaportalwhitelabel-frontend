import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom'; // Import Outlet and useNavigate
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { MadeWithDyad } from '@/components/made-with-dyad';
import Aurora from '@/components/Aurora'; // Import Aurora component
import Dock from '@/components/Dock'; // Import Dock
import GlassIcons from '@/components/GlassIcons'; // Import GlassIcons
import { LayoutDashboard, ClipboardList, MessageSquare, Settings, User, PlusCircle, Receipt, Wrench } from 'lucide-react'; // Import icons for Dock and GlassIcons
import { useTranslation } from 'react-i18next'; // Import useTranslation

interface AppShellProps {
  // children: React.ReactNode; // No longer needed with Outlet
}

const AppShell = (/* { children }: AppShellProps */) => { // Remove children prop
  const { t } = useTranslation();
  const navigate = useNavigate();

  const dockItems = [
    { icon: <LayoutDashboard size={24} />, label: t('dashboard'), onClick: () => navigate('/dashboard') },
    { icon: <ClipboardList size={24} />, label: t('issues'), onClick: () => navigate('/issues') },
    { icon: <MessageSquare size={24} />, label: t('communications'), onClick: () => navigate('/comms') },
    { icon: <Settings size={24} />, label: t('settings'), onClick: () => navigate('/settings') },
    { icon: <User size={24} />, label: t('profile'), onClick: () => navigate('/profile') },
  ];

  const quickActions = [
    { icon: <PlusCircle />, color: 'rovida-gold', label: 'New Issue', onClick: () => navigate('/issues/new') },
    { icon: <Receipt />, color: 'rovida-navy', label: 'View Bills', onClick: () => navigate('/finance/bills') },
    { icon: <Wrench />, color: 'rovida-slate-green-gray', label: 'Work Orders', onClick: () => navigate('/maintenance/work-orders') },
    { icon: <MessageSquare />, color: 'rovida-success', label: 'Announce', onClick: () => navigate('/comms/send') },
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
          <div className="mt-auto flex justify-center py-4"> {/* Centering quick actions at the bottom */}
            <GlassIcons items={quickActions} className="justify-center" />
          </div>
        </main>
        <MadeWithDyad />
      </div>
      <div className="md:hidden"> {/* Only show Dock on mobile */}
        <Dock items={dockItems} />
      </div>
    </div>
  );
};

export default AppShell;