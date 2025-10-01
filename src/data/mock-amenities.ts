import { format } from 'date-fns';

export interface Amenity {
  id: string;
  name: string;
  location: string;
  type: 'Gym' | 'Pool' | 'Party Room' | 'Meeting Room' | 'Rooftop Terrace';
  bookingRequired: boolean;
  capacity?: number;
  hourlyRate?: number;
  status: 'Available' | 'Under Maintenance' | 'Closed';
}

export const mockAmenities: Amenity[] = [
  {
    id: 'AMN001',
    name: 'Fitness Center',
    location: 'Basement, Building A',
    type: 'Gym',
    bookingRequired: false,
    capacity: 20,
    status: 'Available',
  },
  {
    id: 'AMN002',
    name: 'Rooftop Terrace',
    location: 'Roof, Building A',
    type: 'Rooftop Terrace',
    bookingRequired: true,
    capacity: 50,
    hourlyRate: 50.00,
    status: 'Available',
  },
  {
    id: 'AMN003',
    name: 'Community Pool',
    location: 'Ground Floor, Building B',
    type: 'Pool',
    bookingRequired: false,
    capacity: 30,
    status: 'Under Maintenance',
  },
  {
    id: 'AMN004',
    name: 'Meeting Room 1',
    location: '2nd Floor, Building A',
    type: 'Meeting Room',
    bookingRequired: true,
    capacity: 10,
    hourlyRate: 25.00,
    status: 'Available',
  },
];