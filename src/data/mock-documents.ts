import { format, addDays, subMonths } from 'date-fns';

export interface Document {
  id: string;
  title: string;
  type: 'PDF' | 'Word' | 'Excel' | 'Image' | 'Other';
  category: string;
  uploadedBy: string;
  uploadedAt: Date;
  url: string;
}

export const mockDocuments: Document[] = [
  {
    id: 'DOC001',
    title: 'Annual Budget 2024',
    type: 'PDF',
    category: 'Financial',
    uploadedBy: 'Property Manager',
    uploadedAt: new Date('2024-01-15T10:00:00Z'),
    url: '/public/placeholder.svg', // Placeholder URL
  },
  {
    id: 'DOC002',
    title: 'Building A Renovation Plan',
    type: 'PDF',
    category: 'Maintenance',
    uploadedBy: 'Architectural Firm',
    uploadedAt: new Date('2024-02-20T14:30:00Z'),
    url: '/public/placeholder.svg', // Placeholder URL
  },
  {
    id: 'DOC003',
    title: 'Emergency Contact List',
    type: 'Excel',
    category: 'Safety',
    uploadedBy: 'Admin Staff',
    uploadedAt: new Date('2024-03-01T09:00:00Z'),
    url: '/public/placeholder.svg', // Placeholder URL
  },
  {
    id: 'DOC004',
    title: 'Resident Handbook V2',
    type: 'Word',
    category: 'General',
    uploadedBy: 'Property Manager',
    uploadedAt: new Date('2024-03-10T11:00:00Z'),
    url: '/public/placeholder.svg', // Placeholder URL
  },
  {
    id: 'DOC005',
    title: 'Fire Safety Inspection Report',
    type: 'PDF',
    category: 'Safety',
    uploadedBy: 'Fire Inspector',
    uploadedAt: new Date('2024-03-25T16:00:00Z'),
    url: '/public/placeholder.svg', // Placeholder URL
  },
];