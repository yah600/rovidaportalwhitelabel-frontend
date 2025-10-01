export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  lastLogin: Date;
}

export const mockUsers: User[] = [
  {
    id: 'USR001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Property Manager',
    status: 'Active',
    lastLogin: new Date('2024-03-28T10:30:00Z'),
  },
  {
    id: 'USR002',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Resident',
    status: 'Active',
    lastLogin: new Date('2024-03-27T15:00:00Z'),
  },
  {
    id: 'USR003',
    name: 'Bob Johnson',
    email: 'bob.j@example.com',
    role: 'Maintenance Staff',
    status: 'Active',
    lastLogin: new Date('2024-03-28T09:00:00Z'),
  },
  {
    id: 'USR004',
    name: 'Charlie Brown',
    email: 'charlie.b@example.com',
    role: 'Resident',
    status: 'Inactive',
    lastLogin: new Date('2024-03-10T11:00:00Z'),
  },
  {
    id: 'USR005',
    name: 'David Lee',
    email: 'david.l@example.com',
    role: 'Maintenance Staff',
    status: 'Pending',
    lastLogin: new Date('2024-03-20T14:00:00Z'),
  },
];