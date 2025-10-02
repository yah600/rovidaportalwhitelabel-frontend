"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
import { Vote } from '@/data/mock-votes';
import { format } from 'date-fns';
import { DataTable } from '@/components/DataTable'; // Import the generic DataTable

interface VotesTableProps {
  votes: Vote[];
}

const VotesTable = ({ votes }: VotesTableProps) => {
  const { t } = useTranslation();

  const getStatusVariant = (status: Vote['status']) => {
    switch (status) {
      case 'Open':
        return 'default';
      case 'Closed':
        return 'outline';
      case 'Pending':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const columns: ColumnDef<Vote>[] = [
    {
      accessorKey: "id",
      header: t('id'),
      cell: ({ row }) => (
        <Link to={`/board/votes/${row.original.id}`} className="text-primary hover:underline">
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
      accessorKey: "status",
      header: t('status'),
      cell: ({ row }) => (
        <Badge variant={getStatusVariant(row.getValue("status") as Vote['status'])}>
          {t((row.getValue("status") as string).toLowerCase())}
        </Badge>
      ),
    },
    {
      accessorKey: "dueDate",
      header: t('due date'),
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("dueDate") as Date, 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      id: "actions",
      header: t('actions'),
      enableSorting: false,
      cell: ({ row }) => (
        <div className="text-right">
          <Link to={`/board/votes/${row.original.id}`} className="text-sm text-rovida-slate-green-gray hover:underline">
            {t('view')}
          </Link>
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={votes} />
  );
};

export default VotesTable;