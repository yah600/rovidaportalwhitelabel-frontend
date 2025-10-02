"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
import { InboxDocument } from '@/data/mock-inbox-documents';
import { format } from 'date-fns';
import { Mail, FileText, FileQuestion, Scan } from 'lucide-react';
import { DataTable } from '@/components/DataTable'; // Import the generic DataTable
import { toast } from 'sonner'; // Import toast for actions

interface InboxTableProps {
  documents: InboxDocument[];
}

const InboxTable = ({ documents }: InboxTableProps) => {
  const { t } = useTranslation(['documents', 'common']); // Ensure 'documents' and 'common' namespaces are loaded

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

  const handleViewDocument = (documentTitle: string) => {
    toast.info(t('view document action', { ns: 'documents', title: documentTitle })); // Placeholder action with toast
  };

  const columns: ColumnDef<InboxDocument>[] = [
    {
      accessorKey: "id",
      header: t('id', { ns: 'common' }),
      cell: ({ row }) => <span className="font-medium text-rovida-near-black">{row.getValue("id") as string}</span>,
    },
    {
      accessorKey: "title",
      header: t('title', { ns: 'common' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("title") as string}</span>,
    },
    {
      accessorKey: "sender",
      header: t('sender', { ns: 'documents' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("sender") as string}</span>,
    },
    {
      accessorKey: "type",
      header: t('type', { ns: 'common' }),
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-rovida-near-black">
          {getFileTypeIcon(row.getValue("type") as InboxDocument['type'])} {row.getValue("type") as string}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: t('status', { ns: 'common' }),
      cell: ({ row }) => (
        <Badge variant={getStatusVariant(row.getValue("status") as InboxDocument['status'])}>
          {t((row.getValue("status") as string).toLowerCase(), { ns: 'documents' })}
        </Badge>
      ),
    },
    {
      accessorKey: "receivedAt",
      header: t('received at', { ns: 'documents' }),
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("receivedAt") as Date, 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      id: "actions",
      header: t('actions', { ns: 'common' }),
      enableSorting: false,
      cell: ({ row }) => (
        <div className="text-right">
          <button onClick={() => handleViewDocument(row.original.title)} className="text-sm text-rovida-slate-green-gray hover:underline">
            {t('view', { ns: 'common' })}
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={documents} />
  );
};

export default InboxTable;