"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
import { PurchaseOrder } from '@/data/mock-purchase-orders';
import { format } from 'date-fns';
import { DataTable } from '@/components/DataTable';
import { toast } from 'sonner'; // Import toast for actions
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

interface PurchaseOrdersTableProps {
  purchaseOrders: PurchaseOrder[];
}

const PurchaseOrdersTable = ({ purchaseOrders }: PurchaseOrdersTableProps) => {
  const { t } = useTranslation(['finance', 'common']); // Ensure 'finance' and 'common' namespaces are loaded
  const { canRead } = useAuth();

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

  const handleViewManagePurchaseOrder = (purchaseOrderId: string) => {
    toast.info(t('view manage purchase order action', { ns: 'finance', id: purchaseOrderId })); // Placeholder action with toast
  };

  const columns: ColumnDef<PurchaseOrder>[] = [
    {
      accessorKey: "id",
      header: t('id', { ns: 'common' }),
      cell: ({ row }) => <span className="font-medium text-rovida-near-black">{row.getValue("id") as string}</span>,
    },
    {
      accessorKey: "vendor",
      header: t('vendor', { ns: 'finance' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("vendor") as string}</span>,
    },
    {
      accessorKey: "itemDescription",
      header: t('item description', { ns: 'finance' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("itemDescription") as string}</span>,
    },
    {
      accessorKey: "totalAmount",
      header: t('total amount', { ns: 'finance' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{(row.original.totalAmount as number).toFixed(2)}</span>,
    },
    {
      accessorKey: "orderDate",
      header: t('order date', { ns: 'finance' }),
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("orderDate") as Date, 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: t('status', { ns: 'common' }),
      cell: ({ row }) => (
        <Badge variant={getStatusVariant(row.getValue("status") as PurchaseOrder['status'])}>
          {t((row.getValue("status") as string).toLowerCase(), { ns: 'finance' })}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: t('actions', { ns: 'common' }),
      enableSorting: false,
      cell: ({ row }) => (
        <div className="text-right">
          {canRead('Finance') && (
            <button onClick={() => handleViewManagePurchaseOrder(row.original.id)} className="text-sm text-rovida-slate-green-gray hover:underline">
              {t('view', { ns: 'common' })} / {t('manage', { ns: 'common' })}
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={purchaseOrders} />
  );
};

export default PurchaseOrdersTable;