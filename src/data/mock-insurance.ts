import { format } from 'date-fns';

export interface InsurancePolicy {
  id: string;
  provider: string;
  policyNumber: string;
  type: 'Building' | 'Liability' | 'Property' | 'Flood';
  coverageAmount: number;
  deductible: number;
  startDate: Date;
  endDate: Date;
  status: 'Active' | 'Expired' | 'Pending Renewal';
  contactPerson: string;
  contactPhone: string;
}

export const mockInsurancePolicies: InsurancePolicy[] = [
  {
    id: 'INS001',
    provider: 'SecureCover Insurance',
    policyNumber: 'SC-BLD-2024-001',
    type: 'Building',
    coverageAmount: 5000000,
    deductible: 10000,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    status: 'Active',
    contactPerson: 'Sarah Connor',
    contactPhone: '555-123-4567',
  },
  {
    id: 'INS002',
    provider: 'Global Shield Corp',
    policyNumber: 'GS-LIA-2023-005',
    type: 'Liability',
    coverageAmount: 2000000,
    deductible: 5000,
    startDate: new Date('2023-07-01'),
    endDate: new Date('2024-06-30'),
    status: 'Pending Renewal',
    contactPerson: 'John Smith',
    contactPhone: '555-987-6543',
  },
  {
    id: 'INS003',
    provider: 'PropertyGuard',
    policyNumber: 'PG-PROP-2022-010',
    type: 'Property',
    coverageAmount: 1000000,
    deductible: 2500,
    startDate: new Date('2022-05-01'),
    endDate: new Date('2023-04-30'),
    status: 'Expired',
    contactPerson: 'Emily White',
    contactPhone: '555-111-2222',
  },
];