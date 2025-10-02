"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
import { PortfolioProperty } from '@/data/mock-portfolio';
import { format } from 'date-fns';
import { DataTable } from '@/components/DataTable';

interface PortfolioTableProps {
  properties: PortfolioProperty[];
}

const PortfolioTable = ({ properties }: PortfolioTableProps) => {
  const { t } = useTranslation();

  const columns: ColumnDef<PortfolioProperty>[] = [
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
      accessorKey: "propertyType",
      header: t('property type'),
      cell: ({ row }) => <span className="text-rovida-near-black">{t(row.getValue("propertyType").toLowerCase().replace(/ /g, ''))}</span>,
    },
    {
      accessorKey: "unitsCount",
      header: t('units'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("unitsCount")}</span>,
    },
    {
      accessorKey: "occupancyRate",
      header: t('occupancy rate'),
      cell: ({ row }) => <span className="text-rovida-near-black">{(row.getValue("occupancyRate") * 100).toFixed(0)}%</span>,
    },
    {
      accessorKey: "value",
      header: t('value'),
      cell: ({ row }) => <span className="text-rovida-near-black">${row.original.value.toLocaleString()}</span>,
    },
    {
      id: "actions",
      header: t('actions'),
      enableSorting: false,
      cell: () => (
        <div className="text-right">
          <span className="text-sm text-rovida-slate-green-gray">{t('view')} / {t('edit')}</span>
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={properties} />
  );
};

export default PortfolioTable;