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
// You can change the 'roles' array to test different user types
const MOCK_CURRENT_USER: CurrentUser = {
  id: 'usr-mock-001',
  name: 'John Doe',
  email: 'john.doe@example.com',
  roles: [
    { name: 'Client Super-Administrator', scope: { orgId: 'org-rovida-001', isSuper: false } },
    // { name: 'Condo Administrator', scope: { orgId: 'org-rovida-001', buildingIds: ['BLD001', 'BLD002'] } },
    // { name: 'Owner', scope: { orgId: 'org-rovida-001', unitIds: ['UNIT001'] } },
    // { name: 'Building Maintenance Technician', scope: { orgId: 'org-rovida-001', buildingIds: ['BLD001'] } },
  ],
};

interface UserContextType {
  currentUser: CurrentUser | null;
  setCurrentUser: (user: CurrentUser | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(MOCK_CURRENT_USER);

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