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
      header: t('id'),
      cell: ({ row }) => <span className="font-medium text-rovida-near-black">{row.getValue("id") as string}</span>,
    },
    {
      accessorKey: "name",
      header: t('name'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("name") as string}</span>,
    },
    {
      accessorKey: "email",
      header: t('email'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("email") as string}</span>,
    },
    {
      accessorKey: "role",
      header: t('role'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("role") as string}</span>,
    },
    {
      accessorKey: "status",
      header: t('status'),
      cell: ({ row }) => (
        <Badge variant={getStatusVariant(row.getValue("status") as User['status'])}>
          {t((row.getValue("status") as string).toLowerCase())}
        </Badge>
      ),
    },
    {
      accessorKey: "lastLogin",
      header: t('last login'),
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("lastLogin") as Date, 'MMM dd, yyyy HH:mm')}
        </span>
      ),
    },
    {
      id: "actions",
      header: t('actions'),
      enableSorting: false,
      cell: () => (
        <div className="text-right">
          {/* Add action buttons here, e.g., Edit, Deactivate */}
          <span className="text-sm text-rovida-slate-green-gray">{t('manage')}</span>
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={users} />
  );
};

export default UsersTable;