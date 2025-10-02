import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUser } from './useCurrentUser';
import { Role } from './roles';

interface ProtectedRouteProps {
  allowedRoles: Role[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { role } = useCurrentUser();

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/404" replace />;
  }

  return <Outlet />;
};