import { format } from 'date-fns';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Completed' | 'Blocked';
  priority: 'Low' | 'Medium' | 'High';
  assignedTo: string;
  dueDate: Date;
  createdAt: Date;
}

export const mockTasks: Task[] = [
  {
    id: 'TASK001',
    title: 'Check smoke detectors in all units',
    description: 'Perform annual check of smoke detectors and replace batteries if needed.',
    status: 'To Do',
    priority: 'High',
    assignedTo: 'Maintenance Team',
    dueDate: new Date('2024-03-31T17:00:00Z'),
    createdAt: new Date('2024-03-01T09:00:00Z'),
  },
  {
    id: 'TASK002',
    title: 'Clean common area windows',
    description: 'Schedule external cleaning service for all common area windows.',
    status: 'In Progress',
    priority: 'Medium',
    assignedTo: 'Property Manager',
    dueDate: new Date('2024-04-15T17:00:00Z'),
    createdAt: new Date('2024-03-10T10:00:00Z'),
  },
  {
    id: 'TASK003',
    title: 'Repair gym equipment',
    description: 'Fix the broken treadmill in the gym. Contact technician.',
    status: 'Blocked',
    priority: 'High',
    assignedTo: 'David Lee',
    dueDate: new Date('2024-03-25T17:00:00Z'),
    createdAt: new Date('2024-03-05T14:00:00Z'),
  },
  {
    id: 'TASK004',
    title: 'Update emergency contact list',
    description: 'Review and update the building\'s emergency contact list.',
    status: 'Completed',
    priority: 'Low',
    assignedTo: 'Admin Staff',
    dueDate: new Date('2024-02-28T17:00:00Z'),
    createdAt: new Date('2024-02-10T11:00:00Z'),
  },
];