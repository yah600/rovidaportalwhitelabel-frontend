import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { MadeWithDyad } from '@/components/made-with-dyad';
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
    <div className="relative grid min-h-screen w-full md:grid-cols-[var(--sidebar-width)_1fr] bg-background">
      <Sidebar />
      <div className="flex flex-col">
        <Topbar />
        <main className="flex flex-1 flex-col gap-6 p-6 pb-20"> {/* Added pb-20 to account for fixed quick actions */}
          <Outlet />
        </main>
        <MadeWithDyad />
      </div>
      {/* Fixed Quick Actions Dock */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-md py-4">
        <GlassIcons items={quickActions} className="justify-center" />
      </div>
    </div>
  );
};

export default AppShell;