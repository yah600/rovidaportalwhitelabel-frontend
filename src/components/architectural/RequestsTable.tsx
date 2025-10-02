"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
import { ArchitecturalRequest } from '@/data/mock-architectural-requests';
import { format } from 'date-fns';
import { DataTable } from '@/components/DataTable';
import { toast } from 'sonner'; // Import toast for actions

interface RequestsTableProps {
  requests: ArchitecturalRequest[];
}

const RequestsTable = ({ requests }: RequestsTableProps) => {
  const { t } = useTranslation(['architectural_requests', 'common']); // Ensure 'architectural_requests' and 'common' namespaces are loaded

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

  const handleViewManageRequest = (requestId: string) => {
    toast.info(t('view manage request action', { ns: 'architectural_requests', id: requestId })); // Placeholder action with toast
  };

  const columns: ColumnDef<ArchitecturalRequest>[] = [
    {
      accessorKey: "id",
      header: t('id', { ns: 'common' }),
      cell: ({ row }) => <span className="font-medium text-rovida-near-black">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "title",
      header: t('title', { ns: 'common' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("title")}</span>,
    },
    {
      accessorKey: "unit",
      header: t('unit', { ns: 'common' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("unit")}</span>,
    },
    {
      accessorKey: "requester",
      header: t('requester', { ns: 'architectural_requests' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("requester")}</span>,
    },
    {
      accessorKey: "submittedAt",
      header: t('submitted at', { ns: 'architectural_requests' }),
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("submittedAt"), 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: t('status', { ns: 'common' }),
      cell: ({ row }) => (
        <Badge variant={getStatusVariant(row.getValue("status"))}>
          {t(row.getValue("status").toLowerCase().replace(/ /g, ''), { ns: 'architectural_requests' })}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: t('actions', { ns: 'common' }),
      enableSorting: false,
      cell: ({ row }) => (
        <div className="text-right">
          <button onClick={() => handleViewManageRequest(row.original.id)} className="text-sm text-rovida-slate-green-gray hover:underline">
            {t('view', { ns: 'common' })} / {t('manage', { ns: 'common' })}
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={requests} />
  );
};

export default RequestsTable;