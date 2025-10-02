"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

import { ROLE_IDS, RoleId } from '@/shared/rbac/roles';

// Define the structure for a user's roles and scope
export interface UserRole {
  name: RoleId;
  scope: {
    orgId?: string;
    buildingIds?: string[];
    unitIds?: string[];
    vendorId?: string;
    isSuper?: boolean; // For SYSADMIN/global roles
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
    email: 'sysadmin@example.com',
    password: 'password',
    user: {
      id: 'usr-sys-001',
      name: 'System Admin',
      email: 'sysadmin@example.com',
      roles: [{ name: ROLE_IDS.SYSADMIN, scope: { isSuper: true } }],
      onboarded: true,
    },
  },
  {
    email: 'portfolio.manager@example.com',
    password: 'password',
    user: {
      id: 'usr-port-001',
      name: 'Portfolio Manager',
      email: 'portfolio.manager@example.com',
      roles: [{ name: ROLE_IDS.PORTFOLIO_MANAGER, scope: { orgId: 'org-rovida-001' } }],
      onboarded: true,
    },
  },
  {
    email: 'building.manager@example.com',
    password: 'password',
    user: {
      id: 'usr-bld-001',
      name: 'Building Manager',
      email: 'building.manager@example.com',
      roles: [
        {
          name: ROLE_IDS.BUILDING_MANAGER,
          scope: { orgId: 'org-rovida-001', buildingIds: ['BLD001', 'BLD002', 'BLD003'] },
        },
      ],
      onboarded: true,
    },
  },
  {
    email: 'board.member@example.com',
    password: 'password',
    user: {
      id: 'usr-brd-001',
      name: 'Board Member',
      email: 'board.member@example.com',
      roles: [
        {
          name: ROLE_IDS.BOARD,
          scope: { orgId: 'org-rovida-001', buildingIds: ['BLD001'] },
        },
      ],
      onboarded: true,
    },
  },
  {
    email: 'owner@example.com',
    password: 'password',
    user: {
      id: 'usr-own-001',
      name: 'Owner',
      email: 'owner@example.com',
      roles: [
        {
          name: ROLE_IDS.OWNER,
          scope: {
            orgId: 'org-rovida-001',
            buildingIds: ['BLD001'],
            unitIds: ['UNIT001'],
          },
        },
      ],
      onboarded: true,
    },
  },
  {
    email: 'tenant@example.com',
    password: 'password',
    user: {
      id: 'usr-ten-001',
      name: 'Tenant',
      email: 'tenant@example.com',
      roles: [
        {
          name: ROLE_IDS.TENANT,
          scope: {
            orgId: 'org-rovida-001',
            buildingIds: ['BLD001'],
            unitIds: ['UNIT002'],
          },
        },
      ],
      onboarded: true,
    },
  },
  {
    email: 'vendor@example.com',
    password: 'password',
    user: {
      id: 'usr-ven-001',
      name: 'Vendor',
      email: 'vendor@example.com',
      roles: [
        {
          name: ROLE_IDS.VENDOR,
          scope: { orgId: 'org-rovida-001', vendorId: 'VND001' },
        },
      ],
      onboarded: true,
    },
  },
  {
    email: 'security@example.com',
    password: 'password',
    user: {
      id: 'usr-sec-001',
      name: 'Security Staff',
      email: 'security@example.com',
      roles: [
        {
          name: ROLE_IDS.SECURITY,
          scope: { orgId: 'org-rovida-001', buildingIds: ['BLD001'] },
        },
      ],
      onboarded: true,
    },
  },
  {
    email: 'guest@example.com',
    password: 'password',
    user: {
      id: 'usr-gst-001',
      name: 'Guest User',
      email: 'guest@example.com',
      roles: [{ name: ROLE_IDS.GUEST, scope: {} }],
      onboarded: true,
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