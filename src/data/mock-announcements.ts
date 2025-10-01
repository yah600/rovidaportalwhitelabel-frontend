import { format, addDays, subDays } from 'date-fns';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedAt: Date;
  expiresAt?: Date;
  targetAudience: 'All Residents' | 'Unit Owners' | 'Tenants' | 'Board Members';
  status: 'Published' | 'Draft' | 'Archived';
}

export const mockAnnouncements: Announcement[] = [
  {
    id: 'ANN001',
    title: 'Upcoming Fire Alarm Test',
    content: 'Please be advised that a routine fire alarm test will be conducted on April 15th, 2024, between 10:00 AM and 12:00 PM. Expect intermittent alarms during this period. No action is required from residents.',
    author: 'Property Management',
    publishedAt: subDays(new Date(), 5),
    expiresAt: addDays(new Date(), 10),
    targetAudience: 'All Residents',
    status: 'Published',
  },
  {
    id: 'ANN002',
    title: 'Gym Renovation Project',
    content: 'The building gym will undergo renovations from May 1st to May 15th. During this period, the gym will be closed. We apologize for any inconvenience.',
    author: 'Property Management',
    publishedAt: subDays(new Date(), 10),
    expiresAt: addDays(new Date(), 30),
    targetAudience: 'All Residents',
    status: 'Published',
  },
  {
    id: 'ANN003',
    title: 'Board Meeting Minutes Available',
    content: 'The minutes from the last Board Meeting (March 2024) are now available in the Documents section under "Board Meetings".',
    author: 'Board Secretary',
    publishedAt: subDays(new Date(), 2),
    targetAudience: 'Board Members',
    status: 'Published',
  },
  {
    id: 'ANN004',
    title: 'New Security Camera Installation',
    content: 'We are planning to install new security cameras in the common areas to enhance safety. Further details will be shared soon.',
    author: 'Security Committee',
    publishedAt: new Date(),
    targetAudience: 'All Residents',
    status: 'Draft',
  },
];