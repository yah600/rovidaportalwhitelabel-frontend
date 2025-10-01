"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
import { Unit } from '@/data/mock-units';
import { DataTable } from '@/components/DataTable';

interface UnitsTableProps {
  units: Unit[];
}

const UnitsTable = ({ units }: UnitsTableProps) => {
  const { t } = useTranslation();

  const getStatusVariant = (status: Unit['status']) => {
    switch (status) {
      case 'Occupied':
        return 'default';
      case 'Vacant':
        return 'secondary';
      case 'Under Renovation':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const columns: ColumnDef<Unit>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <span className="font-medium text-rovida-near-black">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "unitNumber",
      header: "Unit Number",
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("unitNumber")}</span>,
    },
    {
      accessorKey: "buildingName",
      header: "Building",
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("buildingName")}</span>,
    },
    {
      accessorKey: "owner",
      header: "Owner",
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("owner")}</span>,
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
      accessorKey: "bedrooms",
      header: "Bedrooms",
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("bedrooms")}</span>,
    },
    {
      accessorKey: "bathrooms",
      header: "Bathrooms",
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("bathrooms")}</span>,
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: () => (
        <div className="text-right">
          {/* Add action buttons here, e.g., Edit, View Details */}
          <span className="text-sm text-rovida-slate-green-gray">Manage</span>
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={units} />
  );
};

export default UnitsTable;