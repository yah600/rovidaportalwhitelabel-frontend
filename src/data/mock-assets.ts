import { format } from 'date-fns';

export interface Asset {
  id: string;
  name: string;
  type: string;
  location: string;
  status: 'Operational' | 'Under Maintenance' | 'Retired';
  lastMaintenance: Date;
  nextMaintenance: Date;
}

export const mockAssets: Asset[] = [
  {
    id: 'AST001',
    name: 'HVAC Unit - Building A, Roof',
    type: 'HVAC System',
    location: 'Building A, Roof',
    status: 'Operational',
    lastMaintenance: new Date('2023-09-15T09:00:00Z'),
    nextMaintenance: new Date('2024-03-15T09:00:00Z'),
  },
  {
    id: 'AST002',
    name: 'Elevator - East Tower',
    type: 'Elevator',
    location: 'East Tower',
    status: 'Operational',
    lastMaintenance: new Date('2023-10-01T11:00:00Z'),
    nextMaintenance: new Date('2024-04-01T11:00:00Z'),
  },
  {
    id: 'AST003',
    name: 'Boiler System - Basement',
    type: 'Heating System',
    location: 'Building A, Basement',
    status: 'Under Maintenance',
    lastMaintenance: new Date('2023-08-01T08:00:00Z'),
    nextMaintenance: new Date('2023-11-30T08:00:00Z'),
  },
  {
    id: 'AST004',
    name: 'Fire Alarm Panel - Main Lobby',
    type: 'Safety System',
    location: 'Main Lobby',
    status: 'Operational',
    lastMaintenance: new Date('2024-01-10T13:00:00Z'),
    nextMaintenance: new Date('2025-01-10T13:00:00Z'),
  },
];