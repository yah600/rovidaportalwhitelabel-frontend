import { ReactNode } from 'react';
import useAuth, { AccessRequirement } from './useAuth';
import { ModuleName } from './permissions';
import { RoleName } from './roles';

interface GuardProps {
  module?: ModuleName;
  requirement?: AccessRequirement;
  roles?: RoleName | RoleName[];
  fallback?: ReactNode;
  children: ReactNode;
}

export const Guard = ({
  module,
  requirement,
  roles,
  fallback = null,
  children,
}: GuardProps) => {
  const { canAccess, hasRole } = useAuth();

  const roleCheck = !roles
    || (Array.isArray(roles)
      ? roles.some(role => hasRole(role))
      : hasRole(roles));

  const permissionCheck = !module || canAccess(module, requirement);

  if (!roleCheck || !permissionCheck) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default Guard;
