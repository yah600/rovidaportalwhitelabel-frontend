import { ROLE_IDS, RoleId } from '@/shared/rbac/roles';

export interface Role {
  id: string;
  roleId: RoleId;
  description: string;
  permissions: string[];
  usersCount: number;
}

export const mockRoles: Role[] = [
  {
    id: 'ROL001',
    roleId: ROLE_IDS.SYSADMIN,
    description: 'Full platform administration, configuration, and access management.',
    permissions: ['manage_platform', 'manage_security', 'view_all'],
    usersCount: 1,
  },
  {
    id: 'ROL002',
    roleId: ROLE_IDS.PORTFOLIO_MANAGER,
    description: 'Oversees multiple organizations, reporting, and performance metrics.',
    permissions: ['view_portfolio', 'manage_buildings', 'view_financials'],
    usersCount: 2,
  },
  {
    id: 'ROL003',
    roleId: ROLE_IDS.BUILDING_MANAGER,
    description: 'Manages day-to-day building operations, maintenance, and resident services.',
    permissions: ['manage_work_orders', 'communicate_residents', 'view_documents'],
    usersCount: 3,
  },
  {
    id: 'ROL004',
    roleId: ROLE_IDS.BOARD,
    description: 'Participates in governance, approvals, and meeting oversight.',
    permissions: ['review_minutes', 'vote_items', 'view_financial_reports'],
    usersCount: 5,
  },
  {
    id: 'ROL005',
    roleId: ROLE_IDS.OWNER,
    description: 'Access to owned unit details, billing, and community updates.',
    permissions: ['view_unit', 'submit_requests', 'view_statements'],
    usersCount: 120,
  },
  {
    id: 'ROL006',
    roleId: ROLE_IDS.TENANT,
    description: 'Tenant access to lease information, issues, and announcements.',
    permissions: ['view_unit', 'submit_issue', 'view_announcements'],
    usersCount: 180,
  },
  {
    id: 'ROL007',
    roleId: ROLE_IDS.VENDOR,
    description: 'External service provider with task assignments and messaging.',
    permissions: ['view_assigned_tasks', 'update_work_order_status', 'message_team'],
    usersCount: 8,
  },
  {
    id: 'ROL008',
    roleId: ROLE_IDS.SECURITY,
    description: 'Front desk and security oversight with visitor management tools.',
    permissions: ['manage_visitors', 'log_incidents', 'communicate_residents'],
    usersCount: 6,
  },
  {
    id: 'ROL009',
    roleId: ROLE_IDS.GUEST,
    description: 'Limited demonstration access to read-only dashboards and documents.',
    permissions: ['view_dashboard', 'view_documents'],
    usersCount: 12,
  },
];