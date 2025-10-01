import { format } from 'date-fns';

export interface ArchitecturalRequest {
  id: string;
  unit: string;
  requester: string;
  title: string;
  description: string;
  submittedAt: Date;
  status: 'Pending Review' | 'Approved' | 'Rejected' | 'In Progress';
  approvalDate?: Date;
  reviewer?: string;
}

export const mockArchitecturalRequests: ArchitecturalRequest[] = [
  {
    id: 'AR001',
    unit: 'Unit 101',
    requester: 'Alice Smith',
    title: 'Balcony Enclosure',
    description: 'Request to enclose the balcony with retractable glass panels.',
    submittedAt: new Date('2024-03-01T10:00:00Z'),
    status: 'Pending Review',
  },
  {
    id: 'AR002',
    unit: 'Unit 203',
    requester: 'Charlie Brown',
    title: 'Kitchen Renovation',
    description: 'Minor kitchen renovation including cabinet replacement and new countertop.',
    submittedAt: new Date('2024-02-15T14:30:00Z'),
    status: 'Approved',
    approvalDate: new Date('2024-02-28T11:00:00Z'),
    reviewer: 'Board Member',
  },
  {
    id: 'AR003',
    unit: 'Unit 305',
    requester: 'Grace Black',
    title: 'Window Replacement',
    description: 'Request to replace original windows with energy-efficient models.',
    submittedAt: new Date('2024-01-20T09:15:00Z'),
    status: 'Rejected',
    approvalDate: new Date('2024-02-10T16:00:00Z'),
    reviewer: 'Board Member',
  },
];