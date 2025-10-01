import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { MadeWithDyad } from '@/components/made-with-dyad';
import GlassIcons from '@/components/GlassIcons';
import { PlusCircle, Receipt, Wrench, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useUser } from '@/context/UserContext'; // Import useUser
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

const AppShell = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useUser(); // Get currentUser from context
  const { canRead, canCreate } = useAuth(); // Destructure canRead and canCreate

  // Redirect to login if not authenticated or to onboarding if not onboarded
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

  // Quick actions are only available if a user is logged in AND has permission
  const quickActions = [
    canCreate('Issues') && { icon: <PlusCircle />, label: 'New Issue', onClick: () => navigate('/issues/new') },
    canRead('Finance - Bills/Recurring/Deposits') && { icon: <Receipt />, label: 'View Bills', onClick: () => navigate('/finance/bills') },
    canRead('Maintenance') && { icon: <Wrench />, label: 'Work Orders', onClick: () => navigate('/maintenance/work-orders') },
    canCreate('Communications') && { icon: <MessageSquare />, label: 'Announce', onClick: () => navigate('/comms/send') },
  ].filter(Boolean); // Filter out null/false values

  // If not logged in, render nothing or a loading spinner while redirecting
  if (!currentUser && !location.pathname.startsWith('/auth') && location.pathname !== '/onboarding') {
    return null;
  }

  // If logged in but not onboarded, and not on the onboarding page, render nothing to prevent flicker
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
        <MadeWithDyad />
      </div>
      {/* Fixed Quick Actions Dock - only show if logged in and there are actions */}
      {currentUser && quickActions.length > 0 && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-md py-4">
          <GlassIcons items={quickActions} className="justify-center" />
        </div>
      )}
    </div>
  );
};

export default AppShell;