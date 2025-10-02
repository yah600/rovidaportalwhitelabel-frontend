"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
import { Bill } from '@/data/mock-bills';
import { format } from 'date-fns';
import { DataTable } from '@/components/DataTable'; // Import the generic DataTable
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

interface BillsTableProps {
  bills: Bill[];
}

const BillsTable = ({ bills }: BillsTableProps) => {
  const { t } = useTranslation(['finance', 'common']); // Ensure 'finance' and 'common' namespaces are loaded
  const { canRead } = useAuth();

  const getStatusVariant = (status: Bill['status']) => {
    switch (status) {
      case 'Paid':
        return 'outline';
      case 'Due':
        return 'default';
      case 'Overdue':
        return 'destructive';
      case 'Pending Approval':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getBillTypeBadge = (type: Bill['type']) => {
    switch (type) {
      case 'bill':
        return <Badge variant="secondary" className="bg-rovida-soft-gray text-rovida-near-black">{t('bill', { ns: 'finance' })}</Badge>;
      case 'deposit':
        return <Badge variant="default" className="bg-rovida-success text-white">{t('deposit', { ns: 'finance' })}</Badge>;
      case 'recurring':
        return <Badge variant="default" className="bg-rovida-gold text-white">{t('recurring', { ns: 'finance' })}</Badge>;
      default:
        return <Badge variant="outline">{t('unknown', { ns: 'common' })}</Badge>;
    }
  };

  const columns: ColumnDef<Bill>[] = [
    {
      accessorKey: "id",
      header: t('id', { ns: 'common' }),
      cell: ({ row }) => (
        <Link to={`/finance/bills/${row.original.id}`} className="text-primary hover:underline">
          {row.getValue("id") as string}
        </Link>
      ),
    },
    {
      accessorKey: "vendor",
      header: t('vendor', { ns: 'finance' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("vendor") as string}</span>,
    },
    {
      accessorKey: "description",
      header: t('description', { ns: 'common' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("description") as string}</span>,
    },
    {
      accessorKey: "amount",
      header: t('amount', { ns: 'finance' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{(row.original.amount as number).toFixed(2)} {row.original.currency}</span>,
    },
    {
      accessorKey: "type",
      header: t('type', { ns: 'common' }),
      cell: ({ row }) => getBillTypeBadge(row.getValue("type") as Bill['type']),
    },
    {
      accessorKey: "status",
      header: t('status', { ns: 'common' }),
      cell: ({ row }) => (
        <Badge variant={getStatusVariant(row.getValue("status") as Bill['status'])}>
          {t((row.getValue("status") as string).toLowerCase(), { ns: 'finance' })}
        </Badge>
      ),
    },
    {
      accessorKey: "dueDate",
      header: t('due date', { ns: 'finance' }),
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("dueDate") as Date, 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      id: "actions",
      header: t('actions', { ns: 'common' }),
      enableSorting: false,
      cell: ({ row }) => (
        <div className="text-right">
          {canRead('Finance - Bills/Recurring/Deposits') && (
            <Link to={`/finance/bills/${row.original.id}`} className="text-sm text-rovida-slate-green-gray hover:underline">
              {t('view', { ns: 'common' })}
            </Link>
          )}
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={bills} />
  );
};

export default BillsTable;