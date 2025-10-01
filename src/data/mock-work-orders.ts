import { format } from 'date-fns';

export interface WorkOrder {
  id: string;
  title: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Completed' | 'Cancelled' | 'Pending Parts';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  unit: string;
  assignedTo: string;
  createdAt: Date;
  dueDate: Date;
  completedAt?: Date;
}

export const mockWorkOrders: WorkOrder[] = [
  {
    id: 'WO001',
    title: 'Repair leaky faucet in Unit 101',
    description: 'Kitchen faucet has a persistent drip. Needs washer replacement.',
    status: 'In Progress',
    priority: 'Medium',
    unit: 'Unit 101',
    assignedTo: 'Bob Johnson',
    createdAt: new Date('2023-10-20T10:00:00Z'),
    dueDate: new Date('2023-10-27T17:00:00Z'),
  },
  {
    id: 'WO002',
    title: 'Inspect HVAC in Unit 203',
    description: 'HVAC unit blowing warm air. Check refrigerant and compressor.',
    status: 'Pending Parts',
    priority: 'High',
    unit: 'Unit 203',
    assignedTo: 'David Lee',
    createdAt: new Date('2023-10-18T14:30:00Z'),
    dueDate: new Date('2023-10-28T17:00:00Z'),
  },
  {
    id: 'WO003',
    title: 'Replace common hallway light fixture',
    description: 'Light fixture on 3rd floor flickering. Replace with new LED fixture.',
    status: 'Completed',
    priority: 'Low',
    unit: 'Common Area',
    assignedTo: 'Frank White',
    createdAt: new Date('2023-10-15T09:15:00Z'),
    dueDate: new Date('2023-10-16T17:00:00Z'),
    completedAt: new Date('2023-10-16T10:45:00Z'),
  },
  {
    id: 'WO004',
    title: 'Emergency water leak in Unit 102',
    description: 'Water dripping from ceiling in living room. Investigate source from Unit 202.',
    status: 'Open',
    priority: 'Urgent',
    unit: 'Unit 102',
    assignedTo: 'Bob Johnson',
    createdAt: new Date('2023-10-25T08:45:00Z'),
    dueDate: new Date('2023-10-25T12:00:00Z'),
  },
  {
    id: 'WO005',
    title: 'Annual fire alarm inspection',
    description: 'Perform annual inspection of all fire alarm systems in Building A.',
    status: 'Open',
    priority: 'Medium',
    unit: 'Building A',
    assignedTo: 'External Contractor',
    createdAt: new Date('2023-09-01T09:00:00Z'),
    dueDate: new Date('2023-11-15T17:00:00Z'),
  },
];