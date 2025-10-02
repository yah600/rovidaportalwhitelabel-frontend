export const ROLES = [
  'Platform Owner',
  'Client Super-Administrator',
  'Condo Administrator',
  'Property Manager',
  'Accountant',
  'Board Member',
  'Owner',
  'Tenant',
  'Vendor / Service Provider',
  'Emergency Agent',
  'Concierge / Front Desk / Security',
  'Building Maintenance Technician',
  'Read-Only Auditor',
] as const;

export type RoleName = (typeof ROLES)[number];
