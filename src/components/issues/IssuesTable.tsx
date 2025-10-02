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
  const { t } = useTranslation(['issues', 'common']); // Specify namespaces

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
      header: t('id', { ns: 'common' }),
      cell: ({ row }) => (
        <Link to={`/issues/${row.original.id}`} className="text-primary hover:underline">
          {row.getValue("id") as string}
        </Link>
      ),
    },
    {
      accessorKey: "title",
      header: t('title', { ns: 'common' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("title") as string}</span>,
    },
    {
      accessorKey: "unit",
      header: t('unit', { ns: 'common' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("unit") as string}</span>,
    },
    {
      accessorKey: "type",
      header: t('type', { ns: 'common' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("type") as string}</span>,
    },
    {
      accessorKey: "status",
      header: t('status', { ns: 'common' }),
      cell: ({ row }) => (
        <Badge variant={getStatusVariant(row.getValue("status") as Issue['status'])}>
          {t((row.getValue("status") as string).toLowerCase(), { ns: 'issues' })}
        </Badge>
      ),
    },
    {
      accessorKey: "priority",
      header: t('priority', { ns: 'common' }),
      cell: ({ row }) => (
        <Badge className={getPriorityColor(row.getValue("priority") as Issue['priority'])}>
          {t((row.getValue("priority") as string).toLowerCase(), { ns: 'common' })}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: t('created at', { ns: 'common' }),
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("createdAt") as Date, 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      id: "actions",
      header: t('actions', { ns: 'common' }),
      enableSorting: false,
      cell: ({ row }) => (
        <div className="text-right">
          <Link to={`/issues/${row.original.id}`} className="text-sm text-rovida-slate-green-gray hover:underline">
            {t('view', { ns: 'common' })}
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