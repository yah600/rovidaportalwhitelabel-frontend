"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
import { Issue } from '@/data/mock-issues';
import { format } from 'date-fns';
import { DataTable } from '@/components/DataTable'; // Import the generic DataTable

interface IssuesTableProps {
  issues: Issue[];
}

const IssuesTable = ({ issues }: IssuesTableProps) => {
  const { t } = useTranslation();

  const getStatusVariant = (status: Issue['status']) => {
    switch (status) {
      case 'Open':
        return 'default';
      case 'In Progress':
        return 'secondary';
      case 'Closed':
        return 'outline';
      case 'Pending':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: Issue['priority']) => {
    switch (priority) {
      case 'Critical':
        return 'bg-rovida-error text-white';
      case 'High':
        return 'bg-rovida-warning text-white';
      case 'Medium':
        return 'bg-rovida-gold text-white';
      case 'Low':
        return 'bg-rovida-success text-white';
      default:
        return 'bg-rovida-soft-gray text-rovida-near-black';
    }
  };

  const columns: ColumnDef<Issue>[] = [
    {
      accessorKey: "id",
      header: t('id'),
      cell: ({ row }) => (
        <Link to={`/issues/${row.original.id}`} className="text-primary hover:underline">
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
      accessorKey: "unit",
      header: t('unit'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("unit")}</span>,
    },
    {
      accessorKey: "type",
      header: t('type'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("type")}</span>,
    },
    {
      accessorKey: "status",
      header: t('status'),
      cell: ({ row }) => (
        <Badge variant={getStatusVariant(row.getValue("status"))}>
          {row.getValue("status")}
        </Badge>
      ),
    },
    {
      accessorKey: "priority",
      header: t('priority'),
      cell: ({ row }) => (
        <Badge className={getPriorityColor(row.getValue("priority"))}>
          {row.getValue("priority")}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: t('created_at'),
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("createdAt"), 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      id: "actions",
      header: t('actions'),
      enableSorting: false,
      cell: ({ row }) => (
        <div className="text-right">
          <Link to={`/issues/${row.original.id}`} className="text-sm text-rovida-slate-green-gray hover:underline">
            {t('view')}
          </Link>
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={issues} />
  );
};

export default IssuesTable;