import { format } from 'date-fns';

export interface AuditLog {
  id: string;
  timestamp: Date;
  user: string;
  action: string;
  details: string;
  ipAddress: string;
}

export const mockAuditLogs: AuditLog[] = [
  {
    id: 'AUDIT001',
    timestamp: new Date('2024-03-28T10:35:00Z'),
    user: 'John Doe',
    action: 'Logged in',
    details: 'User successfully logged in to the system.',
    ipAddress: '192.168.1.100',
  },
  {
    id: 'AUDIT002',
    timestamp: new Date('2024-03-28T10:40:00Z'),
    user: 'John Doe',
    action: 'Updated Building A details',
    details: 'Changed address of Building A from "123 Main St" to "125 Main St".',
    ipAddress: '192.168.1.100',
  },
  {
    id: 'AUDIT003',
    timestamp: new Date('2024-03-27T15:05:00Z'),
    user: 'Jane Smith',
    action: 'Submitted new issue',
    details: 'Reported "Leaky faucet in Unit 101".',
    ipAddress: '10.0.0.50',
  },
  {
    id: 'AUDIT004',
    timestamp: new Date('2024-03-28T09:10:00Z'),
    user: 'Bob Johnson',
    action: 'Updated Work Order WO001 status',
    details: 'Changed status of Work Order WO001 from "Open" to "In Progress".',
    ipAddress: '172.16.0.20',
  },
  {
    id: 'AUDIT005',
    timestamp: new Date('2024-03-26T08:00:00Z'),
    user: 'System',
    action: 'Automated backup',
    details: 'Daily database backup completed successfully.',
    ipAddress: 'N/A',
  },
];