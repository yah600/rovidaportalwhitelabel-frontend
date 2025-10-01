import { format } from 'date-fns';

export interface Integration {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: 'Active' | 'Inactive' | 'Pending Setup';
  type: 'Communication' | 'Financial' | 'Maintenance' | 'Smart Home';
  connectedAt?: Date;
}

export const mockIntegrations: Integration[] = [
  {
    id: 'INT001',
    name: 'Stripe Payments',
    slug: 'stripe',
    description: 'Integrate with Stripe for secure online payment processing for bills and fees.',
    status: 'Active',
    type: 'Financial',
    connectedAt: new Date('2023-08-01T10:00:00Z'),
  },
  {
    id: 'INT002',
    name: 'Twilio SMS Notifications',
    slug: 'twilio',
    description: 'Send automated SMS notifications for emergencies, maintenance updates, and announcements.',
    status: 'Pending Setup',
    type: 'Communication',
  },
  {
    id: 'INT003',
    name: 'Google Calendar Sync',
    slug: 'google-calendar',
    description: 'Synchronize maintenance schedules and board meetings with Google Calendar.',
    status: 'Active',
    type: 'Maintenance',
    connectedAt: new Date('2023-09-10T14:30:00Z'),
  },
  {
    id: 'INT004',
    name: 'Smart Thermostat Control',
    slug: 'smart-thermostat',
    description: 'Manage common area thermostats remotely and optimize energy consumption.',
    status: 'Inactive',
    type: 'Smart Home',
  },
  {
    id: 'INT005',
    name: 'Mailchimp Email Marketing',
    slug: 'mailchimp',
    description: 'Send newsletters and marketing communications to residents.',
    status: 'Pending Setup',
    type: 'Communication',
  },
];