import { format, subDays } from 'date-fns';

export interface Payment {
  id: string;
  billId: string;
  vendor: string;
  amount: number;
  currency: string;
  paymentDate: Date;
  method: 'Bank Transfer' | 'Credit Card' | 'Cheque';
  status: 'Completed' | 'Failed' | 'Refunded';
}

export const mockPayments: Payment[] = [
  {
    id: 'PAY001',
    billId: 'BILL001',
    vendor: 'Hydro Quebec',
    amount: 1250.75,
    currency: 'CAD',
    paymentDate: new Date('2024-01-20'),
    method: 'Bank Transfer',
    status: 'Completed',
  },
  {
    id: 'PAY002',
    billId: 'BILL003',
    vendor: 'City of Montreal',
    amount: 8500.00,
    currency: 'CAD',
    paymentDate: new Date('2024-02-05'),
    method: 'Bank Transfer',
    status: 'Completed',
  },
  {
    id: 'PAY003',
    billId: 'BILL002',
    vendor: 'Maintenance Solutions Inc.',
    amount: 450.00,
    currency: 'CAD',
    paymentDate: new Date('2024-03-01'),
    method: 'Credit Card',
    status: 'Failed',
  },
  {
    id: 'PAY004',
    billId: 'BILL005',
    vendor: 'Internet Provider Inc.',
    amount: 75.00,
    currency: 'CAD',
    paymentDate: new Date('2024-03-15'),
    method: 'Bank Transfer',
    status: 'Completed',
  },
];