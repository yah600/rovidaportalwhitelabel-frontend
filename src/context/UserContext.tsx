"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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
  onboarded: boolean; // Added onboarded status
  phoneNumber?: string;
  notificationPreferences?: {
    emailIssues: boolean;
    emailAnnouncements: boolean;
    emailBilling: boolean;
    smsEmergency: boolean;
    smsMaintenance: boolean;
  };
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
      onboarded: false,
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
      onboarded: false,
    },
  },
  {
    email: 'condo.admin@example.com',
    password: 'password',
    user: {
      id: 'usr-ca-001',
      name: 'Condo Admin',
      email: 'condo.admin@example.com',
      roles: [{ name: 'Condo Administrator', scope: { orgId: 'org-rovida-001', buildingIds: ['BLD001', 'BLD002', 'BLD003'] } }],
      onboarded: false,
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
      onboarded: false,
    },
  },
  {
    email: 'accountant@example.com',
    password: 'password',
    user: {
      id: 'usr-acc-001',
      name: 'Accountant',
      email: 'accountant@example.com',
      roles: [{ name: 'Accountant', scope: { orgId: 'org-rovida-001' } }], // No building scope for accountant
      onboarded: false,
    },
  },
  {
    email: 'board.member@example.com',
    password: 'password',
    user: {
      id: 'usr-bm-001',
      name: 'Board Member',
      email: 'board.member@example.com',
      roles: [{ name: 'Board Member', scope: { orgId: 'org-rovida-001', buildingIds: ['BLD001'] } }], // Board members typically tied to specific buildings
      onboarded: false,
    },
  },
  {
    email: 'owner@example.com',
    password: 'password',
    user: {
      id: 'usr-own-001',
      name: 'Owner',
      email: 'owner@example.com',
      roles: [{ name: 'Owner', scope: { orgId: 'org-rovida-001', buildingIds: ['BLD001'], unitIds: ['UNIT001'] } }],
      onboarded: false,
    },
  },
  {
    email: 'tenant@example.com',
    password: 'password',
    user: {
      id: 'usr-ten-001',
      name: 'Tenant',
      email: 'tenant@example.com',
      roles: [{ name: 'Tenant', scope: { orgId: 'org-rovida-001', buildingIds: ['BLD001'], unitIds: ['UNIT002'] } }],
      onboarded: false,
    },
  },
  {
    email: 'vendor@example.com',
    password: 'password',
    user: {
      id: 'usr-ven-001',
      name: 'Vendor',
      email: 'vendor@example.com',
      roles: [{ name: 'Vendor / Service Provider', scope: { orgId: 'org-rovida-001', vendorId: 'VND001' } }], // Vendor scope is by vendorId, not building/unit
      onboarded: false,
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
      onboarded: false,
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
      onboarded: false,
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
      onboarded: false,
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
      onboarded: false,
    },
  },
];

interface UserContextType {
  currentUser: CurrentUser | null;
  setCurrentUser: (user: CurrentUser | null) => void;
  updateCurrentUser: (updates: Partial<CurrentUser>) => void; // Added update function
  registerUser: (name: string, email: string, password: string) => CurrentUser; // Added register function
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(() => {
    // Initialize from local storage
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('currentUser');
      return savedUser ? JSON.parse(savedUser) : null;
    }
    return null;
  });

  useEffect(() => {
    // Persist to local storage whenever currentUser changes
    if (typeof window !== 'undefined') {
      if (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('currentUser');
      }
    }
  }, [currentUser]);

  const updateCurrentUser = (updates: Partial<CurrentUser>) => {
    setCurrentUser(prevUser => {
      if (!prevUser) return null;
      const updatedUser = { ...prevUser, ...updates };
      return updatedUser;
    });
  };

  const registerUser = (name: string, email: string, password: string): CurrentUser => {
    // Simulate user registration
    const existingUser = MOCK_USERS.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User with this email already exists.');
    }

    const newUserId = `usr-new-${MOCK_USERS.length + 1}`;
    const newUser: CurrentUser = {
      id: newUserId,
      name,
      email,
      roles: [{ name: 'Resident', scope: {} }], // Default role for new registrations
      onboarded: false, // New users are not onboarded yet
    };

    MOCK_USERS.push({ email, password, user: newUser }); // Add to mock users
    return newUser;
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, updateCurrentUser, registerUser }}>
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