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
// Roles aligned with RBAC system: SYSADMIN, PORTFOLIO_MANAGER, BUILDING_MANAGER, BOARD, OWNER, TENANT, VENDOR, SECURITY, GUEST
export const MOCK_USERS: { email: string; password: string; user: CurrentUser }[] = [
  {
    email: 'sysadmin@example.com',
    password: 'password',
    user: {
      id: 'usr-sa-001',
      name: 'System Administrator',
      email: 'sysadmin@example.com',
      roles: [{ name: 'SYSADMIN', scope: { isSuper: true } }],
      onboarded: true,
    },
  },
  {
    email: 'portfolio.manager@example.com',
    password: 'password',
    user: {
      id: 'usr-pm-001',
      name: 'Portfolio Manager',
      email: 'portfolio.manager@example.com',
      roles: [{ name: 'PORTFOLIO_MANAGER', scope: { orgId: 'org-rovida-001' } }],
      onboarded: true,
    },
  },
  {
    email: 'building.manager@example.com',
    password: 'password',
    user: {
      id: 'usr-bm-001',
      name: 'Building Manager',
      email: 'building.manager@example.com',
      roles: [{ name: 'BUILDING_MANAGER', scope: { orgId: 'org-rovida-001', buildingIds: ['BLD001', 'BLD002'] } }],
      onboarded: true,
    },
  },
  {
    email: 'board@example.com',
    password: 'password',
    user: {
      id: 'usr-bd-001',
      name: 'Board Member',
      email: 'board@example.com',
      roles: [{ name: 'BOARD', scope: { orgId: 'org-rovida-001', buildingIds: ['BLD001'] } }],
      onboarded: true,
    },
  },
  {
    email: 'owner@example.com',
    password: 'password',
    user: {
      id: 'usr-own-001',
      name: 'Unit Owner',
      email: 'owner@example.com',
      roles: [{ name: 'OWNER', scope: { orgId: 'org-rovida-001', buildingIds: ['BLD001'], unitIds: ['UNIT001'] } }],
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
      roles: [{ name: 'TENANT', scope: { orgId: 'org-rovida-001', buildingIds: ['BLD001'], unitIds: ['UNIT002'] } }],
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
      roles: [{ name: 'VENDOR', scope: { orgId: 'org-rovida-001', vendorId: 'VND001' } }],
      onboarded: true,
    },
  },
  {
    email: 'security@example.com',
    password: 'password',
    user: {
      id: 'usr-sec-001',
      name: 'Security Personnel',
      email: 'security@example.com',
      roles: [{ name: 'SECURITY', scope: { orgId: 'org-rovida-001', buildingIds: ['BLD001'] } }],
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
      roles: [{ name: 'GUEST', scope: {} }],
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