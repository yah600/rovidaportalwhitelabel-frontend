import { format, addDays } from 'date-fns';

export interface Vote {
  id: string;
  title: string;
  description: string;
  status: 'Open' | 'Closed' | 'Pending';
  dueDate: Date;
  createdAt: Date;
  results?: {
    yes: number;
    no: number;
    abstain: number;
  };
}

export const mockVotes: Vote[] = [
  {
    id: 'VOTE001',
    title: 'Approval of Q1 2024 Financial Report',
    description: 'Vote to approve the financial report for the first quarter of 2024.',
    status: 'Open',
    dueDate: addDays(new Date(), 5),
    createdAt: new Date('2024-03-20T10:00:00Z'),
  },
  {
    id: 'VOTE002',
    title: 'Renovation of Main Lobby',
    description: 'Vote on the proposed renovation plan for the main lobby area, including design and budget.',
    status: 'Closed',
    dueDate: new Date('2024-02-15T17:00:00Z'),
    createdAt: new Date('2024-02-01T09:00:00Z'),
    results: { yes: 15, no: 3, abstain: 2 },
  },
  {
    id: 'VOTE003',
    title: 'New Pet Policy Implementation',
    description: 'Vote on the implementation of a new building-wide pet policy.',
    status: 'Pending',
    dueDate: addDays(new Date(), 14),
    createdAt: new Date('2024-03-25T11:00:00Z'),
  },
];