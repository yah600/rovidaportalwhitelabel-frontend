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
      header: "ID",
      cell: ({ row }) => <span className="font-medium text-rovida-near-black">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("name")}</span>,
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("address")}</span>,
    },
    {
      accessorKey: "unitsCount",
      header: "Units",
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("unitsCount")}</span>,
    },
    {
      accessorKey: "yearBuilt",
      header: "Year Built",
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("yearBuilt")}</span>,
    },
    {
      accessorKey: "propertyManager",
      header: "Property Manager",
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("propertyManager")}</span>,
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: () => (
        <div className="text-right">
          {/* Add action buttons here, e.g., Edit, View Units */}
          <span className="text-sm text-rovida-slate-green-gray">Manage</span>
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={buildings} />
  );
};

export default BuildingsTable;