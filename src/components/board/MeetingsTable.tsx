"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
import { Meeting } from '@/data/mock-meetings';
import { format } from 'date-fns';
import { DataTable } from '@/components/DataTable'; // Import the generic DataTable

interface MeetingsTableProps {
  meetings: Meeting[];
}

const MeetingsTable = ({ meetings }: MeetingsTableProps) => {
  const { t } = useTranslation();

  const getStatusVariant = (status: Meeting['status']) => {
    switch (status) {
      case 'Scheduled':
        return 'default';
      case 'Completed':
        return 'outline';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const columns: ColumnDef<Meeting>[] = [
    {
      accessorKey: "id",
      header: t('id'),
      cell: ({ row }) => (
        <Link to={`/board/meetings/${row.original.id}`} className="text-primary hover:underline">
          {row.getValue("id") as string}
        </Link>
      ),
    },
    {
      accessorKey: "title",
      header: t('title'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("title") as string}</span>,
    },
    {
      accessorKey: "date",
      header: t('date'),
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("date") as Date, 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      accessorKey: "time",
      header: t('time'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("time") as string}</span>,
    },
    {
      accessorKey: "location",
      header: t('location'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("location") as string}</span>,
    },
    {
      accessorKey: "status",
      header: t('status'),
      cell: ({ row }) => (
        <Badge variant={getStatusVariant(row.getValue("status") as Meeting['status'])}>
          {t((row.getValue("status") as string).toLowerCase())}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: t('actions'),
      enableSorting: false,
      cell: ({ row }) => (
        <div className="text-right">
          <Link to={`/board/meetings/${row.original.id}`} className="text-sm text-rovida-slate-green-gray hover:underline">
            {t('view')}
          </Link>
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={meetings} />
  );
};

export default MeetingsTable;