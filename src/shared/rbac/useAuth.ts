import { useMemo } from 'react';
import { useUser } from '@/context/UserContext';
import { PERMISSIONS_MATRIX, ModuleName, PermissionAction } from './permissions';
import { RoleName } from './roles';

export type AccessRequirement =
  | PermissionAction
  | PermissionAction[]
  | {
      anyOf?: PermissionAction[];
      allOf?: PermissionAction[];
    };

const normalizeRoles = (roleNames: string[] = []): RoleName[] =>
  roleNames.filter(
    (roleName): roleName is RoleName =>
      Object.prototype.hasOwnProperty.call(PERMISSIONS_MATRIX, roleName),
  );

const roleHasPermission = (
  roleName: RoleName,
  moduleName: ModuleName,
  action: PermissionAction,
): boolean => {
  const rolePermissions = PERMISSIONS_MATRIX[roleName];
  const modulePermissions = rolePermissions?.[moduleName];
  return Boolean(modulePermissions?.[action]);
};

export const evaluateAccess = (
  roleNames: string[] | undefined,
  moduleName: ModuleName,
  requirement?: AccessRequirement,
): boolean => {
  if (!moduleName) {
    return true;
  }

  const normalizedRoles = normalizeRoles(roleNames);
  if (normalizedRoles.length === 0) {
    return false;
  }

  const check = (action: PermissionAction) =>
    normalizedRoles.some(roleName => roleHasPermission(roleName, moduleName, action));

  if (!requirement) {
    return check('read');
  }

  if (typeof requirement === 'string') {
    return check(requirement);
  }

  if (Array.isArray(requirement)) {
    return requirement.some(check);
  }

  const { allOf, anyOf } = requirement;

  if (allOf?.length) {
    return allOf.every(check);
  }

  if (anyOf?.length) {
    return anyOf.some(check);
  }

  return check('read');
};

export const useAuth = () => {
  const { currentUser } = useUser();

  const roleNames = useMemo(
    () => currentUser?.roles?.map(role => role.name) ?? [],
    [currentUser?.roles],
  );

  const hasRole = (role: RoleName | RoleName[]) => {
    const requiredRoles = Array.isArray(role) ? role : [role];
    return requiredRoles.some(requiredRole => roleNames.includes(requiredRole));
  };

  const can = (moduleName: ModuleName, action: PermissionAction = 'read') =>
    evaluateAccess(roleNames, moduleName, action);

  const canAccess = (moduleName: ModuleName, requirement?: AccessRequirement) =>
    evaluateAccess(roleNames, moduleName, requirement);

  return {
    currentUser,
    can,
    canAccess,
    hasRole,
    canRead: (moduleName: ModuleName) => can(moduleName, 'read'),
    canCreate: (moduleName: ModuleName) => can(moduleName, 'create'),
    canUpdate: (moduleName: ModuleName) => can(moduleName, 'update'),
    canDelete: (moduleName: ModuleName) => can(moduleName, 'delete'),
    canApprove: (moduleName: ModuleName) => can(moduleName, 'approve'),
    canExport: (moduleName: ModuleName) => can(moduleName, 'export'),
    canPerformSpecial: (moduleName: ModuleName) => can(moduleName, 'special'),
  };
};

export default useAuth;
