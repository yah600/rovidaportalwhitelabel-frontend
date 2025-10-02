import React from 'react';
import { Role, ROLES } from './roles';

interface GuardProps {
  roles: Role[];
  children: React.ReactNode;
}

// TODO: Replace with a real useCurrentUser hook
const useCurrentUser = () => {
  return { role: ROLES.SYSADMIN };
};

export const Guard: React.FC<GuardProps> = ({ roles, children }) => {
  const { role } = useCurrentUser();

  if (!roles.includes(role)) {
    return null;
  }

  return <>{children}</>;
};