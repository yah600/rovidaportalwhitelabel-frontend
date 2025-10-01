"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
import { Bill } from '@/data/mock-bills';
import { format } from 'date-fns';
import { DataTable } from '@/components/DataTable'; // Import the generic DataTable

interface BillsTableProps {
  bills: Bill[];
}

const BillsTable = ({ bills }: BillsTableProps) => {
  const { t } = useTranslation();

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

  const columns: ColumnDef<Bill>[] = [
    {
      accessorKey: "id",
      header: t('id'),
      cell: ({ row }) => (
        <Link to={`/finance/bills/${row.original.id}`} className="text-primary hover:underline">
          {row.getValue("id")}
        </Link>
      ),
    },
    {
      accessorKey: "vendor",
      header: t('vendor'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("vendor")}</span>,
    },
    {
      accessorKey: "description",
      header: t('description'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("description")}</span>,
    },
    {
      accessorKey: "amount",
      header: t('amount'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.original.amount.toFixed(2)} {row.original.currency}</span>,
    },
    {
      accessorKey: "status",
      header: t('status'),
      cell: ({ row }) => (
        <Badge variant={getStatusVariant(row.getValue("status"))}>
          {row.getValue("status")}
        </Badge>
      ),
    },
    {
      accessorKey: "dueDate",
      header: t('due_date'),
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("dueDate"), 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      id: "actions",
      header: t('actions'),
      enableSorting: false,
      cell: ({ row }) => (
        <div className="text-right">
          <Link to={`/finance/bills/${row.original.id}`} className="text-sm text-rovida-slate-green-gray hover:underline">
            {t('view')}
          </Link>
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={bills} />
  );
};

export default BillsTable;