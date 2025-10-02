"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
import { Asset } from '@/data/mock-assets';
import { format } from 'date-fns';
import { DataTable } from '@/components/DataTable'; // Import the generic DataTable
import { toast } from 'sonner'; // Import toast for actions

interface AssetsTableProps {
  assets: Asset[];
}

const AssetsTable = ({ assets }: AssetsTableProps) => {
  const { t } = useTranslation(['maintenance', 'common']); // Specify namespaces

  const getStatusVariant = (status: Asset['status']) => {
    switch (status) {
      case 'Operational':
        return 'default';
      case 'Under Maintenance':
        return 'secondary';
      case 'Retired':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const handleManageAsset = (assetId: string) => {
    toast.info(t('manage asset action', { ns: 'maintenance', id: assetId })); // Placeholder action with toast
  };

  const columns: ColumnDef<Asset>[] = [
    {
      accessorKey: "id",
      header: t('id', { ns: 'common' }),
      cell: ({ row }) => <span className="font-medium text-rovida-near-black">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "name",
      header: t('name', { ns: 'common' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("name")}</span>,
    },
    {
      accessorKey: "type",
      header: t('type', { ns: 'common' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{t(row.getValue("type").toLowerCase().replace(/ /g, ''), { ns: 'maintenance' })}</span>,
    },
    {
      accessorKey: "location",
      header: t('location', { ns: 'common' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("location")}</span>,
    },
    {
      accessorKey: "status",
      header: t('status', { ns: 'common' }),
      cell: ({ row }) => (
        <Badge variant={getStatusVariant(row.getValue("status"))}>
          {t(row.getValue("status").toLowerCase().replace(/ /g, ''), { ns: 'maintenance' })}
        </Badge>
      ),
    },
    {
      accessorKey: "lastMaintenance",
      header: t('last maintenance', { ns: 'maintenance' }),
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("lastMaintenance"), 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      accessorKey: "nextMaintenance",
      header: t('next maintenance', { ns: 'maintenance' }),
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("nextMaintenance"), 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      id: "actions",
      header: t('actions', { ns: 'common' }),
      enableSorting: false,
      cell: ({ row }) => (
        <div className="text-right">
          {/* Add action buttons here, e.g., Edit, View Units */}
          <button onClick={() => handleManageAsset(row.original.id)} className="text-sm text-rovida-slate-green-gray hover:underline">
            {t('manage', { ns: 'common' })}
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={assets} />
  );
};

export default AssetsTable;