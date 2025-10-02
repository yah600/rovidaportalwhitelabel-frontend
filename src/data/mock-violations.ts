export interface ViolationTicket {
  id: string;
  ruleId: string;
  ruleTitle: string;
  unitNumber: string;
  residentName: string;
  description: string;
  issuedAt: Date;
  status: 'Open' | 'Closed' | 'Appealed';
  fineAmount?: number;
  dueDate?: Date;
}

export const mockViolationTickets: ViolationTicket[] = [
  {
    id: 'VT001',
    ruleId: 'RULE001',
    ruleTitle: 'Quiet Hours Policy',
    unitNumber: 'Unit 305',
    residentName: 'Grace Black',
    description: 'Loud music reported after 10 PM on multiple occasions.',
    issuedAt: new Date('2024-03-20T11:00:00Z'),
    status: 'Open',
    fineAmount: 100.00,
    dueDate: new Date('2024-04-05T17:00:00Z'),
  },
  {
    id: 'VT002',
    ruleId: 'RULE002',
    ruleTitle: 'Pet Policy',
    unitNumber: 'Unit 101',
    residentName: 'Alice Smith',
    description: 'Unleashed dog in common area.',
    issuedAt: new Date('2024-03-15T09:30:00Z'),
    status: 'Closed',
    fineAmount: 50.00,
    dueDate: new Date('2024-03-22T17:00:00Z'),
  },
  {
    id: 'VT003',
    ruleId: 'RULE003',
    ruleTitle: 'Parking Regulations',
    unitNumber: 'Unit 203',
    residentName: 'Charlie Brown',
    description: 'Vehicle parked in a reserved spot without a permit.',
    issuedAt: new Date('2024-03-25T14:00:00Z'),
    status: 'Appealed',
    fineAmount: 75.00,
    dueDate: new Date('2024-04-10T17:00:00Z'),
  },
];