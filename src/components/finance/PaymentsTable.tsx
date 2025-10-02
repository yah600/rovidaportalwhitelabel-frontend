"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
import { Payment } from '@/data/mock-payments';
import { format } from 'date-fns';
import { DataTable } from '@/components/DataTable'; // Import the generic DataTable
import { toast } from 'sonner'; // Import toast for actions
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

interface PaymentsTableProps {
  payments: Payment[];
}

const PaymentsTable = ({ payments }: PaymentsTableProps) => {
  const { t } = useTranslation(['finance', 'common']); // Ensure 'finance' and 'common' namespaces are loaded
  const { canRead } = useAuth();

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

  const handleViewBill = (billId: string) => {
    toast.info(t('view bill action', { ns: 'finance', id: billId })); // Placeholder action with toast
  };

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "id",
      header: t('id', { ns: 'common' }),
      cell: ({ row }) => <span className="font-medium text-rovida-near-black">{row.getValue("id") as string}</span>,
    },
    {
      accessorKey: "billId",
      header: t('bill id', { ns: 'finance' }),
      cell: ({ row }) => (
        canRead('Finance - Bills/Recurring/Deposits') ? (
          <button onClick={() => handleViewBill(row.original.billId)} className="text-primary hover:underline">
            {row.getValue("billId") as string}
          </button>
        ) : (
          <span className="text-rovida-near-black">{row.getValue("billId") as string}</span>
        )
      ),
    },
    {
      accessorKey: "vendor",
      header: t('vendor', { ns: 'finance' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("vendor") as string}</span>,
    },
    {
      accessorKey: "amount",
      header: t('amount', { ns: 'finance' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{(row.original.amount as number).toFixed(2)} {row.original.currency}</span>,
    },
    {
      accessorKey: "method",
      header: t('method', { ns: 'finance' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("method") as string}</span>,
    },
    {
      accessorKey: "status",
      header: t('status', { ns: 'common' }),
      cell: ({ row }) => (
        <Badge variant={getStatusVariant(row.getValue("status") as Payment['status'])}>
          {t((row.getValue("status") as string).toLowerCase(), { ns: 'finance' })}
        </Badge>
      ),
    },
    {
      accessorKey: "paymentDate",
      header: t('payment date', { ns: 'finance' }),
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("paymentDate") as Date, 'MMM dd, yyyy')}
        </span>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={payments} />
  );
};

export default PaymentsTable;