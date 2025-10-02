export const ROLE_IDS = {
  SYSADMIN: 'SYSADMIN',
  PORTFOLIO_MANAGER: 'PORTFOLIO_MANAGER',
  BUILDING_MANAGER: 'BUILDING_MANAGER',
  BOARD: 'BOARD',
  OWNER: 'OWNER',
  TENANT: 'TENANT',
  VENDOR: 'VENDOR',
  SECURITY: 'SECURITY',
  GUEST: 'GUEST',
} as const;

export type RoleId = (typeof ROLE_IDS)[keyof typeof ROLE_IDS];

export type RoleScopeType =
  | 'PLATFORM'
  | 'PORTFOLIO'
  | 'BUILDING'
  | 'UNIT'
  | 'VENDOR'
  | 'LIMITED';

export interface RoleDefinition {
  id: RoleId;
  label: string;
  description: string;
  translationKey: string;
  scopeType: RoleScopeType;
}

export const ROLE_DEFINITIONS: Record<RoleId, RoleDefinition> = {
  [ROLE_IDS.SYSADMIN]: {
    id: ROLE_IDS.SYSADMIN,
    label: 'System Administrator',
    description:
      'Full platform-wide control including organization, portfolio, and building level management.',
    translationKey: 'system administrator',
    scopeType: 'PLATFORM',
  },
  [ROLE_IDS.PORTFOLIO_MANAGER]: {
    id: ROLE_IDS.PORTFOLIO_MANAGER,
    label: 'Portfolio Manager',
    description:
      'Oversees multiple organizations or buildings within a managed portfolio.',
    translationKey: 'portfolio manager',
    scopeType: 'PORTFOLIO',
  },
  [ROLE_IDS.BUILDING_MANAGER]: {
    id: ROLE_IDS.BUILDING_MANAGER,
    label: 'Building Manager',
    description: 'Responsible for day-to-day building operations and resident services.',
    translationKey: 'building manager',
    scopeType: 'BUILDING',
  },
  [ROLE_IDS.BOARD]: {
    id: ROLE_IDS.BOARD,
    label: 'Board Member',
    description: 'Participates in board governance, meetings, and approvals.',
    translationKey: 'board member',
    scopeType: 'BUILDING',
  },
  [ROLE_IDS.OWNER]: {
    id: ROLE_IDS.OWNER,
    label: 'Owner',
    description: 'Owns one or more units within a building and can access related services.',
    translationKey: 'owner',
    scopeType: 'UNIT',
  },
  [ROLE_IDS.TENANT]: {
    id: ROLE_IDS.TENANT,
    label: 'Tenant',
    description: 'Tenant or resident with access to unit and community services.',
    translationKey: 'tenant',
    scopeType: 'UNIT',
  },
  [ROLE_IDS.VENDOR]: {
    id: ROLE_IDS.VENDOR,
    label: 'Vendor / Service Provider',
    description: 'External service provider with access to assigned work and communication.',
    translationKey: 'vendor / service provider',
    scopeType: 'VENDOR',
  },
  [ROLE_IDS.SECURITY]: {
    id: ROLE_IDS.SECURITY,
    label: 'Security & Front Desk',
    description: 'Handles security, front desk operations, and visitor management.',
    translationKey: 'security',
    scopeType: 'BUILDING',
  },
  [ROLE_IDS.GUEST]: {
    id: ROLE_IDS.GUEST,
    label: 'Guest',
    description: 'Limited access user for demonstration or visitor purposes.',
    translationKey: 'guest',
    scopeType: 'LIMITED',
  },
};

export const ROLE_LABELS: Record<RoleId, string> = Object.fromEntries(
  Object.values(ROLE_DEFINITIONS).map(({ id, label }) => [id, label])
) as Record<RoleId, string>;

export const ROLE_TRANSLATION_KEYS: Record<RoleId, string> = Object.fromEntries(
  Object.values(ROLE_DEFINITIONS).map(({ id, translationKey }) => [id, translationKey])
) as Record<RoleId, string>;

export const ROLE_ID_LIST: RoleId[] = Object.values(ROLE_IDS);
