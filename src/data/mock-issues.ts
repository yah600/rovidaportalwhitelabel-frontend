import { format } from 'date-fns';

export interface Issue {
  id: string;
  title: string;
  status: 'Open' | 'In Progress' | 'Closed' | 'Pending';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  unit: string;
  type: string;
  createdAt: Date;
}

export const mockIssues: Issue[] = [
  {
    id: 'INC001',
    title: 'Leaky faucet in Unit 101',
    status: 'Open',
    priority: 'Medium',
    unit: 'Unit 101',
    type: 'Plumbing',
    createdAt: new Date('2023-10-20T10:00:00Z'),
  },
  {
    id: 'INC002',
    title: 'HVAC not cooling in Unit 203',
    status: 'In Progress',
    priority: 'High',
    unit: 'Unit 203',
    type: 'HVAC',
    createdAt: new Date('2023-10-18T14:30:00Z'),
  },
  {
    id: 'INC003',
    title: 'Broken light fixture in common hallway',
    status: 'Closed',
    priority: 'Low',
    unit: 'Common Area',
    type: 'Electrical',
    createdAt: new Date('2023-10-15T09:15:00Z'),
  },
  {
    id: 'INC004',
    title: 'Noise complaint from Unit 305',
    status: 'Pending',
    priority: 'Medium',
    unit: 'Unit 305',
    type: 'Other',
    createdAt: new Date('2023-10-22T11:00:00Z'),
  },
  {
    id: 'INC005',
    title: 'Water damage in Unit 102 ceiling',
    status: 'Open',
    priority: 'Critical',
    unit: 'Unit 102',
    type: 'Plumbing',
    createdAt: new Date('2023-10-25T08:45:00Z'),
  },
];