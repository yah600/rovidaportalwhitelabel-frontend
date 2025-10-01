"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Announcement } from '@/data/mock-announcements';
import { format } from 'date-fns';
import { DataTable } from '@/components/DataTable'; // Import the generic DataTable

interface AnnouncementsTableProps {
  announcements: Announcement[];
}

const AnnouncementsTable = ({ announcements }: AnnouncementsTableProps) => {
  const { t } = useTranslation();

  const getStatusVariant = (status: Announcement['status']) => {
    switch (status) {
      case 'Published':
        return 'default';
      case 'Draft':
        return 'secondary';
      case 'Archived':
        return 'outline';
      default:
        return 'default';
    }
  };

  const columns: ColumnDef<Announcement>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <Link to={`/comms/announcements/${row.original.id}`} className="text-primary hover:underline">
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
      accessorKey: "author",
      header: "Author",
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("author")}</span>,
    },
    {
      accessorKey: "targetAudience",
      header: "Audience",
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("targetAudience")}</span>,
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
      accessorKey: "publishedAt",
      header: "Published At",
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("publishedAt"), 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      accessorKey: "expiresAt",
      header: "Expires At",
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {row.original.expiresAt ? format(row.original.expiresAt, 'MMM dd, yyyy') : 'N/A'}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="text-right">
          <Link to={`/comms/announcements/${row.original.id}`} className="text-sm text-rovida-slate-green-gray hover:underline">
            View
          </Link>
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={announcements} />
  );
};

export default AnnouncementsTable;