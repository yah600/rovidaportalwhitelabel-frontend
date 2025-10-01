import { format, addYears, subMonths } from 'date-fns';

export interface Lease {
  id: string;
  unitId: string;
  unitNumber: string;
  tenantName: string;
  tenantEmail: string;
  startDate: Date;
  endDate: Date;
  rentAmount: number;
  depositAmount: number;
  status: 'Active' | 'Expired' | 'Pending Renewal' | 'Terminated';
}

export const mockLeases: Lease[] = [
  {
    id: 'LSE001',
    unitId: 'UNIT001',
    unitNumber: '101',
    tenantName: 'Alice Smith',
    tenantEmail: 'alice.smith@example.com',
    startDate: new Date('2023-07-01'),
    endDate: new Date('2024-06-30'),
    rentAmount: 1200,
    depositAmount: 1200,
    status: 'Active',
  },
  {
    id: 'LSE002',
    unitId: 'UNIT002',
    unitNumber: '203',
    tenantName: 'Charlie Brown',
    tenantEmail: 'charlie.brown@example.com',
    startDate: new Date('2023-09-01'),
    endDate: new Date('2024-08-31'),
    rentAmount: 1500,
    depositAmount: 1500,
    status: 'Pending Renewal',
  },
  {
    id: 'LSE003',
    unitId: 'UNIT003',
    unitNumber: '305',
    tenantName: 'Grace Black',
    tenantEmail: 'grace.black@example.com',
    startDate: new Date('2022-01-01'),
    endDate: new Date('2022-12-31'),
    rentAmount: 1000,
    depositAmount: 1000,
    status: 'Expired',
  },
];