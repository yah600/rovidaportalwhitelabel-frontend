export const mockAnnouncements = [
  {
    id: 'announcement-1',
    title: 'Building Maintenance Scheduled',
    date: '2023-10-01',
    author: 'Building Management',
    content: 'Dear residents, please be advised that building maintenance will be conducted on October 15th.',
    scope: ['TENANT', 'OWNER'],
  },
  {
    id: 'announcement-2',
    title: 'Annual General Meeting Reminder',
    date: '2023-09-28',
    author: 'Board',
    content: 'A friendly reminder about the upcoming Annual General Meeting on October 10th.',
    scope: ['BOARD', 'OWNER'],
  },
];

export const mockTemplates = [
  {
    id: 'template-1',
    name: 'Maintenance Notification',
    subject: 'Building Maintenance',
    body: `Dear {{recipient}},

Please be advised that building maintenance will be conducted on {{date}}.`,
  },
  {
    id: 'template-2',
    name: 'Meeting Reminder',
    subject: 'Meeting Reminder',
    body: `Dear {{recipient}},

This is a reminder about the upcoming meeting on {{date}}.`,
  },
];
