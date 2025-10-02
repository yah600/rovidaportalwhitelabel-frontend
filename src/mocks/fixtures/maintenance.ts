export const mockAssets = [
  {
    id: 'asset-1',
    name: 'HVAC Unit - Rooftop',
    type: 'HVAC',
    location: 'Rooftop',
    purchaseDate: '2020-01-15',
    warrantyEndDate: '2025-01-14',
  },
  {
    id: 'asset-2',
    name: 'Elevator 1',
    type: 'Elevator',
    location: 'Lobby',
    purchaseDate: '2018-05-20',
    warrantyEndDate: '2028-05-19',
  },
];

export const mockWorkOrders = [
  {
    id: 'wo-1',
    assetId: 'asset-1',
    description: 'Quarterly maintenance for HVAC unit',
    status: 'Scheduled',
    priority: 'Medium',
    dueDate: '2023-11-01',
  },
  {
    id: 'wo-2',
    assetId: 'asset-2',
    description: 'Annual elevator inspection',
    status: 'Completed',
    priority: 'High',
    dueDate: '2023-09-30',
  },
];

export const mockTasks = [
  {
    id: 'task-1',
    workOrderId: 'wo-1',
    description: 'Replace air filter',
    status: 'To Do',
  },
  {
    id: 'task-2',
    workOrderId: 'wo-1',
    description: 'Check refrigerant levels',
    status: 'In Progress',
  },
];
