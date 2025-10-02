export interface AutomationTemplate {
  id: string;
  title: string;
  description: string;
  icon?: string; // Optional icon name or path
}

export const mockAutomationTemplates: AutomationTemplate[] = [
  {
    id: 'AUTO001',
    title: 'Automate New Issue Notifications',
    description: 'Automatically send an email to the assigned maintenance staff when a new critical issue is reported.',
    icon: 'BellRing', // Placeholder for an icon
  },
  {
    id: 'AUTO002',
    title: 'Monthly Rent Reminder',
    description: 'Send an automated SMS reminder to tenants 5 days before their rent is due.',
    icon: 'CalendarClock',
  },
  {
    id: 'AUTO003',
    title: 'Archive Old Documents',
    description: 'Move documents older than 1 year from the active registry to the archive.',
    icon: 'Archive',
  },
];