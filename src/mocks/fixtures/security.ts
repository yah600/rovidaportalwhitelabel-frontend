export const mockVisitorLogs = [
  {
    id: 'vlog-1',
    visitorName: 'Alice Smith',
    unitVisited: '101',
    checkInTime: '2023-10-01T09:00:00Z',
    checkOutTime: '2023-10-01T10:30:00Z',
    status: 'Checked Out',
  },
  {
    id: 'vlog-2',
    visitorName: 'Bob Johnson',
    unitVisited: '203',
    checkInTime: '2023-10-02T14:00:00Z',
    checkOutTime: null,
    status: 'Checked In',
  },
];

export const mockSuspiciousActivities = [
  {
    id: 'sa-1',
    type: 'Unauthorized Access Attempt',
    timestamp: '2023-09-29T03:15:00Z',
    location: 'Main Entrance',
    details: 'Attempted access with invalid keycard.',
  },
];
