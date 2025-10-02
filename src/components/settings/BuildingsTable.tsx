"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { Building } from '@/data/mock-buildings';
import { DataTable } from '@/components/DataTable';

interface BuildingsTableProps {
  buildings: Building[];
}

const BuildingsTable = ({ buildings }: BuildingsTableProps) => {
  const { t } = useTranslation();

  const columns: ColumnDef<Building>[] = [
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
      accessorKey: "address",
      header: t('address'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("address")}</span>,
    },
    {
      accessorKey: "unitsCount",
      header: t('units'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("unitsCount")}</span>,
    },
    {
      accessorKey: "yearBuilt",
      header: t('year built'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("yearBuilt")}</span>,
    },
    {
      accessorKey: "propertyManager",
      header: t('property manager'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("propertyManager")}</span>,
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
    <DataTable columns={columns} data={buildings} />
  );
};

export default BuildingsTable;