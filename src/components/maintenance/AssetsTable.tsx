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
      header: "ID",
      cell: ({ row }) => <span className="font-medium text-rovida-near-black">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("name")}</span>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("type")}</span>,
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("location")}</span>,
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
      accessorKey: "lastMaintenance",
      header: "Last Maintenance",
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("lastMaintenance"), 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      accessorKey: "nextMaintenance",
      header: "Next Maintenance",
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("nextMaintenance"), 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: () => (
        <div className="text-right">
          <span className="text-sm text-rovida-slate-green-gray">Manage</span>
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={assets} />
  );
};

export default AssetsTable;