import { format, subMonths, addDays } from 'date-fns';

export interface StatementEntry {
  id: string;
  date: Date;
  description: string;
  charges: number;
  payments: number;
  balance: number;
}

export interface UnitStatement {
  id: string;
  unitId: string;
  unitNumber: string;
  ownerName: string;
  period: string;
  openingBalance: number;
  closingBalance: number;
  entries: StatementEntry[];
}

export const mockUnitStatements: UnitStatement[] = [
  {
    id: 'US001',
    unitId: 'UNIT001',
    unitNumber: '101',
    ownerName: 'Alice Smith',
    period: 'March 2024',
    openingBalance: 0,
    closingBalance: 1200,
    entries: [
      { id: 'USE001', date: new Date('2024-03-01'), description: 'Monthly Rent', charges: 1200, payments: 0, balance: 1200 },
      { id: 'USE002', date: new Date('2024-03-05'), description: 'Parking Fee', charges: 50, payments: 0, balance: 1250 },
      { id: 'USE003', date: new Date('2024-03-10'), description: 'Payment Received', charges: 0, payments: 1250, balance: 0 },
    ],
  },
  {
    id: 'US002',
    unitId: 'UNIT002',
    unitNumber: '203',
    ownerName: 'Charlie Brown',
    period: 'March 2024',
    openingBalance: 100, // Previous balance
    closingBalance: 1600,
    entries: [
      { id: 'USE004', date: new Date('2024-03-01'), description: 'Monthly Rent', charges: 1500, payments: 0, balance: 1600 },
      { id: 'USE005', date: new Date('2024-03-01'), description: 'Late Fee (Feb Rent)', charges: 100, payments: 0, balance: 1700 },
      { id: 'USE006', date: new Date('2024-03-15'), description: 'Payment Received', charges: 0, payments: 100, balance: 1600 },
    ],
  },
];