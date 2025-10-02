"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
import { Lease } from '@/data/mock-leases'; // Import Lease interface
import { format } from 'date-fns';
import { DataTable } from '@/components/DataTable';

interface LeasesTableProps {
  leases: Lease[];
}

const LeasesTable = ({ leases }: LeasesTableProps) => {
  const { t } = useTranslation();

  const getStatusVariant = (status: Lease['status']) => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'Expired':
        return 'destructive';
      case 'Pending Renewal':
        return 'secondary';
      case 'Terminated':
        return 'outline';
      default:
        return 'default';
    }
  };

  const columns: ColumnDef<Lease>[] = [
    {
      accessorKey: "id",
      header: t('id'),
      cell: ({ row }) => <span className="font-medium text-rovida-near-black">{row.getValue("id") as string}</span>,
    },
    {
      accessorKey: "unitNumber",
      header: t('unit number'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("unitNumber") as string}</span>,
    },
    {
      accessorKey: "tenantName",
      header: t('tenant name'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("tenantName") as string}</span>,
    },
    {
      accessorKey: "startDate",
      header: t('start date'),
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("startDate") as Date, 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      accessorKey: "endDate",
      header: t('end date'),
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("endDate") as Date, 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      accessorKey: "rentAmount",
      header: t('rent amount'),
      cell: ({ row }) => <span className="text-rovida-near-black">${(row.original.rentAmount as number).toFixed(2)}</span>,
    },
    {
      accessorKey: "status",
      header: t('status'),
      cell: ({ row }) => (
        <Badge variant={getStatusVariant(row.getValue("status") as Lease['status'])}>
          {t((row.getValue("status") as string).toLowerCase())}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: t('actions'),
      enableSorting: false,
      cell: () => (
        <div className="text-right">
          <span className="text-sm text-rovida-slate-green-gray">{t('view')} / {t('edit')}</span>
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={leases} />
  );
};

export default LeasesTable;