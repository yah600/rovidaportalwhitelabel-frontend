import { format, subHours, subDays } from 'date-fns';

export interface VisitorLog {
  id: string;
  visitorName: string;
  unitVisited: string;
  purpose: string;
  checkInTime: Date;
  checkOutTime?: Date;
  status: 'Checked In' | 'Checked Out' | 'Expected';
  hostName: string;
}

export const mockVisitorLogs: VisitorLog[] = [
  {
    id: 'VL001',
    visitorName: 'David Lee',
    unitVisited: 'Unit 101',
    purpose: 'Maintenance',
    checkInTime: subHours(new Date(), 2),
    checkOutTime: undefined,
    status: 'Checked In',
    hostName: 'Alice Smith',
  },
  {
    id: 'VL002',
    visitorName: 'Sarah Johnson',
    unitVisited: 'Unit 203',
    purpose: 'Social Visit',
    checkInTime: subDays(new Date(), 1),
    checkOutTime: subHours(subDays(new Date(), 1), 4),
    status: 'Checked Out',
    hostName: 'Charlie Brown',
  },
  {
    id: 'VL003',
    visitorName: 'Michael Green',
    unitVisited: 'Unit 305',
    purpose: 'Delivery',
    checkInTime: subHours(new Date(), 0.5),
    checkOutTime: undefined,
    status: 'Checked In',
    hostName: 'Grace Black',
  },
  {
    id: 'VL004',
    visitorName: 'Emily White',
    unitVisited: 'Unit 101',
    purpose: 'Expected Guest',
    checkInTime: new Date(new Date().setHours(new Date().getHours() + 1)), // 1 hour from now
    checkOutTime: undefined,
    status: 'Expected',
    hostName: 'Alice Smith',
  },
];