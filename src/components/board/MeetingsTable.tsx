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
      header: "ID",
      cell: ({ row }) => (
        <Link to={`/board/meetings/${row.original.id}`} className="text-primary hover:underline">
          {row.getValue("id")}
        </Link>
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("title")}</span>,
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("date"), 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      accessorKey: "time",
      header: "Time",
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("time")}</span>,
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
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="text-right">
          <Link to={`/board/meetings/${row.original.id}`} className="text-sm text-rovida-slate-green-gray hover:underline">
            View
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