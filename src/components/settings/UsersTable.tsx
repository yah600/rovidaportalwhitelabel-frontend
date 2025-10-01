"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
import { User } from '@/data/mock-users';
import { format } from 'date-fns';
import { DataTable } from '@/components/DataTable';

interface UsersTableProps {
  users: User[];
}

const UsersTable = ({ users }: UsersTableProps) => {
  const { t } = useTranslation();

  const getStatusVariant = (status: User['status']) => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'Inactive':
        return 'destructive';
      case 'Pending':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <span className="font-medium text-rovida-near-black">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("name")}</span>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("email")}</span>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("role")}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={getStatusVariant(row.getValue("status"))}>
          {row.getValue("status")}
        </Badge>
      ),
    },
    {
      accessorKey: "lastLogin",
      header: "Last Login",
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("lastLogin"), 'MMM dd, yyyy HH:mm')}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: () => (
        <div className="text-right">
          {/* Add action buttons here, e.g., Edit, Deactivate */}
          <span className="text-sm text-rovida-slate-green-gray">Manage</span>
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={users} />
  );
};

export default UsersTable;