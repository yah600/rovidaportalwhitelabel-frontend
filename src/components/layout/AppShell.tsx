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

  // Temporarily simplified for debugging
  if (!currentUser && !location.pathname.startsWith('/auth') && location.pathname !== '/onboarding') {
    return null;
  }

  if (currentUser && !currentUser.onboarded && location.pathname !== '/onboarding') {
    return null;
  }

  return (
    <div style={{ backgroundColor: 'lime', width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black' }}>
      <h1>Hello from AppShell!</h1>
    </div>
  );
};

export default AppShell;