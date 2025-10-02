import { ROLES } from '../../shared/rbac';

export const mockLeases = [
  {
    id: 'lease-1',
    unit: '101',
    tenant: 'John Doe',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    rent: 1200,
    status: 'Active',
  },
  {
    id: 'lease-2',
    unit: '102',
    tenant: 'Jane Smith',
    startDate: '2023-02-01',
    endDate: '2024-01-31',
    rent: 1300,
    status: 'Active',
  },
];

export const mockUnitStatements = [
  {
    id: 'stmt-1',
    unit: '101',
    date: '2023-10-01',
    total: 1250,
    status: 'Paid',
  },
  {
    id: 'stmt-2',
    unit: '102',
    date: '2023-10-01',
    total: 1350,
    status: 'Due',
  },
];
