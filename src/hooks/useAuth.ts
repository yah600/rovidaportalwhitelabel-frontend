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
    'Finance - Bills/Recurring/Deposits': { read: true, create: true, update: true, delete: true, approve: true, export: true },
    'Finance - Statements': { read: true, export: true },
    'Finance - Ledger/Trial Balance': { read: true, export: true },
    'Finance - Late Fees/NSF/Reconciliation': { approve: true, update: true, export: true },
    'Finance - Reports': { read: true, export: true },
    'Board': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true }, // Covers all board sub-modules
    'Board - Meetings/Votes': { read: true, create: true, update: true, approve: true },
    'Documents': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true },
    'Communications': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true },
    'Integrations': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true },
    'Analytics': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true },
    'Settings': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true }, // Covers all settings sub-modules
    'Profile': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true },
    'Feedback': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true },
  },
  'Client Super-Administrator': {
    'Dashboard': { read: true },
    'Issues': { read: true, create: true, update: true, delete: true, approve: true },
    'Emergency Center': { read: true, approve: true, special: true },
    'Maintenance': { read: true, create: true, update: true, delete: true, approve: true },
    'Maintenance Agenda XLSX': { create: true, update: true, delete: true, approve: true },
    'Finance': { read: true, create: true, update: true, delete: true, approve: true, export: true },
    'Finance - Bills/Recurring/Deposits': { read: true, create: true, update: true, delete: true, approve: true, export: true },
    'Finance - Statements': { read: true, export: true },
    'Finance - Ledger/Trial Balance': { read: true, export: true },
    'Finance - Late Fees/NSF/Reconciliation': { approve: true, update: true, export: true },
    'Finance - Reports': { read: true, export: true },
    'Board': { read: true, create: true, update: true, approve: true },
    'Board - Meetings/Votes': { read: true, create: true, update: true, approve: true },
    'Documents': { read: true, create: true, update: true, delete: true, export: true },
    'Communications': { read: true, create: true, update: true, delete: true, approve: true },
    'Integrations': { read: true, create: true, update: true, delete: true, approve: true },
    'Analytics': { read: true },
    'Settings': { read: true, create: true, update: true, delete: true, export: true },
    'Profile': { read: true, update: true },
    'Feedback': { read: true, create: true, update: true, delete: true },
  },
  'Condo Administrator': {
    'Dashboard': { read: true },
    'Issues': { read: true, create: true, update: true, delete: true, approve: true },
    'Emergency Center': { read: true, approve: true, special: true },
    'Maintenance': { read: true, create: true, update: true, delete: true, approve: true },
    'Maintenance Agenda XLSX': { create: true, update: true, delete: true, approve: true },
    'Finance': { read: true, create: true },
    'Finance - Bills/Recurring/Deposits': { read: true, create: true },
    'Finance - Statements': { read: true },
    'Finance - Reports': { read: true },
    'Board': { read: true, create: true, update: true },
    'Board - Meetings/Votes': { read: true, create: true, update: true },
    'Documents': { read: true, create: true, update: true, delete: true, export: true },
    'Communications': { read: true, create: true, update: true, delete: true, approve: true },
    'Integrations': { read: true },
    'Analytics': { read: true },
    'Settings': { read: true, create: true, update: true, delete: true },
    'Profile': { read: true, update: true },
    'Feedback': { read: true, create: true, update: true, delete: true },
  },
  'Property Manager': {
    'Dashboard': { read: true },
    'Issues': { read: true, create: true, update: true, delete: true, approve: true },
    'Emergency Center': { read: true, approve: true, special: true },
    'Maintenance': { read: true, create: true, update: true, delete: true, approve: true },
    'Maintenance Agenda XLSX': { create: true, update: true, delete: true, approve: true },
    'Finance': { read: true, create: true },
    'Finance - Bills/Recurring/Deposits': { read: true, create: true },
    'Finance - Statements': { read: true },
    'Finance - Reports': { read: true },
    'Board': { read: true, create: true, update: true },
    'Board - Meetings/Votes': { read: true, create: true, update: true },
    'Documents': { read: true, create: true, update: true, delete: true, export: true },
    'Communications': { read: true, create: true, update: true, delete: true, approve: true },
    'Integrations': { read: true },
    'Analytics': { read: true },
    'Settings': { read: true, create: true, update: true, delete: true },
    'Profile': { read: true, update: true },
    'Feedback': { read: true, create: true, update: true, delete: true },
  },
  'Accountant': {
    'Dashboard': { read: true },
    'Issues': { read: false }, // Accountants should not see water leaks
    'Emergency Center': { read: false },
    'Maintenance': { read: false },
    'Maintenance Agenda XLSX': { read: false },
    'Finance': { read: true, create: true, update: true, delete: true, approve: true, export: true },
    'Finance - Bills/Recurring/Deposits': { read: true, create: true, update: true, delete: true, approve: true, export: true },
    'Finance - Statements': { read: true, export: true },
    'Finance - Ledger/Trial Balance': { read: true, export: true },
    'Finance - Late Fees/NSF/Reconciliation': { create: true, update: true, approve: true, export: true },
    'Finance - Reports': { read: true, export: true },
    'Board': { read: false },
    'Board - Meetings/Votes': { read: false },
    'Documents': { read: true, create: true, export: true }, // Can read/create/export financial documents
    'Communications': { read: true, create: true, approve: true }, // Can send financial communications
    'Integrations': { read: false },
    'Analytics': { read: true }, // Can view financial analytics
    'Settings': { read: true, update: true }, // Can update profile and relevant financial settings
    'Profile': { read: true, update: true },
    'Feedback': { read: true, create: true },
  },
  'Board Member': {
    'Dashboard': { read: true },
    'Issues': { read: true }, // Can read issues for oversight
    'Emergency Center': { read: true },
    'Maintenance': { read: true }, // Can read maintenance for oversight
    'Maintenance Agenda XLSX': { read: false },
    'Finance': { read: true, export: true },
    'Finance - Bills/Recurring/Deposits': { read: true, export: true },
    'Finance - Statements': { read: true, export: true },
    'Finance - Ledger/Trial Balance': { read: false },
    'Finance - Late Fees/NSF/Reconciliation': { read: false },
    'Finance - Reports': { read: true, export: true },
    'Board': { read: true, create: true, update: true, approve: true },
    'Board - Meetings/Votes': { read: true, create: true, update: true, approve: true },
    'Documents': { read: true, export: true },
    'Communications': { read: true },
    'Integrations': { read: false },
    'Analytics': { read: true },
    'Settings': { read: true, update: true },
    'Profile': { read: true, update: true },
    'Feedback': { read: true, create: true },
  },
  'Owner': {
    'Dashboard': { read: true },
    'Issues': { read: true, create: true, update: true }, // Can manage their own issues
    'Emergency Center': { read: true },
    'Maintenance': { read: true }, // Can read status of maintenance affecting their unit
    'Maintenance Agenda XLSX': { read: false },
    'Finance': { read: true, export: true }, // Can view their own statements/bills
    'Finance - Bills/Recurring/Deposits': { read: true, export: true },
    'Finance - Statements': { read: true, export: true },
    'Finance - Ledger/Trial Balance': { read: false },
    'Finance - Late Fees/NSF/Reconciliation': { read: false },
    'Finance - Reports': { read: false },
    'Board': { read: false },
    'Board - Meetings/Votes': { read: false },
    'Documents': { read: true, export: true }, // Can read general documents and documents related to their unit
    'Communications': { read: true }, // Can read announcements
    'Integrations': { read: false },
    'Analytics': { read: false },
    'Settings': { read: true, update: true }, // Can update profile and notification settings
    'Profile': { read: true, update: true },
    'Feedback': { read: true, create: true },
  },
  'Tenant': {
    'Dashboard': { read: true },
    'Issues': { read: true, create: true, update: true }, // Can manage their own issues
    'Emergency Center': { read: true },
    'Maintenance': { read: true }, // Can read status of maintenance affecting their unit
    'Maintenance Agenda XLSX': { read: false },
    'Finance': { read: true, export: true }, // Can view their own statements/bills (e.g., rent receipts)
    'Finance - Bills/Recurring/Deposits': { read: true, export: true },
    'Finance - Statements': { read: true, export: true },
    'Finance - Ledger/Trial Balance': { read: false },
    'Finance - Late Fees/NSF/Reconciliation': { read: false },
    'Finance - Reports': { read: false },
    'Board': { read: false },
    'Board - Meetings/Votes': { read: false },
    'Documents': { read: true, export: true }, // Can read general documents and documents related to their unit
    'Communications': { read: true }, // Can read announcements
    'Integrations': { read: false },
    'Analytics': { read: false },
    'Settings': { read: true, update: true }, // Can update profile and notification settings
    'Profile': { read: true, update: true },
    'Feedback': { read: true, create: true },
  },
  'Vendor / Service Provider': {
    'Dashboard': { read: true },
    'Issues': { read: false },
    'Emergency Center': { read: false },
    'Maintenance': { read: true, update: true }, // Can view and update assigned work orders/tasks
    'Maintenance Agenda XLSX': { read: false },
    'Finance': { read: false },
    'Finance - Bills/Recurring/Deposits': { read: false },
    'Finance - Statements': { read: false },
    'Finance - Ledger/Trial Balance': { read: false },
    'Finance - Late Fees/NSF/Reconciliation': { read: false },
    'Finance - Reports': { read: false },
    'Board': { read: false },
    'Board - Meetings/Votes': { read: false },
    'Documents': { read: true }, // Can read relevant documents (e.g., specs, manuals)
    'Communications': { read: true }, // Can read announcements
    'Integrations': { read: false },
    'Analytics': { read: false },
    'Settings': { read: true, update: true },
    'Profile': { read: true, update: true },
    'Feedback': { read: true, create: true },
  },
  'Emergency Agent': {
    'Dashboard': { read: true },
    'Issues': { read: true, approve: true, update: true }, // Can read, acknowledge, and update issues
    'Emergency Center': { read: true, approve: true, special: true, update: true }, // Full control over emergency alerts
    'Maintenance': { read: true },
    'Maintenance Agenda XLSX': { read: false },
    'Finance': { read: false },
    'Finance - Bills/Recurring/Deposits': { read: false },
    'Finance - Statements': { read: false },
    'Finance - Ledger/Trial Balance': { read: false },
    'Finance - Late Fees/NSF/Reconciliation': { read: false },
    'Finance - Reports': { read: false },
    'Board': { read: false },
    'Board - Meetings/Votes': { read: false },
    'Documents': { read: true },
    'Communications': { read: true },
    'Integrations': { read: false },
    'Analytics': { read: false },
    'Settings': { read: true, update: true },
    'Profile': { read: true, update: true },
    'Feedback': { read: true, create: true },
  },
  'Concierge / Front Desk / Security': {
    'Dashboard': { read: true },
    'Issues': { read: true, create: true, update: true },
    'Emergency Center': { read: true, approve: true, special: true },
    'Maintenance': { read: true, create: true }, // Can create basic work orders
    'Maintenance Agenda XLSX': { read: false },
    'Finance': { read: false },
    'Finance - Bills/Recurring/Deposits': { read: false },
    'Finance - Statements': { read: false },
    'Finance - Ledger/Trial Balance': { read: false },
    'Finance - Late Fees/NSF/Reconciliation': { read: false },
    'Finance - Reports': { read: false },
    'Board': { read: false },
    'Board - Meetings/Votes': { read: false },
    'Documents': { read: true },
    'Communications': { read: true, create: true }, // Can send general announcements
    'Integrations': { read: false },
    'Analytics': { read: false },
    'Settings': { read: true, update: true },
    'Profile': { read: true, update: true },
    'Feedback': { read: true, create: true },
  },
  'Building Maintenance Technician': {
    'Dashboard': { read: true },
    'Issues': { read: true, update: true }, // Can read and update assigned issues
    'Emergency Center': { read: true },
    'Maintenance': { read: true, create: true, update: true }, // Full access to assigned maintenance
    'Maintenance Agenda XLSX': { read: false },
    'Finance': { read: false },
    'Finance - Bills/Recurring/Deposits': { read: false },
    'Finance - Statements': { read: false },
    'Finance - Ledger/Trial Balance': { read: false },
    'Finance - Late Fees/NSF/Reconciliation': { read: false },
    'Finance - Reports': { read: false },
    'Board': { read: false },
    'Board - Meetings/Votes': { read: false },
    'Documents': { read: true }, // Can read relevant manuals/schematics
    'Communications': { read: true },
    'Integrations': { read: false },
    'Analytics': { read: false },
    'Settings': { read: true, update: true },
    'Profile': { read: true, update: true },
    'Feedback': { read: true, create: true },
  },
  'Read-Only Auditor': {
    'Dashboard': { read: true },
    'Issues': { read: true },
    'Emergency Center': { read: true },
    'Maintenance': { read: true },
    'Maintenance Agenda XLSX': { read: false },
    'Finance': { read: true, export: true },
    'Finance - Bills/Recurring/Deposits': { read: true, export: true },
    'Finance - Statements': { read: true, export: true },
    'Finance - Ledger/Trial Balance': { read: true, export: true },
    'Finance - Late Fees/NSF/Reconciliation': { read: false },
    'Finance - Reports': { read: true, export: true },
    'Board': { read: true },
    'Board - Meetings/Votes': { read: true },
    'Documents': { read: true, export: true },
    'Communications': { read: true },
    'Integrations': { read: false },
    'Analytics': { read: true },
    'Settings': { read: true },
    'Profile': { read: true, update: true },
    'Feedback': { read: true },
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