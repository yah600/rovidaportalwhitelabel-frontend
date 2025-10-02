import { format, subMonths } from 'date-fns';

export interface LedgerEntry {
  id: string;
  date: Date;
  account: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
}

export const mockLedger: LedgerEntry[] = [
  { id: 'L001', date: subMonths(new Date(), 2), account: 'Cash', description: 'Opening Balance', debit: 0, credit: 0, balance: 10000 },
  { id: 'L002', date: subMonths(new Date(), 2), account: 'Rent Income', description: 'Rent collected Unit 101', debit: 0, credit: 1200, balance: 11200 },
  { id: 'L003', date: subMonths(new Date(), 2), account: 'Utilities Expense', description: 'Hydro Quebec Bill', debit: 250, credit: 0, balance: 10950 },
  { id: 'L004', date: subMonths(new Date(), 1), account: 'Cash', description: 'Deposit from Unit 203', debit: 500, credit: 0, balance: 11450 },
  { id: 'L005', date: subMonths(new Date(), 1), account: 'Maintenance Expense', description: 'HVAC Repair', debit: 400, credit: 0, balance: 11050 },
];

export interface TrialBalanceEntry {
  account: string;
  debit: number;
  credit: number;
}

export const mockTrialBalance: TrialBalanceEntry[] = [
  { account: 'Cash', debit: 11050, credit: 0 },
  { account: 'Accounts Receivable', debit: 1500, credit: 0 },
  { account: 'Rent Income', debit: 0, credit: 2400 },
  { account: 'Utilities Expense', debit: 500, credit: 0 },
  { account: 'Maintenance Expense', debit: 800, credit: 0 },
  { account: 'Owner Equity', debit: 0, credit: 11450 },
];

export interface ProfitLossEntry {
  category: string;
  amount: number;
  type: 'income' | 'expense';
}

export const mockProfitLoss: ProfitLossEntry[] = [
  { category: 'Rent Income', amount: 2400, type: 'income' },
  { category: 'Laundry Income', amount: 150, type: 'income' },
  { category: 'Utilities Expense', amount: 500, type: 'expense' },
  { category: 'Maintenance Expense', amount: 800, type: 'expense' },
  { category: 'Administrative Expense', amount: 300, type: 'expense' },
];

export interface BalanceSheetEntry {
  category: string;
  amount: number;
  type: 'asset' | 'liability' | 'equity';
}

export const mockBalanceSheet: BalanceSheetEntry[] = [
  { category: 'Cash', amount: 11050, type: 'asset' },
  { category: 'Accounts Receivable', amount: 1500, type: 'asset' },
  { category: 'Property Value', amount: 1500000, type: 'asset' },
  { category: 'Accounts Payable', amount: 700, type: 'liability' },
  { category: 'Owner Equity', amount: 1511850, type: 'equity' },
];