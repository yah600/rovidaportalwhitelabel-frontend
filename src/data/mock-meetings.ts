import { format, addDays, addHours } from 'date-fns';

export interface Meeting {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  attendees: string[];
  agenda: string[];
  minutes?: string;
}

export const mockMeetings: Meeting[] = [
  {
    id: 'MEET001',
    title: 'Quarterly Board Meeting Q1 2024',
    date: addDays(new Date(), 7),
    time: '10:00 AM',
    location: 'Conference Room A',
    status: 'Scheduled',
    attendees: ['John Doe', 'Jane Smith', 'Property Manager'],
    agenda: ['Review Q4 2023 Financials', 'Discuss upcoming maintenance projects', 'Vote on new policy'],
  },
  {
    id: 'MEET002',
    title: 'Emergency Session: Water Leak Incident',
    date: addDays(new Date(), -3),
    time: '02:00 PM',
    location: 'Online (Zoom)',
    status: 'Completed',
    attendees: ['John Doe', 'Property Manager', 'Maintenance Lead'],
    agenda: ['Review INC005', 'Discuss immediate actions', 'Allocate resources'],
    minutes: 'Minutes for emergency session on water leak incident are available.',
  },
  {
    id: 'MEET003',
    title: 'Annual General Meeting 2023',
    date: new Date('2023-12-15T18:00:00Z'),
    time: '06:00 PM',
    location: 'Community Hall',
    status: 'Completed',
    attendees: ['All Residents', 'Board Members'],
    agenda: ['Annual Report', 'Election of Board Members', 'Open Forum'],
    minutes: 'AGM 2023 minutes have been approved and published.',
  },
  {
    id: 'MEET004',
    title: 'Budget Planning Session 2025',
    date: addDays(new Date(), 30),
    time: '09:00 AM',
    location: 'Conference Room B',
    status: 'Scheduled',
    attendees: ['Board Members', 'Finance Committee'],
    agenda: ['Review 2024 budget performance', 'Propose 2025 budget', 'Discuss capital expenditures'],
  },
];