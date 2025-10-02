"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
import { Asset } from '@/data/mock-assets';
import { format } from 'date-fns';
import { DataTable } from '@/components/DataTable'; // Import the generic DataTable

interface AssetsTableProps {
  assets: Asset[];
}

const AssetsTable = ({ assets }: AssetsTableProps) => {
  const { t } = useTranslation();

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

  const columns: ColumnDef<Asset>[] = [
    {
      accessorKey: "id",
      header: t('id'),
      cell: ({ row }) => <span className="font-medium text-rovida-near-black">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "name",
      header: t('name'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("name")}</span>,
    },
    {
      accessorKey: "type",
      header: t('type'),
      cell: ({ row }) => <span className="text-rovida-near-black">{t(row.getValue("type").toLowerCase().replace(/ /g, ''))}</span>,
    },
    {
      accessorKey: "location",
      header: t('location'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("location")}</span>,
    },
    {
      accessorKey: "status",
      header: t('status'),
      cell: ({ row }) => (
        <Badge variant={getStatusVariant(row.getValue("status"))}>
          {t(row.getValue("status").toLowerCase().replace(/ /g, ''))}
        </Badge>
      ),
    },
    {
      accessorKey: "lastMaintenance",
      header: t('last maintenance'),
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("lastMaintenance"), 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      accessorKey: "nextMaintenance",
      header: t('next maintenance'),
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("nextMaintenance"), 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      id: "actions",
      header: t('actions'),
      enableSorting: false,
      cell: () => (
        <div className="text-right">
          {/* Add action buttons here, e.g., Edit, View Units */}
          <span className="text-sm text-rovida-slate-green-gray">{t('manage')}</span>
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={assets} />
  );
};

export default AssetsTable;