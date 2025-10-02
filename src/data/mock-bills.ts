import { format, addMonths, subDays } from 'date-fns';

export interface Bill {
  id: string;
  vendor: string;
  description: string;
  amount: number;
  currency: string;
  status: 'Paid' | 'Due' | 'Overdue' | 'Pending Approval';
  issueDate: Date;
  dueDate: Date;
  paidDate?: Date;
  category: string;
  type: 'bill' | 'deposit' | 'recurring'; // Added type
}

export const mockBills: Bill[] = [
  {
    id: 'BILL001',
    vendor: 'Hydro Quebec',
    description: 'Electricity bill for Building A - January',
    amount: 1250.75,
    currency: 'CAD',
    status: 'Paid',
    issueDate: new Date('2024-01-05'),
    dueDate: new Date('2024-01-25'),
    paidDate: new Date('2024-01-20'),
    category: 'Utilities',
    type: 'bill',
  },
  {
    id: 'BILL002',
    vendor: 'Maintenance Solutions Inc.',
    description: 'HVAC repair for Unit 203',
    amount: 450.00,
    currency: 'CAD',
    status: 'Due',
    issueDate: new Date('2024-02-10'),
    dueDate: new Date('2024-03-10'),
    category: 'Maintenance',
    type: 'bill',
  },
  {
    id: 'BILL003',
    vendor: 'City of Montreal',
    description: 'Property Tax - Q1 2024',
    amount: 8500.00,
    currency: 'CAD',
    status: 'Overdue',
    issueDate: new Date('2024-01-01'),
    dueDate: new Date('2024-01-31'),
    category: 'Taxes',
    type: 'bill',
  },
  {
    id: 'BILL004',
    vendor: 'Cleaning Services Co.',
    description: 'Monthly common area cleaning - February',
    amount: 300.00,
    currency: 'CAD',
    status: 'Pending Approval',
    issueDate: new Date('2024-02-28'),
    dueDate: new Date('2024-03-28'),
    category: 'Services',
    type: 'bill',
  },
  {
    id: 'BILL005',
    vendor: 'Internet Provider Inc.',
    description: 'Internet service for common areas - March',
    amount: 75.00,
    currency: 'CAD',
    status: 'Due',
    issueDate: new Date('2024-03-01'),
    dueDate: new Date('2024-03-21'),
    category: 'Utilities',
    type: 'bill',
  },
  // Mock Deposits
  {
    id: 'DEP001',
    vendor: 'Unit 101 Tenant',
    description: 'Security Deposit - Unit 101',
    amount: 1200.00,
    currency: 'CAD',
    status: 'Paid',
    issueDate: new Date('2024-01-01'),
    dueDate: new Date('2024-01-01'),
    paidDate: new Date('2024-01-01'),
    category: 'Security Deposit',
    type: 'deposit',
  },
  {
    id: 'DEP002',
    vendor: 'Unit 203 Tenant',
    description: 'First Month Rent - Unit 203',
    amount: 1500.00,
    currency: 'CAD',
    status: 'Paid',
    issueDate: new Date('2024-03-01'),
    dueDate: new Date('2024-03-01'),
    paidDate: new Date('2024-03-01'),
    category: 'Rent Income',
    type: 'deposit',
  },
  // Mock Recurring Charges
  {
    id: 'REC001',
    vendor: 'Unit 101 Tenant',
    description: 'Monthly Rent - Unit 101',
    amount: 1200.00,
    currency: 'CAD',
    status: 'Due',
    issueDate: new Date('2024-04-01'),
    dueDate: new Date('2024-04-05'),
    category: 'Rent',
    type: 'recurring',
  },
  {
    id: 'REC002',
    vendor: 'Unit 203 Tenant',
    description: 'Monthly Rent - Unit 203',
    amount: 1500.00,
    currency: 'CAD',
    status: 'Due',
    issueDate: new Date('2024-04-01'),
    dueDate: new Date('2024-04-05'),
    category: 'Rent',
    type: 'recurring',
  },
];