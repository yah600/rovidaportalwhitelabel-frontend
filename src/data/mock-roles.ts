export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  usersCount: number;
}

export const mockRoles: Role[] = [
  {
    id: 'ROL001',
    name: 'Property Manager',
    description: 'Full access to all building management features.',
    permissions: ['manage_all', 'view_all', 'edit_all'],
    usersCount: 2,
  },
  {
    id: 'ROL002',
    name: 'Resident',
    description: 'Limited access to view own unit details, submit issues, and view announcements.',
    permissions: ['view_own_unit', 'submit_issue', 'view_announcements'],
    usersCount: 150,
  },
  {
    id: 'ROL003',
    name: 'Maintenance Staff',
    description: 'Access to view and update assigned work orders and tasks.',
    permissions: ['view_assigned_work_orders', 'update_work_order_status', 'view_assets'],
    usersCount: 5,
  },
  {
    id: 'ROL004',
    name: 'Board Member',
    description: 'Access to board-specific documents, meetings, and voting.',
    permissions: ['view_board_documents', 'participate_in_votes', 'view_financial_reports'],
    usersCount: 7,
  },
];