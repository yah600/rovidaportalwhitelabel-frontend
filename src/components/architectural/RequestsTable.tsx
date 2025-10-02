"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
import { ArchitecturalRequest } from '@/data/mock-architectural-requests';
import { format } from 'date-fns';
import { DataTable } from '@/components/DataTable';

interface RequestsTableProps {
  requests: ArchitecturalRequest[];
}

const RequestsTable = ({ requests }: RequestsTableProps) => {
  const { t } = useTranslation();

  const getStatusVariant = (status: ArchitecturalRequest['status']) => {
    switch (status) {
      case 'Pending Review':
        return 'secondary';
      case 'Approved':
        return 'default';
      case 'Rejected':
        return 'destructive';
      case 'In Progress':
        return 'default';
      default:
        return 'default';
    }
  };

  const columns: ColumnDef<ArchitecturalRequest>[] = [
    {
      accessorKey: "id",
      header: t('id'),
      cell: ({ row }) => <span className="font-medium text-rovida-near-black">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "title",
      header: t('title'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("title")}</span>,
    },
    {
      accessorKey: "unit",
      header: t('unit'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("unit")}</span>,
    },
    {
      accessorKey: "requester",
      header: t('requester'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("requester")}</span>,
    },
    {
      accessorKey: "submittedAt",
      header: t('submitted at'),
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("submittedAt"), 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: t('status'),
      cell: ({ row }) => (
        <Badge variant={getStatusVariant(row.getValue("status"))}>
          {t(row.getValue("status").toLowerCase().replace(/ /g, ''))}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: t('actions'),
      enableSorting: false,
      cell: () => (
        <div className="text-right">
          <span className="text-sm text-rovida-slate-green-gray">{t('view')} / {t('manage')}</span>
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={requests} />
  );
};

export default RequestsTable;