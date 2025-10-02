"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
import { PurchaseOrder } from '@/data/mock-purchase-orders';
import { format } from 'date-fns';
import { DataTable } from '@/components/DataTable';

interface PurchaseOrdersTableProps {
  purchaseOrders: PurchaseOrder[];
}

const PurchaseOrdersTable = ({ purchaseOrders }: PurchaseOrdersTableProps) => {
  const { t } = useTranslation();

  const getStatusVariant = (status: PurchaseOrder['status']) => {
    switch (status) {
      case 'Pending':
        return 'secondary';
      case 'Approved':
        return 'default';
      case 'Rejected':
        return 'destructive';
      case 'Ordered':
        return 'default';
      case 'Received':
        return 'outline';
      default:
        return 'default';
    }
  };

  const columns: ColumnDef<PurchaseOrder>[] = [
    {
      accessorKey: "id",
      header: t('id'),
      cell: ({ row }) => <span className="font-medium text-rovida-near-black">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "vendor",
      header: t('vendor'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("vendor")}</span>,
    },
    {
      accessorKey: "itemDescription",
      header: t('item description'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("itemDescription")}</span>,
    },
    {
      accessorKey: "totalAmount",
      header: t('total amount'),
      cell: ({ row }) => <span className="text-rovida-near-black">${row.original.totalAmount.toFixed(2)}</span>,
    },
    {
      accessorKey: "orderDate",
      header: t('order date'),
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("orderDate"), 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: t('status'),
      cell: ({ row }) => (
        <Badge variant={getStatusVariant(row.getValue("status"))}>
          {t(row.getValue("status").toLowerCase())}
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
    <DataTable columns={columns} data={purchaseOrders} />
  );
};

export default PurchaseOrdersTable;