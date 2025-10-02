"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
import { VisitorLog } from '@/data/mock-visitor-logs';
import { format } from 'date-fns';
import { DataTable } from '@/components/DataTable';

interface VisitorLogsTableProps {
  logs: VisitorLog[];
}

const VisitorLogsTable = ({ logs }: VisitorLogsTableProps) => {
  const { t } = useTranslation();

  const getStatusVariant = (status: VisitorLog['status']) => {
    switch (status) {
      case 'Checked In':
        return 'default';
      case 'Checked Out':
        return 'outline';
      case 'Expected':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const columns: ColumnDef<VisitorLog>[] = [
    {
      accessorKey: "id",
      header: t('id'),
      cell: ({ row }) => <span className="font-medium text-rovida-near-black">{row.getValue("id") as string}</span>,
    },
    {
      accessorKey: "visitorName",
      header: t('visitor name'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("visitorName") as string}</span>,
    },
    {
      accessorKey: "unitVisited",
      header: t('unit visited'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("unitVisited") as string}</span>,
    },
    {
      accessorKey: "purpose",
      header: t('purpose'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("purpose") as string}</span>,
    },
    {
      accessorKey: "checkInTime",
      header: t('check in time'),
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("checkInTime") as Date, 'MMM dd, yyyy HH:mm')}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: t('status'),
      cell: ({ row }) => (
        <Badge variant={getStatusVariant(row.getValue("status") as VisitorLog['status'])}>
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
          <span className="text-sm text-rovida-slate-green-gray">{t('view')} / {t('manage')}</span>
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={logs} />
  );
};

export default VisitorLogsTable;