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
  },
];