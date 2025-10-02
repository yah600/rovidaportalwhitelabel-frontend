export const mockAutomationRules = [
  {
    id: 'auto-1',
    name: 'Auto-apply Late Fees',
    trigger: 'Rent overdue by 5 days',
    action: 'Apply $50 late fee',
    status: 'Active',
  },
  {
    id: 'auto-2',
    name: 'Auto-close Completed Work Orders',
    trigger: 'Work order status set to Completed',
    action: 'Close work order after 24 hours',
    status: 'Active',
  },
];
