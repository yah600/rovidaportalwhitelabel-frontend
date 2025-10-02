import { useUser } from '@/context/UserContext';
import { Role } from './roles';
import { Resource, Action, hasPermission, hasAnyRole, canAccessResource } from './permissions';

/**
 * useAuth Hook
 * Provides authentication and authorization utilities
 *
 * @example
 * const { user, hasRole, can, canAccess } = useAuth();
 * if (hasRole([ROLES.SYSADMIN])) { ... }
 * if (can('finance:bills', 'create')) { ... }
 */
export function useAuth() {
  const { currentUser, login, logout, setCurrentUser } = useUser();

  // Extract user roles
  const userRoles: Role[] = currentUser?.roles.map((r) => r.name as Role) || [];

  /**
   * Check if user has any of the specified roles
   */
  const hasRole = (allowedRoles: Role[]): boolean => {
    return hasAnyRole(userRoles, allowedRoles);
  };

  /**
   * Check if user has permission for resource + action
   */
  const can = (resource: Resource, action: Action): boolean => {
    return userRoles.some((role) => hasPermission(role, resource, action));
  };

  /**
   * Check if user can access a resource (any action)
   */
  const canAccess = (resource: Resource): boolean => {
    return canAccessResource(userRoles, resource);
  };

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = (): boolean => {
    return !!currentUser;
  };

  /**
   * Get highest role (by hierarchy level)
   */
  const getPrimaryRole = (): Role | null => {
    if (userRoles.length === 0) return null;
    // Return first role as primary (could enhance with hierarchy sorting)
    return userRoles[0];
  };

  return {
    user: currentUser,
    userRoles,
    isAuthenticated,
    hasRole,
    can,
    canAccess,
    getPrimaryRole,
    login,
    logout,
    setUser: setCurrentUser,
  };
}
