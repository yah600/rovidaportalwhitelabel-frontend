import { format, subMonths, startOfMonth } from 'date-fns';
import { mockBills } from './mock-bills'; // Import mockBills
import { mockPayments } from './mock-payments'; // Import mockPayments

export interface MonthlyFinancialSummary {
  month: string;
  income: number;
  expenses: number;
}

export const generateMonthlyFinancialSummary = (): MonthlyFinancialSummary[] => {
  const summaries: { [key: string]: { income: number; expenses: number; sortDate: Date } } = {};

  // Initialize for last 6 months
  for (let i = 0; i < 6; i++) {
    const monthDate = startOfMonth(subMonths(new Date(), i));
    const monthKey = format(monthDate, 'yyyy-MM-dd');
    summaries[monthKey] = { income: 0, expenses: 0, sortDate: monthDate };
  }

  // Process bills as expenses
  mockBills.forEach(bill => {
    const monthDate = startOfMonth(bill.issueDate);
    const monthKey = format(monthDate, 'yyyy-MM-dd');
    if (summaries[monthKey]) {
      summaries[monthKey].expenses += bill.amount;
    }
  });

  // Process payments as income (simplified, assuming all payments are income)
  mockPayments.forEach(payment => {
    const monthDate = startOfMonth(payment.paymentDate);
    const monthKey = format(monthDate, 'yyyy-MM-dd');
    if (summaries[monthKey]) {
      summaries[monthKey].income += payment.amount;
    }
  });

  return Object.keys(summaries)
    .sort((a, b) => summaries[a].sortDate.getTime() - summaries[b].sortDate.getTime())
    .map(monthKey => ({
      month: format(summaries[monthKey].sortDate, 'MMM'),
      income: parseFloat(summaries[monthKey].income.toFixed(2)),
      expenses: parseFloat(summaries[monthKey].expenses.toFixed(2)),
    }));
};

export const mockMonthlyFinancialSummary = generateMonthlyFinancialSummary();