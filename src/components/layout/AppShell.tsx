import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { MadeWithDyad } from '@/components/made-with-dyad';
import GlassIcons from '@/components/GlassIcons';
import { PlusCircle, Receipt, Wrench, MessageSquare, FileSignature } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useUser } from '@/context/UserContext';
import { useAuth } from '@/hooks/useAuth';

const AppShell = () => {
  const { t } = useTranslation(['common', 'issues', 'finance', 'communications', 'tenancy']); // Specify namespaces
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useUser();
  const { canRead, canCreate } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      if (!location.pathname.startsWith('/auth') && location.pathname !== '/onboarding') {
        navigate('/auth/login');
      }
    } else if (!currentUser.onboarded) {
      if (location.pathname !== '/onboarding') {
        navigate('/onboarding');
      }
    }
  }, [currentUser, location.pathname, navigate]);

  const quickActions = [
    canCreate('Issues') && { icon: <PlusCircle />, label: t('new issue', { ns: 'common' }), onClick: () => navigate('/issues/new') },
    canRead('Finance - Bills/Recurring/Deposits') && { icon: <Receipt />, label: t('view bills', { ns: 'common' }), onClick: () => navigate('/finance/bills') },
    canRead('Maintenance') && { icon: <Wrench />, label: t('work orders', { ns: 'common' }), onClick: () => navigate('/maintenance/work-orders') },
    canCreate('Communications') && { icon: <MessageSquare />, label: t('announce', { ns: 'common' }), onClick: () => navigate('/comms/send') },
    canRead('Tenancy - Leases') && { icon: <FileSignature />, label: t('view leases', { ns: 'common' }), onClick: () => navigate('/tenancy/leases') },
  ].filter(Boolean);

  if (!currentUser && !location.pathname.startsWith('/auth') && location.pathname !== '/onboarding') {
    return null;
  }

  if (currentUser && !currentUser.onboarded && location.pathname !== '/onboarding') {
    return null;
  }

  return (
    <div className="relative grid min-h-screen w-full md:grid-cols-[var(--sidebar-width)_1fr] bg-background">
      <Sidebar />
      <div className="flex flex-col">
        <Topbar />
        <main className="flex flex-1 flex-col gap-6 p-6 pb-20">
          <Outlet />
        </main>
      </div>
      {currentUser && quickActions.length > 0 && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-md py-4">
          <GlassIcons items={quickActions} className="justify-center" />
        </div>
      )}
    </div>
  );
};

export default AppShell;