import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { mockBills } from './mock-bills';
import { mockPayments } from './mock-payments';

export interface MonthlyFinancialSummary {
  month: string;
  income: number;
  expenses: number;
}

export const generateMonthlyFinancialSummary = (): MonthlyFinancialSummary[] => {
  const summaries: { [key: string]: { income: number; expenses: number } } = {};

  // Initialize for last 6 months
  for (let i = 0; i < 6; i++) {
    const monthDate = subMonths(new Date(), i);
    const monthKey = format(monthDate, 'MMM yyyy');
    summaries[monthKey] = { income: 0, expenses: 0 };
  }

  // Process bills as expenses
  mockBills.forEach(bill => {
    const monthKey = format(bill.issueDate, 'MMM yyyy');
    if (summaries[monthKey]) {
      summaries[monthKey].expenses += bill.amount;
    }
  });

  // Process payments as income (simplified, assuming all payments are income)
  mockPayments.forEach(payment => {
    const monthKey = format(payment.paymentDate, 'MMM yyyy');
    if (summaries[monthKey]) {
      summaries[monthKey].income += payment.amount;
    }
  });

  return Object.keys(summaries)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .map(month => ({
      month: format(new Date(month), 'MMM'), // Short month name for chart
      income: parseFloat(summaries[month].income.toFixed(2)),
      expenses: parseFloat(summaries[month].expenses.toFixed(2)),
    }));
};

export const mockMonthlyFinancialSummary = generateMonthlyFinancialSummary();