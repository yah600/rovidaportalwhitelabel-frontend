"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
import { Payment } from '@/data/mock-payments';
import { format } from 'date-fns';
import { DataTable } from '@/components/DataTable'; // Import the generic DataTable

interface PaymentsTableProps {
  payments: Payment[];
}

const PaymentsTable = ({ payments }: PaymentsTableProps) => {
  const { t } = useTranslation();

  const getStatusVariant = (status: Payment['status']) => {
    switch (status) {
      case 'Completed':
        return 'default';
      case 'Failed':
        return 'destructive';
      case 'Refunded':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <span className="font-medium text-rovida-near-black">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "billId",
      header: "Bill ID",
      cell: ({ row }) => (
        <Link to={`/finance/bills/${row.original.billId}`} className="text-primary hover:underline">
          {row.getValue("billId")}
        </Link>
      ),
    },
    {
      accessorKey: "vendor",
      header: "Vendor",
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("vendor")}</span>,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => <span className="text-rovida-near-black">{row.original.amount.toFixed(2)} {row.original.currency}</span>,
    },
    {
      accessorKey: "method",
      header: "Method",
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("method")}</span>,
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
      accessorKey: "paymentDate",
      header: "Payment Date",
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("paymentDate"), 'MMM dd, yyyy')}
        </span>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={payments} />
  );
};

export default PaymentsTable;