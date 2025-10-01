import { format } from 'date-fns';

export interface Issue {
  id: string;
  title: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Closed' | 'Pending';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  unit: string;
  type: string;
  reporter: string;
  assignee?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  timeline: IssueTimelineEvent[];
  attachments: IssueAttachment[];
  participants: IssueParticipant[];
}

export interface IssueTimelineEvent {
  id: string;
  type: 'comment' | 'status_change' | 'assignment' | 'attachment_added';
  timestamp: Date;
  user: string;
  details: string;
}

export interface IssueAttachment {
  id: string;
  name: string;
  url: string;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface IssueParticipant {
  id: string;
  name: string;
  role: string;
}

export const mockIssues: Issue[] = [
  {
    id: 'INC001',
    title: 'Leaky faucet in Unit 101',
    description: 'The kitchen faucet in Unit 101 has a persistent drip, causing water waste and a constant noise. Needs immediate attention.',
    status: 'Open',
    priority: 'Medium',
    unit: 'Unit 101',
    type: 'Plumbing',
    reporter: 'Alice Smith',
    assignee: 'Bob Johnson',
    createdAt: new Date('2023-10-20T10:00:00Z'),
    updatedAt: new Date('2023-10-25T11:30:00Z'),
    timeline: [
      { id: 'T001', type: 'comment', timestamp: new Date('2023-10-20T10:05:00Z'), user: 'Alice Smith', details: 'Reported leaky faucet.' },
      { id: 'T002', type: 'assignment', timestamp: new Date('2023-10-20T11:00:00Z'), user: 'Property Manager', details: 'Assigned to Bob Johnson.' },
      { id: 'T003', type: 'comment', timestamp: new Date('2023-10-21T09:00:00Z'), user: 'Bob Johnson', details: 'Inspected faucet, needs new washer.' },
      { id: 'T004', type: 'status_change', timestamp: new Date('2023-10-21T09:05:00Z'), user: 'Bob Johnson', details: 'Status changed to In Progress.' },
    ],
    attachments: [
      { id: 'A001', name: 'faucet_leak_1.jpg', url: '/public/placeholder.svg', uploadedBy: 'Alice Smith', uploadedAt: new Date('2023-10-20T10:02:00Z') },
    ],
    participants: [
      { id: 'P001', name: 'Alice Smith', role: 'Resident' },
      { id: 'P002', name: 'Bob Johnson', role: 'Maintenance' },
      { id: 'P003', name: 'Property Manager', role: 'Management' },
    ],
  },
  {
    id: 'INC002',
    title: 'HVAC not cooling in Unit 203',
    description: 'The air conditioning unit in Unit 203 is blowing warm air. The thermostat is set correctly, but no cold air is coming out.',
    status: 'In Progress',
    priority: 'High',
    unit: 'Unit 203',
    type: 'HVAC',
    reporter: 'Charlie Brown',
    assignee: 'David Lee',
    createdAt: new Date('2023-10-18T14:30:00Z'),
    updatedAt: new Date('2023-10-24T16:00:00Z'),
    timeline: [
      { id: 'T005', type: 'comment', timestamp: new Date('2023-10-18T14:35:00Z'), user: 'Charlie Brown', details: 'Reported AC issue.' },
      { id: 'T006', type: 'assignment', timestamp: new Date('2023-10-18T15:00:00Z'), user: 'Property Manager', details: 'Assigned to David Lee.' },
      { id: 'T007', type: 'comment', timestamp: new Date('2023-10-19T10:00:00Z'), user: 'David Lee', details: 'Checked refrigerant levels, found low. Ordered parts.' },
      { id: 'T008', type: 'status_change', timestamp: new Date('2023-10-19T10:10:00Z'), user: 'David Lee', details: 'Status changed to In Progress.' },
    ],
    attachments: [],
    participants: [
      { id: 'P004', name: 'Charlie Brown', role: 'Resident' },
      { id: 'P005', name: 'David Lee', role: 'Maintenance' },
    ],
  },
  {
    id: 'INC003',
    title: 'Broken light fixture in common hallway',
    description: 'The light fixture on the 3rd floor common hallway is flickering and sometimes goes out completely. Needs replacement.',
    status: 'Closed',
    priority: 'Low',
    unit: 'Common Area',
    type: 'Electrical',
    reporter: 'Eve Green',
    assignee: 'Frank White',
    createdAt: new Date('2023-10-15T09:15:00Z'),
    updatedAt: new Date('2023-10-16T11:00:00Z'),
    resolvedAt: new Date('2023-10-16T10:45:00Z'),
    timeline: [
      { id: 'T009', type: 'comment', timestamp: new Date('2023-10-15T09:20:00Z'), user: 'Eve Green', details: 'Reported flickering light.' },
      { id: 'T010', type: 'assignment', timestamp: new Date('2023-10-15T10:00:00Z'), user: 'Property Manager', details: 'Assigned to Frank White.' },
      { id: 'T011', type: 'comment', timestamp: new Date('2023-10-16T09:30:00Z'), user: 'Frank White', details: 'Replaced fixture.' },
      { id: 'T012', type: 'status_change', timestamp: new Date('2023-10-16T10:45:00Z'), user: 'Frank White', details: 'Status changed to Closed.' },
    ],
    attachments: [],
    participants: [
      { id: 'P006', name: 'Eve Green', role: 'Resident' },
      { id: 'P007', name: 'Frank White', role: 'Maintenance' },
    ],
  },
  {
    id: 'INC004',
    title: 'Noise complaint from Unit 305',
    description: 'Loud music and parties frequently occurring late at night from Unit 305. Affecting sleep of neighboring units.',
    status: 'Pending',
    priority: 'Medium',
    unit: 'Unit 305',
    type: 'Other',
    reporter: 'Grace Black',
    createdAt: new Date('2023-10-22T11:00:00Z'),
    updatedAt: new Date('2023-10-22T11:00:00Z'),
    timeline: [
      { id: 'T013', type: 'comment', timestamp: new Date('2023-10-22T11:05:00Z'), user: 'Grace Black', details: 'Reported noise disturbance.' },
      { id: 'T014', type: 'status_change', timestamp: new Date('2023-10-22T11:10:00Z'), user: 'Property Manager', details: 'Status changed to Pending (awaiting investigation).' },
    ],
    attachments: [],
    participants: [
      { id: 'P008', name: 'Grace Black', role: 'Resident' },
    ],
  },
  {
    id: 'INC005',
    title: 'Water damage in Unit 102 ceiling',
    description: 'Significant water stain and dripping from the ceiling in the living room of Unit 102. Appears to be coming from Unit 202.',
    status: 'Open',
    priority: 'Critical',
    unit: 'Unit 102',
    type: 'Plumbing',
    reporter: 'Henry Blue',
    assignee: 'Bob Johnson',
    createdAt: new Date('2023-10-25T08:45:00Z'),
    updatedAt: new Date('2023-10-25T09:30:00Z'),
    timeline: [
      { id: 'T015', type: 'comment', timestamp: new Date('2023-10-25T08:50:00Z'), user: 'Henry Blue', details: 'Reported water damage.' },
      { id: 'T016', type: 'attachment_added', timestamp: new Date('2023-10-25T08:55:00Z'), user: 'Henry Blue', details: 'Added photo of ceiling damage.' },
      { id: 'T017', type: 'assignment', timestamp: new Date('2023-10-25T09:00:00Z'), user: 'Property Manager', details: 'Assigned to Bob Johnson.' },
    ],
    attachments: [
      { id: 'A002', name: 'ceiling_damage_1.jpg', url: '/public/placeholder.svg', uploadedBy: 'Henry Blue', uploadedAt: new Date('2023-10-25T08:55:00Z') },
    ],
    participants: [
      { id: 'P009', name: 'Henry Blue', role: 'Resident' },
      { id: 'P002', name: 'Bob Johnson', role: 'Maintenance' },
    ],
  },
];