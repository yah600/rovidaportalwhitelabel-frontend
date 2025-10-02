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
      header: t('id'),
      cell: ({ row }) => <span className="font-medium text-rovida-near-black">{row.getValue("id") as string}</span>,
    },
    {
      accessorKey: "unitNumber",
      header: t('unit number'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("unitNumber") as string}</span>,
    },
    {
      accessorKey: "buildingName",
      header: t('building'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("buildingName") as string}</span>,
    },
    {
      accessorKey: "owner",
      header: t('owner'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("owner") as string}</span>,
    },
    {
      accessorKey: "status",
      header: t('status'),
      cell: ({ row }) => (
        <Badge variant={getStatusVariant(row.getValue("status") as Unit['status'])}>
          {t((row.getValue("status") as string).toLowerCase())}
        </Badge>
      ),
    },
    {
      accessorKey: "bedrooms",
      header: t('bedrooms'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("bedrooms") as number}</span>,
    },
    {
      accessorKey: "bathrooms",
      header: t('bathrooms'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("bathrooms") as number}</span>,
    },
    {
      id: "actions",
      header: t('actions'),
      enableSorting: false,
      cell: () => (
        <div className="text-right">
          {/* Add action buttons here, e.g., Edit, View Details */}
          <span className="text-sm text-rovida-slate-green-gray">{t('manage')}</span>
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={units} />
  );
};

export default UnitsTable;