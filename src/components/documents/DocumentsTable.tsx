"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
import { Document } from '@/data/mock-documents';
import { format } from 'date-fns';
import { FileText, FileSpreadsheet, FileImage, FileQuestion } from 'lucide-react';
import { DataTable } from '@/components/DataTable'; // Import the generic DataTable

interface DocumentsTableProps {
  documents: Document[];
}

const DocumentsTable = ({ documents }: DocumentsTableProps) => {
  const { t } = useTranslation();

  const getFileTypeIcon = (type: Document['type']) => {
    switch (type) {
      case 'PDF':
        return <FileText className="h-4 w-4 text-red-500" />;
      case 'Word':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'Excel':
        return <FileSpreadsheet className="h-4 w-4 text-green-500" />;
      case 'Image':
        return <FileImage className="h-4 w-4 text-purple-500" />;
      default:
        return <FileQuestion className="h-4 w-4 text-gray-500" />;
    }
  };

  const columns: ColumnDef<Document>[] = [
    {
      accessorKey: "id",
      header: t('id'),
      cell: ({ row }) => (
        <Link to={`/documents/${row.original.id}`} className="text-primary hover:underline">
          {row.getValue("id")}
        </Link>
      ),
    },
    {
      accessorKey: "title",
      header: t('title'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("title")}</span>,
    },
    {
      accessorKey: "category",
      header: t('category'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("category")}</span>,
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
      accessorKey: "uploadedBy",
      header: t('uploaded by'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("uploadedBy")}</span>,
    },
    {
      accessorKey: "uploadedAt",
      header: t('uploaded at'),
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("uploadedAt"), 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      id: "actions",
      header: t('actions'),
      enableSorting: false,
      cell: ({ row }) => (
        <div className="text-right">
          <a href={row.original.url} target="_blank" rel="noopener noreferrer" className="text-sm text-rovida-slate-green-gray hover:underline">
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

export default DocumentsTable;