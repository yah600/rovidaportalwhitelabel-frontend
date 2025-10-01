"use client";

import { useUser, CurrentUser } from '@/context/UserContext';

// Define the permission structure
interface ModulePermissions {
  read?: boolean;
  create?: boolean;
  update?: boolean;
  delete?: boolean;
  approve?: boolean;
  export?: boolean;
  special?: boolean; // For specific actions like "ack/escalate/close"
}

interface PermissionsMatrix {
  [roleName: string]: {
    [moduleName: string]: ModulePermissions;
  };
}

// Simplified PERMISSIONS_MATRIX based on your detailed matrix
// This is a frontend representation; backend should always enforce actual RLS.
const PERMISSIONS_MATRIX: PermissionsMatrix = {
  'Platform Owner': {
    'Dashboard': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true },
    'Issues': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true },
    'Emergency Center': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true },
    'Maintenance': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true },
    'Maintenance Agenda XLSX': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true },
    'Finance': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true }, // Covers all finance sub-modules
    'Board': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true }, // Covers all board sub-modules
    'Documents': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true },
    'Communications': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true },
    'Integrations': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true },
    'Analytics': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true },
    'Settings': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true }, // Covers all settings sub-modules
    'Profile': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true },
    'About Us': { read: true },
    'CardNav Demo': { read: true },
    'Onboarding': { read: true },
  },
  'Client Super-Administrator': {
    'Dashboard': { read: true },
    'Issues': { read: true, create: true, update: true, delete: true, approve: true },
    'Emergency Center': { read: true, approve: true },
    'Maintenance': { read: true, create: true, update: true, delete: true, approve: true },
    'Maintenance Agenda XLSX': { create: true, update: true, delete: true, approve: true },
    'Finance': { read: true, create: true, update: true, delete: true, approve: true, export: true }, // General finance access
    'Finance - Statements': { read: true, export: true },
    'Finance - Bills/Recurring/Deposits': { read: true, create: true, update: true, delete: true, approve: true, export: true },
    'Finance - Ledger/Trial Balance': { read: true, export: true },
    'Finance - Late Fees/NSF/Reconciliation': { approve: true, update: true, export: true },
    'Finance - Reports': { read: true, export: true },
    'Board': { read: true, create: true, update: true, approve: true }, // General board access
    'Board - Meetings/Votes': { read: true, create: true, update: true, approve: true },
    'Documents': { read: true, create: true, update: true, delete: true, export: true },
    'Communications': { read: true, create: true, update: true, delete: true, approve: true },
    'Integrations': { read: true, create: true, update: true, delete: true, approve: true },
    'Analytics': { read: true },
    'Settings': { read: true, create: true, update: true, delete: true, export: true },
    'Profile': { read: true, update: true },
    'About Us': { read: true },
    'CardNav Demo': { read: true },
    'Onboarding': { read: true },
  },
  'Condo Administrator': {
    'Dashboard': { read: true },
    'Issues': { read: true, create: true, update: true, delete: true, approve: true },
    'Emergency Center': { read: true, approve: true },
    'Maintenance': { read: true, create: true, update: true, delete: true, approve: true },
    'Maintenance Agenda XLSX': { create: true, update: true, delete: true, approve: true },
    'Finance': { read: true, create: true }, // General finance access, C for simple charges
    'Finance - Statements': { read: true },
    'Finance - Bills/Recurring/Deposits': { read: true, create: true },
    'Finance - Reports': { read: true },
    'Board': { read: true, create: true, update: true }, // General board access
    'Board - Meetings/Votes': { read: true, create: true, update: true },
    'Documents': { read: true, create: true, update: true, delete: true, export: true },
    'Communications': { read: true, create: true, update: true, delete: true, approve: true },
    'Integrations': { read: true },
    'Analytics': { read: true },
    'Settings': { read: true, create: true, update: true, delete: true },
    'Profile': { read: true, update: true },
    'About Us': { read: true },
    'CardNav Demo': { read: true },
    'Onboarding': { read: true },
  },
  'Property Manager': {
    'Dashboard': { read: true },
    'Issues': { read: true, create: true, update: true, delete: true, approve: true },
    'Emergency Center': { read: true, approve: true },
    'Maintenance': { read: true, create: true, update: true, delete: true, approve: true },
    'Maintenance Agenda XLSX': { create: true, update: true, delete: true, approve: true },
    'Finance': { read: true, create: true }, // General finance access, C for simple charges
    'Finance - Statements': { read: true },
    'Finance - Bills/Recurring/Deposits': { read: true, create: true },
    'Finance - Reports': { read: true },
    'Board': { read: true, create: true, update: true }, // General board access
    'Board - Meetings/Votes': { read: true, create: true, update: true },
    'Documents': { read: true, create: true, update: true, delete: true, export: true },
    'Communications': { read: true, create: true, update: true, delete: true, approve: true },
    'Integrations': { read: true },
    'Analytics': { read: true },
    'Settings': { read: true, create: true, update: true, delete: true },
    'Profile': { read: true, update: true },
    'About Us': { read: true },
    'CardNav Demo': { read: true },
    'Onboarding': { read: true },
  },
  'Accountant': {
    'Dashboard': { read: true },
    'Issues': { read: true },
    'Emergency Center': { read: true },
    'Maintenance': { read: true },
    'Finance': { read: true, create: true, update: true, delete: true, approve: true, export: true }, // Full finance access
    'Finance - Statements': { read: true, export: true },
    'Finance - Bills/Recurring/Deposits': { read: true, create: true, update: true, delete: true, approve: true, export: true },
    'Finance - Ledger/Trial Balance': { read: true, export: true },
    'Finance - Late Fees/NSF/Reconciliation': { create: true, update: true, approve: true, export: true },
    'Finance - Reports': { read: true, export: true },
    'Board': { read: true }, // General board access (packages)
    'Board - Meetings/Votes': { read: true },
    'Documents': { read: true, create: true, export: true },
    'Communications': { read: true, create: true, approve: true },
    'Integrations': { read: true },
    'Analytics': { read: true },
    'Settings': { read: true, update: true },
    'Profile': { read: true, update: true },
    'About Us': { read: true },
    'CardNav Demo': { read: true },
    'Onboarding': { read: true },
  },
  'Board Member': {
    'Dashboard': { read: true },
    'Issues': { read: true },
    'Emergency Center': { read: true },
    'Maintenance': { read: true },
    'Finance': { read: true, export: true }, // Summary reports
    'Finance - Statements': { read: true },
    'Finance - Reports': { read: true, export: true },
    'Board': { read: true, create: true, update: true, approve: true }, // Full board access
    'Board - Meetings/Votes': { read: true, create: true, update: true, approve: true },
    'Documents': { read: true, export: true },
    'Communications': { read: true },
    'Analytics': { read: true },
    'Settings': { read: true, update: true },
    'Profile': { read: true, update: true },
    'About Us': { read: true },
    'CardNav Demo': { read: true },
    'Onboarding': { read: true },
  },
  'Owner': {
    'Dashboard': { read: true },
    'Issues': { read: true, create: true, update: true, approve: true },
    'Emergency Center': { read: true },
    'Maintenance': { read: true },
    'Finance': { read: true, export: true }, // Own statements
    'Finance - Statements': { read: true, export: true },
    'Documents': { read: true, export: true },
    'Communications': { read: true },
    'Profile': { read: true, update: true },
    'About Us': { read: true },
    'CardNav Demo': { read: true },
    'Onboarding': { read: true },
  },
  'Tenant': {
    'Dashboard': { read: true },
    'Issues': { read: true, create: true, update: true, approve: true },
    'Emergency Center': { read: true },
    'Maintenance': { read: true },
    'Finance': { read: true, export: true }, // Optional rent receipts
    'Finance - Statements': { read: true, export: true },
    'Documents': { read: true, export: true },
    'Communications': { read: true },
    'Profile': { read: true, update: true },
    'About Us': { read: true },
    'CardNav Demo': { read: true },
    'Onboarding': { read: true },
  },
  'Vendor / Service Provider': {
    'Dashboard': { read: true },
    'Issues': { read: true },
    'Maintenance': { read: true, update: true },
    'Documents': { read: true },
    'Communications': { read: true },
    'Profile': { read: true, update: true },
    'About Us': { read: true },
    'CardNav Demo': { read: true },
    'Onboarding': { read: true },
  },
  'Emergency Agent': {
    'Dashboard': { read: true },
    'Issues': { read: true, approve: true },
    'Emergency Center': { read: true, approve: true },
    'Maintenance': { read: true },
    'Documents': { read: true },
    'Communications': { read: true },
    'Profile': { read: true, update: true },
    'About Us': { read: true },
    'CardNav Demo': { read: true },
    'Onboarding': { read: true },
  },
  'Concierge / Front Desk / Security': {
    'Dashboard': { read: true },
    'Issues': { read: true, create: true, update: true },
    'Emergency Center': { read: true, approve: true },
    'Maintenance': { read: true, create: true },
    'Documents': { read: true },
    'Communications': { read: true },
    'Profile': { read: true, update: true },
    'About Us': { read: true },
    'CardNav Demo': { read: true },
    'Onboarding': { read: true },
  },
  'Building Maintenance Technician': {
    'Dashboard': { read: true },
    'Issues': { read: true, create: true },
    'Emergency Center': { read: true },
    'Maintenance': { read: true, create: true, update: true },
    'Documents': { read: true },
    'Communications': { read: true },
    'Profile': { read: true, update: true },
    'About Us': { read: true },
    'CardNav Demo': { read: true },
    'Onboarding': { read: true },
  },
  'Read-Only Auditor': {
    'Finance': { read: true, export: true }, // General finance access
    'Finance - Statements': { read: true, export: true },
    'Finance - Ledger/Trial Balance': { read: true, export: true },
    'Finance - Reports': { read: true, export: true },
    'Documents': { read: true, export: true },
    'Profile': { read: true, update: true },
    'About Us': { read: true },
    'CardNav Demo': { read: true },
    'Onboarding': { read: true },
  },
};

