"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the structure for a user's roles and scope
export interface UserRole {
  name: string; // e.g., 'Client Super-Administrator', 'Condo Administrator', 'Owner'
  scope: {
    orgId?: string;
    buildingIds?: string[];
    unitIds?: string[];
    vendorId?: string;
    isSuper?: boolean; // For Platform Owner
  };
}

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
  // Add any other user-specific data needed for authorization
}

// Mock user data for demonstration purposes
// Each user has a unique email and password for testing different roles
export const MOCK_USERS: { email: string; password: string; user: CurrentUser }[] = [
  {
    email: 'platform.owner@example.com',
    password: 'password',
    user: {
      id: 'usr-po-001',
      name: 'Platform Owner',
      email: 'platform.owner@example.com',
      roles: [{ name: 'Platform Owner', scope: { isSuper: true } }],
    },
  },
  {
    email: 'client.super@example.com',
    password: 'password',
    user: {
      id: 'usr-csa-001',
      name: 'Client Super-Admin',
      email: 'client.super@example.com',
      roles: [{ name: 'Client Super-Administrator', scope: { orgId: 'org-rovida-001' } }],
    },
  },
  {
    email: 'condo.admin@example.com',
    password: 'password',
    user: {
      id: 'usr-ca-001',
      name: 'Condo Admin',
      email: 'condo.admin@example.com',
      roles: [{ name: 'Condo Administrator', scope: { orgId: 'org-rovida-001', buildingIds: ['BLD001', 'BLD002'] } }],
    },
  },
  {
    email: 'property.manager@example.com',
    password: 'password',
    user: {
      id: 'usr-pm-001',
      name: 'Property Manager',
      email: 'property.manager@example.com',
      roles: [{ name: 'Property Manager', scope: { orgId: 'org-rovida-001', buildingIds: ['BLD001'] } }],
    },
  },
  {
    email: 'accountant@example.com',
    password: 'password',
    user: {
      id: 'usr-acc-001',
      name: 'Accountant',
      email: 'accountant@example.com',
      roles: [{ name: 'Accountant', scope: { orgId: 'org-rovida-001' } }],
    },
  },
  {
    email: 'board.member@example.com',
    password: 'password',
    user: {
      id: 'usr-bm-001',
      name: 'Board Member',
      email: 'board.member@example.com',
      roles: [{ name: 'Board Member', scope: { orgId: 'org-rovida-001' } }],
    },
  },
  {
    email: 'owner@example.com',
    password: 'password',
    user: {
      id: 'usr-own-001',
      name: 'Owner',
      email: 'owner@example.com',
      roles: [{ name: 'Owner', scope: { orgId: 'org-rovida-001', unitIds: ['UNIT001'] } }],
    },
  },
  {
    email: 'tenant@example.com',
    password: 'password',
    user: {
      id: 'usr-ten-001',
      name: 'Tenant',
      email: 'tenant@example.com',
      roles: [{ name: 'Tenant', scope: { orgId: 'org-rovida-001', unitIds: ['UNIT002'] } }],
    },
  },
  {
    email: 'vendor@example.com',
    password: 'password',
    user: {
      id: 'usr-ven-001',
      name: 'Vendor',
      email: 'vendor@example.com',
      roles: [{ name: 'Vendor / Service Provider', scope: { orgId: 'org-rovida-001', vendorId: 'VND001' } }],
    },
  },
  {
    email: 'emergency.agent@example.com',
    password: 'password',
    user: {
      id: 'usr-ea-001',
      name: 'Emergency Agent',
      email: 'emergency.agent@example.com',
      roles: [{ name: 'Emergency Agent', scope: { orgId: 'org-rovida-001', buildingIds: ['BLD001'] } }],
    },
  },
  {
    email: 'concierge@example.com',
    password: 'password',
    user: {
      id: 'usr-con-001',
      name: 'Concierge',
      email: 'concierge@example.com',
      roles: [{ name: 'Concierge / Front Desk / Security', scope: { orgId: 'org-rovida-001', buildingIds: ['BLD001'] } }],
    },
  },
  {
    email: 'technician@example.com',
    password: 'password',
    user: {
      id: 'usr-tech-001',
      name: 'Technician',
      email: 'technician@example.com',
      roles: [{ name: 'Building Maintenance Technician', scope: { orgId: 'org-rovida-001', buildingIds: ['BLD001'] } }],
    },
  },
  {
    email: 'auditor@example.com',
    password: 'password',
    user: {
      id: 'usr-aud-001',
      name: 'Auditor',
      email: 'auditor@example.com',
      roles: [{ name: 'Read-Only Auditor', scope: { orgId: 'org-rovida-001' } }],
    },
  },
];

interface UserContextType {
  currentUser: CurrentUser | null;
  setCurrentUser: (user: CurrentUser | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null); // Initial state is null

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};