import { format, subMonths, subDays } from 'date-fns';

export interface MonthlyIssuesData {
  month: string;
  open: number;
  closed: number;
}

export const mockMonthlyIssues: MonthlyIssuesData[] = [
  { month: 'Jan', open: 10, closed: 8 },
  { month: 'Feb', open: 12, closed: 10 },
  { month: 'Mar', open: 8, closed: 12 },
  { month: 'Apr', open: 15, closed: 11 },
  { month: 'May', open: 11, closed: 13 },
  { month: 'Jun', open: 14, closed: 10 },
];

export interface IssueTypeDistribution {
  name: string;
  value: number;
}

export const mockIssueTypeDistribution: IssueTypeDistribution[] = [
  { name: 'Plumbing', value: 400 },
  { name: 'Electrical', value: 300 },
  { name: 'HVAC', value: 200 },
  { name: 'Other', value: 100 },
];

export interface WorkOrderCompletionRate {
  name: string;
  completed: number;
  pending: number;
}

export const mockWorkOrderCompletion: WorkOrderCompletionRate[] = [
  { name: 'Jan', completed: 25, pending: 5 },
  { name: 'Feb', completed: 30, pending: 7 },
  { name: 'Mar', completed: 28, pending: 4 },
  { name: 'Apr', completed: 35, pending: 6 },
  { name: 'May', completed: 32, pending: 3 },
  { name: 'Jun', completed: 38, pending: 8 },
];