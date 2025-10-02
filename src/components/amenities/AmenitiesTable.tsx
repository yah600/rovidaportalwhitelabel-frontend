"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
import { Amenity } from '@/data/mock-amenities';
import { DataTable } from '@/components/DataTable';
import { toast } from 'sonner'; // Import toast for actions

interface AmenitiesTableProps {
  amenities: Amenity[];
}

const AmenitiesTable = ({ amenities }: AmenitiesTableProps) => {
  const { t } = useTranslation(['amenities', 'common']); // Ensure 'amenities' and 'common' namespaces are loaded

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

  const handleViewBookAmenity = (amenityName: string) => {
    toast.info(t('view book amenity action', { ns: 'amenities', amenity: amenityName })); // Placeholder action with toast
  };

  const columns: ColumnDef<Amenity>[] = [
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
      cell: ({ row }) => <span className="text-rovida-near-black">{t(row.getValue("type").toLowerCase(), { ns: 'amenities' })}</span>,
    },
    {
      accessorKey: "location",
      header: t('location', { ns: 'common' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("location")}</span>,
    },
    {
      accessorKey: "bookingRequired",
      header: t('booking required', { ns: 'amenities' }),
      cell: ({ row }) => (
        <Badge variant={row.getValue("bookingRequired") ? 'default' : 'outline'}>
          {row.getValue("bookingRequired") ? t('yes', { ns: 'common' }) : t('no', { ns: 'common' })}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: t('status', { ns: 'common' }),
      cell: ({ row }) => (
        <Badge variant={getStatusVariant(row.getValue("status"))}>
          {t(row.getValue("status").toLowerCase(), { ns: 'amenities' })}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: t('actions', { ns: 'common' }),
      enableSorting: false,
      cell: ({ row }) => (
        <div className="text-right">
          <button onClick={() => handleViewBookAmenity(row.original.name)} className="text-sm text-rovida-slate-green-gray hover:underline">
            {t('view', { ns: 'common' })} / {t('book', { ns: 'common' })}
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={amenities} />
  );
};

export default AmenitiesTable;