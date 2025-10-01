import { format } from 'date-fns';

export interface Rule {
  id: string;
  title: string;
  description: string;
  category: 'General' | 'Noise' | 'Pets' | 'Parking' | 'Amenities' | 'Safety';
  effectiveDate: Date;
  lastRevised: Date;
  enforcementLevel: 'Warning' | 'Fine' | 'Eviction';
}

export const mockRules: Rule[] = [
  {
    id: 'RULE001',
    title: 'Quiet Hours Policy',
    description: 'Residents must observe quiet hours between 10 PM and 8 AM on weekdays, and 11 PM and 9 AM on weekends.',
    category: 'Noise',
    effectiveDate: new Date('2023-01-01'),
    lastRevised: new Date('2023-01-01'),
    enforcementLevel: 'Fine',
  },
  {
    id: 'RULE002',
    title: 'Pet Policy',
    description: 'All pets must be registered with management. Dogs must be leashed in common areas. Breed restrictions apply.',
    category: 'Pets',
    effectiveDate: new Date('2023-03-15'),
    lastRevised: new Date('2023-03-15'),
    enforcementLevel: 'Fine',
  },
  {
    id: 'RULE003',
    title: 'Parking Regulations',
    description: 'Assigned parking spots only. Guest parking requires a permit from management. No overnight street parking.',
    category: 'Parking',
    effectiveDate: new Date('2023-02-01'),
    lastRevised: new Date('2023-02-01'),
    enforcementLevel: 'Warning',
  },
  {
    id: 'RULE004',
    title: 'Garbage Disposal Guidelines',
    description: 'All trash must be bagged and placed in designated bins. Recycling guidelines must be followed.',
    category: 'General',
    effectiveDate: new Date('2023-04-10'),
    lastRevised: new Date('2023-04-10'),
    enforcementLevel: 'Warning',
  },
];