export const useAuth = () => {
  const { currentUser } = useUser();

  const checkPermission = (moduleName: string, action: keyof ModulePermissions): boolean => {
    if (!currentUser || !currentUser.roles || currentUser.roles.length === 0) {
      return false;
    }

    // If any of the user's roles grant the permission, then they have it
    for (const userRole of currentUser.roles) {
      const rolePermissions = PERMISSIONS_MATRIX[userRole.name];
      if (rolePermissions) {
        const modulePermissions = rolePermissions[moduleName];
        if (modulePermissions && modulePermissions[action]) {
          return true;
        }
      }
    }
    return false;
  };

  // Helper functions for common actions
  const canRead = (moduleName: string) => checkPermission(moduleName, 'read');
  const canCreate = (moduleName: string) => checkPermission(moduleName, 'create');
  const canUpdate = (moduleName: string) => checkPermission(moduleName, 'update');
  const canDelete = (moduleName: string) => checkPermission(moduleName, 'delete');
  const canApprove = (moduleName: string) => checkPermission(moduleName, 'approve');
  const canExport = (moduleName: string) => checkPermission(moduleName, 'export');
  const canPerformSpecial = (moduleName: string) => checkPermission(moduleName, 'special');

  return {
    currentUser,
    canRead,
    canCreate,
    canUpdate,
    canDelete,
    canApprove,
    canExport,
    canPerformSpecial,
  };
};