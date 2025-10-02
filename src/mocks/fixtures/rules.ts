export const mockRules = [
  {
    id: 'rule-1',
    title: 'Noise Ordinance',
    description: 'No loud noises between 10 PM and 7 AM.',
    building: 'Building A',
  },
  {
    id: 'rule-2',
    title: 'Pet Policy',
    description: 'All pets must be on a leash in common areas.',
    building: 'Building A',
  },
];

export const mockViolationTickets = [
  {
    id: 'violation-1',
    ruleId: 'rule-1',
    unit: '101',
    date: '2023-10-01',
    description: 'Loud music after 10 PM',
    status: 'Open',
    fine: 50,
  },
  {
    id: 'violation-2',
    ruleId: 'rule-2',
    unit: '203',
    date: '2023-09-28',
    description: 'Dog off leash in lobby',
    status: 'Closed',
    fine: 25,
  },
];
