import { ROLES } from './roles';

export const PERMISSIONS = {
  [ROLES.SYSADMIN]: ['/'],
  [ROLES.PORTFOLIO_MANAGER]: ['/'],
  [ROLES.BUILDING_MANAGER]: ['/'],
  [ROLES.BOARD]: ['/'],
  [ROLES.OWNER]: ['/'],
  [ROLES.TENANT]: ['/'],
  [ROLES.VENDOR]: ['/'],
  [ROLES.SECURITY]: ['/'],
  [ROLES.GUEST]: ['/'],
};