import { format, subMonths, startOfMonth } from 'date-fns'; // Added startOfMonth

export interface MonthlyFinancialSummary {
  month: string;
  income: number;
  expenses: number;
}

export const generateMonthlyFinancialSummary = (): MonthlyFinancialSummary[] => {
  const summaries: { [key: string]: { income: number; expenses: number; sortDate: Date } } = {}; // Added sortDate

  // Initialize for last 6 months
  for (let i = 0; i < 6; i++) {
    const monthDate = startOfMonth(subMonths(new Date(), i)); // Get start of month
    const monthKey = format(monthDate, 'yyyy-MM-dd'); // Use ISO-like format for key
    summaries[monthKey] = { income: 0, expenses: 0, sortDate: monthDate }; // Store actual date for sorting
  }

  // Process bills as expenses
  mockBills.forEach(bill => {
    const monthDate = startOfMonth(bill.issueDate); // Get start of month for bill date
    const monthKey = format(monthDate, 'yyyy-MM-dd');
    if (summaries[monthKey]) {
      summaries[monthKey].expenses += bill.amount;
    }
  });

  // Process payments as income (simplified, assuming all payments are income)
  mockPayments.forEach(payment => {
    const monthDate = startOfMonth(payment.paymentDate); // Get start of month for payment date
    const monthKey = format(monthDate, 'yyyy-MM-dd');
    if (summaries[monthKey]) {
      summaries[monthKey].income += payment.amount;
    }
  });

  return Object.keys(summaries)
    .sort((a, b) => summaries[a].sortDate.getTime() - summaries[b].sortDate.getTime()) // Sort using stored Date objects
    .map(monthKey => ({
      month: format(summaries[monthKey].sortDate, 'MMM'), // Format for display
      income: parseFloat(summaries[monthKey].income.toFixed(2)),
      expenses: parseFloat(summaries[monthKey].expenses.toFixed(2)),
    }));
};

export const mockMonthlyFinancialSummary = generateMonthlyFinancialSummary();