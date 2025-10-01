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

// PERMISSIONS_MATRIX: Frontend representation of role-based access control.
// Backend should always enforce actual RLS.
const PERMISSIONS_MATRIX: PermissionsMatrix = {
  'Platform Owner': {
    'Dashboard': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true },
    'Issues': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true },
    'Emergency Center': { read: true, create: true, update: true, delete: true, approve: true, special: true },
    'Maintenance': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true },
    'Maintenance Agenda XLSX': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true },
    'Finance': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true },
    'Finance - Bills/Recurring/Deposits': { read: true, create: true, update: true, delete: true, approve: true, export: true },
    'Finance - Statements': { read: true, export: true },
    'Finance - Ledger/Trial Balance': { read: true, export: true },
    'Finance - Late Fees/NSF/Reconciliation': { approve: true, update: true, export: true },
    'Finance - Reports': { read: true, export: true },
    'Board': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true },
    'Board - Meetings/Votes': { read: true, create: true, update: true, approve: true },
    'Architectural Requests': { read: true, create: true, update: true, delete: true, approve: true }, // New module
    'Rules': { read: true, create: true, update: true, delete: true }, // New module
    'Insurance': { read: true, create: true, update: true, delete: true }, // New module
    'Amenities': { read: true, create: true, update: true, delete: true }, // New module
    'Tenant & Lease Management': { read: true, create: true, update: true, delete: true }, // New module
    'Portfolio Management': { read: true, create: true, update: true, delete: true }, // New module
    'Visitor Logs': { read: true, create: true, update: true, delete: true }, // New module
    'Documents': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true },
    'Communications': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true },
    'Integrations': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true },
    'Analytics': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true },
    'Settings': { read: true, create: true, update: true, delete: true, approve: true, export: true, special: true },
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
    'Architectural Requests': { read: true, create: true, update: true, approve: true }, // New module
    'Rules': { read: true, create: true, update: true }, // New module
    'Insurance': { read: true, create: true, update: true }, // New module
    'Amenities': { read: true, create: true, update: true }, // New module
    'Tenant & Lease Management': { read: true, create: true, update: true }, // New module
    'Portfolio Management': { read: true, create: true, update: true }, // New module
    'Visitor Logs': { read: true, create: true, update: true }, // New module
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
    'Finance': { read: true, create: true, update: true, delete: true, approve: true, export: true },
    'Finance - Bills/Recurring/Deposits': { read: true, create: true, update: true, delete: true, approve: true, export: true },
    'Finance - Statements': { read: true, export: true },
    'Finance - Ledger/Trial Balance': { read: true, export: true },
    'Finance - Late Fees/NSF/Reconciliation': { approve: true, update: true, export: true },
    'Finance - Reports': { read: true, export: true },
    'Board': { read: true, create: true, update: true, approve: true },
    'Board - Meetings/Votes': { read: true, create: true, update: true, approve: true },
    'Architectural Requests': { read: true, create: true, update: true, approve: true }, // New module
    'Rules': { read: true, create: true, update: true }, // New module
    'Insurance': { read: true, create: true, update: true }, // New module
    'Amenities': { read: true, create: true, update: true }, // New module
    'Tenant & Lease Management': { read: true, create: true, update: true }, // New module
    'Portfolio Management': { read: true, create: true, update: true }, // New module
    'Visitor Logs': { read: true, create: true, update: true }, // New module
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
    'Finance': { read: true, create: true, update: true, delete: true, approve: true, export: true },
    'Finance - Bills/Recurring/Deposits': { read: true, create: true, update: true, delete: true, approve: true, export: true },
    'Finance - Statements': { read: true, export: true },
    'Finance - Ledger/Trial Balance': { read: true, export: true },
    'Finance - Late Fees/NSF/Reconciliation': { approve: true, update: true, export: true },
    'Finance - Reports': { read: true, export: true },
    'Board': { read: true, create: true, update: true },
    'Board - Meetings/Votes': { read: true, create: true, update: true },
    'Architectural Requests': { read: true, create: true, update: true, approve: true }, // New module
    'Rules': { read: true, create: true, update: true }, // New module
    'Insurance': { read: true, create: true, update: true }, // New module
    'Amenities': { read: true, create: true, update: true }, // New module
    'Tenant & Lease Management': { read: true, create: true, update: true }, // New module
    'Portfolio Management': { read: true, create: true, update: true }, // New module
    'Visitor Logs': { read: true, create: true, update: true }, // New module
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
    'Issues': { read: false },
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
    'Architectural Requests': { read: false }, // New module
    'Rules': { read: false }, // New module
    'Insurance': { read: true }, // Can read insurance policies for financial context
    'Amenities': { read: false }, // New module
    'Tenant & Lease Management': { read: true }, // Can read leases for financial context
    'Portfolio Management': { read: true }, // Can read portfolio for financial context
    'Visitor Logs': { read: false }, // New module
    'Documents': { read: true, create: true, export: true },
    'Communications': { read: true, create: true, approve: true },
    'Integrations': { read: false },
    'Analytics': { read: true },
    'Settings': { read: true, update: true },
    'Profile': { read: true, update: true },
    'Feedback': { read: true, create: true },
  },
  'Board Member': {
    'Dashboard': { read: true },
    'Issues': { read: true },
    'Emergency Center': { read: true },
    'Maintenance': { read: true },
    'Maintenance Agenda XLSX': { read: false },
    'Finance': { read: true, export: true },
    'Finance - Bills/Recurring/Deposits': { read: true, export: true },
    'Finance - Statements': { read: true, export: true },
    'Finance - Ledger/Trial Balance': { read: false },
    'Finance - Late Fees/NSF/Reconciliation': { read: false },
    'Finance - Reports': { read: true, export: true },
    'Board': { read: true, create: true, update: true, approve: true },
    'Board - Meetings/Votes': { read: true, create: true, update: true, approve: true },
    'Architectural Requests': { read: true, create: true, update: true, approve: true }, // New module
    'Rules': { read: true }, // New module
    'Insurance': { read: true }, // New module
    'Amenities': { read: true }, // New module
    'Tenant & Lease Management': { read: true }, // New module
    'Portfolio Management': { read: true }, // New module
    'Visitor Logs': { read: true }, // New module
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
    'Issues': { read: true, create: true, update: true },
    'Emergency Center': { read: true },
    'Maintenance': { read: true },
    'Maintenance Agenda XLSX': { read: false },
    'Finance': { read: true, export: true },
    'Finance - Bills/Recurring/Deposits': { read: true, export: true },
    'Finance - Statements': { read: true, export: true },
    'Finance - Ledger/Trial Balance': { read: false },
    'Finance - Late Fees/NSF/Reconciliation': { read: false },
    'Finance - Reports': { read: false },
    'Board': { read: false },
    'Board - Meetings/Votes': { read: false },
    'Architectural Requests': { read: true, create: true, update: true }, // New module (can submit/view own)
    'Rules': { read: true }, // New module
    'Insurance': { read: true }, // Can read general insurance info
    'Amenities': { read: true }, // New module (can view/book)
    'Tenant & Lease Management': { read: true }, // Can read own lease info
    'Portfolio Management': { read: false }, // New module
    'Visitor Logs': { read: true, create: true }, // New module (can add/view own visitors)
    'Documents': { read: true, export: true },
    'Communications': { read: true },
    'Integrations': { read: false },
    'Analytics': { read: false },
    'Settings': { read: true, update: true },
    'Profile': { read: true, update: true },
    'Feedback': { read: true, create: true },
  },
  'Tenant': {
    'Dashboard': { read: true },
    'Issues': { read: true, create: true, update: true },
    'Emergency Center': { read: true },
    'Maintenance': { read: true },
    'Maintenance Agenda XLSX': { read: false },
    'Finance': { read: true, export: true },
    'Finance - Bills/Recurring/Deposits': { read: true, export: true },
    'Finance - Statements': { read: true, export: true },
    'Finance - Ledger/Trial Balance': { read: false },
    'Finance - Late Fees/NSF/Reconciliation': { read: false },
    'Finance - Reports': { read: false },
    'Board': { read: false },
    'Board - Meetings/Votes': { read: false },
    'Architectural Requests': { read: true, create: true, update: true }, // New module (can submit/view own)
    'Rules': { read: true }, // New module
    'Insurance': { read: true }, // Can read general insurance info
    'Amenities': { read: true }, // New module (can view/book)
    'Tenant & Lease Management': { read: true }, // Can read own lease info
    'Portfolio Management': { read: false }, // New module
    'Visitor Logs': { read: true, create: true }, // New module (can add/view own visitors)
    'Documents': { read: true, export: true },
    'Communications': { read: true },
    'Integrations': { read: false },
    'Analytics': { read: false },
    'Settings': { read: true, update: true },
    'Profile': { read: true, update: true },
    'Feedback': { read: true, create: true },
  },
  'Vendor / Service Provider': {
    'Dashboard': { read: true },
    'Issues': { read: true, update: true },
    'Emergency Center': { read: false },
    'Maintenance': { read: true, update: true },
    'Maintenance Agenda XLSX': { read: false },
    'Finance': { read: false },
    'Finance - Bills/Recurring/Deposits': { read: false },
    'Finance - Statements': { read: false },
    'Finance - Ledger/Trial Balance': { read: false },
    'Finance - Late Fees/NSF/Reconciliation': { read: false },
    'Finance - Reports': { read: false },
    'Board': { read: false },
    'Board - Meetings/Votes': { read: false },
    'Architectural Requests': { read: false }, // New module
    'Rules': { read: true }, // Can read rules relevant to their work
    'Insurance': { read: false }, // New module
    'Amenities': { read: false }, // New module
    'Tenant & Lease Management': { read: false }, // New module
    'Portfolio Management': { read: false }, // New module
    'Visitor Logs': { read: true, create: true, update: true }, // Can manage visitor logs for their work
    'Documents': { read: true },
    'Communications': { read: true },
    'Integrations': { read: false },
    'Analytics': { read: false },
    'Settings': { read: true, update: true },
    'Profile': { read: true, update: true },
    'Feedback': { read: true, create: true },
  },
  'Emergency Agent': {
    'Dashboard': { read: true },
    'Issues': { read: true, approve: true, update: true },
    'Emergency Center': { read: true, approve: true, special: true, update: true },
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
    'Architectural Requests': { read: false }, // New module
    'Rules': { read: true }, // New module
    'Insurance': { read: true }, // Can read insurance info for emergency response
    'Amenities': { read: false }, // New module
    'Tenant & Lease Management': { read: false }, // New module
    'Portfolio Management': { read: false }, // New module
    'Visitor Logs': { read: true, create: true, update: true }, // New module
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
    'Maintenance': { read: true, create: true },
    'Maintenance Agenda XLSX': { read: false },
    'Finance': { read: false },
    'Finance - Bills/Recurring/Deposits': { read: false },
    'Finance - Statements': { read: false },
    'Finance - Ledger/Trial Balance': { read: false },
    'Finance - Late Fees/NSF/Reconciliation': { read: false },
    'Finance - Reports': { read: false },
    'Board': { read: false },
    'Board - Meetings/Votes': { read: false },
    'Architectural Requests': { read: false }, // New module
    'Rules': { read: true }, // New module
    'Insurance': { read: false }, // New module
    'Amenities': { read: true, create: true, update: true }, // Can manage amenity bookings
    'Tenant & Lease Management': { read: true }, // Can view tenant info
    'Portfolio Management': { read: false }, // New module
    'Visitor Logs': { read: true, create: true, update: true }, // Full control over visitor logs
    'Documents': { read: true },
    'Communications': { read: true, create: true },
    'Integrations': { read: false },
    'Analytics': { read: false },
    'Settings': { read: true, update: true },
    'Profile': { read: true, update: true },
    'Feedback': { read: true, create: true },
  },
  'Building Maintenance Technician': {
    'Dashboard': { read: true },
    'Issues': { read: true, update: true },
    'Emergency Center': { read: true },
    'Maintenance': { read: true, create: true, update: true },
    'Maintenance Agenda XLSX': { read: false },
    'Finance': { read: false },
    'Finance - Bills/Recurring/Deposits': { read: false },
    'Finance - Statements': { read: false },
    'Finance - Ledger/Trial Balance': { read: false },
    'Finance - Late Fees/NSF/Reconciliation': { read: false },
    'Finance - Reports': { read: false },
    'Board': { read: false },
    'Board - Meetings/Votes': { read: false },
    'Architectural Requests': { read: false }, // New module
    'Rules': { read: true }, // New module
    'Insurance': { read: false }, // New module
    'Amenities': { read: false }, // New module
    'Tenant & Lease Management': { read: false }, // New module
    'Portfolio Management': { read: false }, // New module
    'Visitor Logs': { read: false }, // New module
    'Documents': { read: true },
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
    'Architectural Requests': { read: true }, // New module
    'Rules': { read: true }, // New module
    'Insurance': { read: true }, // New module
    'Amenities': { read: true }, // New module
    'Tenant & Lease Management': { read: true }, // New module
    'Portfolio Management': { read: true }, // New module
    'Visitor Logs': { read: true }, // New module
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