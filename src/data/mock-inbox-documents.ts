import { format, subDays } from 'date-fns';

export interface InboxDocument {
  id: string;
  title: string;
  sender: string;
  receivedAt: Date;
  status: 'New' | 'Reviewed' | 'Archived' | 'Action Required';
  type: 'PDF' | 'Email' | 'Scan' | 'Other';
  previewUrl: string; // URL to view the document
}

export const mockInboxDocuments: InboxDocument[] = [
  {
    id: 'INB001',
    title: 'Vendor Invoice - Cleaning Services',
    sender: 'Cleaning Co. Inc.',
    receivedAt: subDays(new Date(), 2),
    status: 'New',
    type: 'PDF',
    previewUrl: '/public/placeholder.svg',
  },
  {
    id: 'INB002',
    title: 'Resident Complaint - Unit 305 Noise',
    sender: 'Grace Black',
    receivedAt: subDays(new Date(), 1),
    status: 'Action Required',
    type: 'Email',
    previewUrl: '/public/placeholder.svg',
  },
  {
    id: 'INB003',
    title: 'HVAC Inspection Report',
    sender: 'HVAC Solutions Ltd.',
    receivedAt: subDays(new Date(), 5),
    status: 'Reviewed',
    type: 'PDF',
    previewUrl: '/public/placeholder.svg',
  },
  {
    id: 'INB004',
    title: 'New Lease Agreement - Unit 201',
    sender: 'Legal Department',
    receivedAt: subDays(new Date(), 3),
    status: 'New',
    type: 'Scan',
    previewUrl: '/public/placeholder.svg',
  },
  {
    id: 'INB005',
    title: 'Annual Fire Safety Certificate',
    sender: 'Fire Safety Inc.',
    receivedAt: subDays(new Date(), 7),
    status: 'Archived',
    type: 'PDF',
    previewUrl: '/public/placeholder.svg',
  },
];