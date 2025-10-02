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

  // If no current user and not on an auth or onboarding path, don't render anything yet.
  // The useEffect above will handle the navigation.
  if (!currentUser && !location.pathname.startsWith('/auth') && location.pathname !== '/onboarding') {
    return null;
  }

  // If user is logged in but not onboarded, and not on the onboarding path, redirect.
  if (currentUser && !currentUser.onboarded && location.pathname !== '/onboarding') {
    return null;
  }

  const quickActions = [
    canCreate('Issues') && {
      icon: <PlusCircle className="h-5 w-5" />,
      label: t('new issue', { ns: 'common' }),
      onClick: () => navigate('/issues/new'),
    },
    canRead('Finance - Bills/Recurring/Deposits') && {
      icon: <Receipt className="h-5 w-5" />,
      label: t('view bills', { ns: 'common' }),
      onClick: () => navigate('/finance/bills'),
    },
    canRead('Maintenance') && {
      icon: <Wrench className="h-5 w-5" />,
      label: t('work orders', { ns: 'common' }),
      onClick: () => navigate('/maintenance/work-orders'),
    },
    canCreate('Communications') && {
      icon: <MessageSquare className="h-5 w-5" />,
      label: t('announce', { ns: 'common' }),
      onClick: () => navigate('/comms/send'),
    },
    canRead('Tenancy - Leases') && {
      icon: <FileSignature className="h-5 w-5" />,
      label: t('view leases', { ns: 'common' }),
      onClick: () => navigate('/tenancy/leases'),
    },
  ].filter(Boolean); // Filter out any null/false values

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar className="w-[var(--sidebar-width)] flex-shrink-0" />
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-auto custom-scrollbar">
          <Outlet />
        </main>
        <div className="fixed bottom-4 right-4 z-50">
          <GlassIcons items={quickActions} />
        </div>
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default AppShell;