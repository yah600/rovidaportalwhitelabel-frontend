"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
import { Amenity } from '@/data/mock-amenities';
import { DataTable } from '@/components/DataTable';

interface AmenitiesTableProps {
  amenities: Amenity[];
}

const AmenitiesTable = ({ amenities }: AmenitiesTableProps) => {
  const { t } = useTranslation();

  const getStatusVariant = (status: Amenity['status']) => {
    switch (status) {
      case 'Available':
        return 'default';
      case 'Under Maintenance':
        return 'secondary';
      case 'Closed':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const columns: ColumnDef<Amenity>[] = [
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
      cell: ({ row }) => <span className="text-rovida-near-black">{t(row.getValue("type").toLowerCase().replace(/ /g, '_'))}</span>,
    },
    {
      accessorKey: "location",
      header: t('location'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("location")}</span>,
    },
    {
      accessorKey: "bookingRequired",
      header: t('booking_required'),
      cell: ({ row }) => (
        <Badge variant={row.getValue("bookingRequired") ? 'default' : 'outline'}>
          {row.getValue("bookingRequired") ? t('yes') : t('no')}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: t('status'),
      cell: ({ row }) => (
        <Badge variant={getStatusVariant(row.getValue("status"))}>
          {t(row.getValue("status").toLowerCase().replace(/ /g, '_'))}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: t('actions'),
      enableSorting: false,
      cell: () => (
        <div className="text-right">
          <span className="text-sm text-rovida-slate-green-gray">{t('view')} / {t('book')}</span>
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={amenities} />
  );
};

export default AmenitiesTable;