import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { MadeWithDyad } from '@/components/made-with-dyad';
// Removed Aurora component
// Removed Dock component
import GlassIcons from '@/components/GlassIcons';
import { PlusCircle, Receipt, Wrench, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AppShell = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const quickActions = [
    { icon: <PlusCircle />, label: 'New Issue', onClick: () => navigate('/issues/new') },
    { icon: <Receipt />, label: 'View Bills', onClick: () => navigate('/finance/bills') },
    { icon: <Wrench />, label: 'Work Orders', onClick: () => navigate('/maintenance/work-orders') },
    { icon: <MessageSquare />, label: 'Announce', onClick: () => navigate('/comms/send') },
  ];

  return (
    <div className="relative grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] bg-background"> {/* Set a solid background */}
      {/* Removed Aurora component */}
      <Sidebar />
      <div className="flex flex-col">
        <Topbar />
        <main className="flex flex-1 flex-col gap-6 p-6">
          <Outlet />
          <div className="mt-auto flex justify-center py-4"> {/* Centering quick actions at the bottom */}
            <GlassIcons items={quickActions} className="justify-center" />
          </div>
        </main>
        <MadeWithDyad />
      </div>
      {/* Removed Dock component */}
    </div>
  );
};

export default AppShell;