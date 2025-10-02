"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
import { InboxDocument } from '@/data/mock-inbox-documents';
import { format } from 'date-fns';
import { Mail, FileText, FileQuestion, Scan } from 'lucide-react';
import { DataTable } from '@/components/DataTable'; // Import the generic DataTable

interface InboxTableProps {
  documents: InboxDocument[];
}

const InboxTable = ({ documents }: InboxTableProps) => {
  const { t } = useTranslation();

  const getStatusVariant = (status: InboxDocument['status']) => {
    switch (status) {
      case 'New':
        return 'default';
      case 'Action Required':
        return 'destructive';
      case 'Reviewed':
        return 'outline';
      case 'Archived':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getFileTypeIcon = (type: InboxDocument['type']) => {
    switch (type) {
      case 'PDF':
        return <FileText className="h-4 w-4 text-red-500" />;
      case 'Email':
        return <Mail className="h-4 w-4 text-blue-500" />;
      case 'Scan':
        return <Scan className="h-4 w-4 text-green-500" />;
      default:
        return <FileQuestion className="h-4 w-4 text-gray-500" />;
    }
  };

  const columns: ColumnDef<InboxDocument>[] = [
    {
      accessorKey: "id",
      header: t('id'),
      cell: ({ row }) => <span className="font-medium text-rovida-near-black">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "title",
      header: t('title'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("title")}</span>,
    },
    {
      accessorKey: "sender",
      header: t('sender'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("sender")}</span>,
    },
    {
      accessorKey: "type",
      header: t('type'),
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-rovida-near-black">
          {getFileTypeIcon(row.getValue("type"))} {row.getValue("type")}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: t('status'),
      cell: ({ row }) => (
        <Badge variant={getStatusVariant(row.getValue("status"))}>
          {t(row.getValue("status").toLowerCase().replace(/ /g, ''))}
        </Badge>
      ),
    },
    {
      accessorKey: "receivedAt",
      header: t('received at'),
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("receivedAt"), 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      id: "actions",
      header: t('actions'),
      enableSorting: false,
      cell: ({ row }) => (
        <div className="text-right">
          <a href={row.original.previewUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-rovida-slate-green-gray hover:underline">
            {t('view')}
          </a>
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={documents} />
  );
};

export default InboxTable;