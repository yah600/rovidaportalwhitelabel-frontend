import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth, { AccessRequirement } from './useAuth';
import { ModuleName } from './permissions';
import { RoleName } from './roles';

interface ProtectedRouteProps {
  children: ReactNode;
  module?: ModuleName;
  requirement?: AccessRequirement;
  roles?: RoleName | RoleName[];
  redirectTo?: string;
  unauthenticatedRedirect?: string;
}

export const ProtectedRoute = ({
  children,
  module,
  requirement,
  roles,
  redirectTo = '/',
  unauthenticatedRedirect = '/auth/login',
}: ProtectedRouteProps) => {
  const { currentUser, canAccess, hasRole } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return (
      <Navigate
        to={unauthenticatedRedirect}
        state={{ from: location }}
        replace
      />
    );
  }

  const roleCheck = !roles
    || (Array.isArray(roles)
      ? roles.some(role => hasRole(role))
      : hasRole(roles));

  const permissionCheck = !module || canAccess(module, requirement);

  if (!roleCheck || !permissionCheck) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
