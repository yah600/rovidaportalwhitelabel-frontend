import { ROLES } from './roles';

// This is a mock implementation of useCurrentUser.
// In a real application, this would be replaced with a proper authentication context.
export const useCurrentUser = () => {
  return {
    role: ROLES.SYSADMIN,
    name: 'System Administrator',
    email: 'admin@example.com',
  };
};
