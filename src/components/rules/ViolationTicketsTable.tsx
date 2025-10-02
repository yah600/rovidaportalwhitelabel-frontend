"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
import { ViolationTicket } from '@/data/mock-violations';
import { format } from 'date-fns';
import { DataTable } from '@/components/DataTable';
import { Link } from 'react-router-dom';

interface ViolationTicketsTableProps {
  tickets: ViolationTicket[];
}

const ViolationTicketsTable = ({ tickets }: ViolationTicketsTableProps) => {
  const { t } = useTranslation(['rules', 'common', 'finance']);

  const getStatusVariant = (status: ViolationTicket['status']) => {
    switch (status) {
      case 'Open':
        return 'destructive';
      case 'Closed':
        return 'outline';
      case 'Appealed':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const columns: ColumnDef<ViolationTicket>[] = [
    {
      accessorKey: "id",
      header: t('id', { ns: 'common' }),
      cell: ({ row }) => (
        <Link to={`/rules/violations/${row.original.id}`} className="text-primary hover:underline">
          {row.getValue("id") as string}
        </Link>
      ),
    },
    {
      accessorKey: "ruleTitle",
      header: t('rule', { ns: 'rules' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("ruleTitle") as string}</span>,
    },
    {
      accessorKey: "unitNumber",
      header: t('unit', { ns: 'common' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("unitNumber") as string}</span>,
    },
    {
      accessorKey: "residentName",
      header: t('resident name', { ns: 'rules' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("residentName") as string}</span>,
    },
    {
      accessorKey: "issuedAt",
      header: t('issued at', { ns: 'rules' }),
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("issuedAt") as Date, 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      accessorKey: "fineAmount",
      header: t('fine amount', { ns: 'rules' }),
      cell: ({ row }) => (
        <span className="font-roboto-mono text-rovida-near-black">
          {row.original.fineAmount ? `$${row.original.fineAmount.toFixed(2)}` : '-'}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: t('status', { ns: 'common' }),
      cell: ({ row }) => (
        <Badge variant={getStatusVariant(row.getValue("status") as ViolationTicket['status'])}>
          {t((row.getValue("status") as string).toLowerCase(), { ns: 'rules' })}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: t('actions', { ns: 'common' }),
      enableSorting: false,
      cell: ({ row }) => (
        <div className="text-right">
          <Link to={`/rules/violations/${row.original.id}`} className="text-sm text-rovida-slate-green-gray hover:underline">
            {t('view', { ns: 'common' })} / {t('manage', { ns: 'common' })}
          </Link>
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={tickets} />
  );
};

export default ViolationTicketsTable;