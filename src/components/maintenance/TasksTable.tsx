"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
import { Task } from '@/data/mock-tasks';
import { format } from 'date-fns';
import { DataTable } from '@/components/DataTable'; // Import the generic DataTable

interface TasksTableProps {
  tasks: Task[];
}

const TasksTable = ({ tasks }: TasksTableProps) => {
  const { t } = useTranslation();

  const getStatusVariant = (status: Task['status']) => {
    switch (status) {
      case 'To Do':
        return 'default';
      case 'In Progress':
        return 'secondary';
      case 'Completed':
        return 'outline';
      case 'Blocked':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500 text-white';
      case 'Medium':
        return 'bg-orange-500 text-white';
      case 'Low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: "id",
      header: t('id'),
      cell: ({ row }) => (
        <Link to={`/maintenance/tasks/${row.original.id}`} className="text-primary hover:underline">
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
      accessorKey: "assignedTo",
      header: t('assigned_to'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("assignedTo")}</span>,
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
      accessorKey: "dueDate",
      header: t('due_date'),
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("dueDate"), 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      id: "actions",
      header: t('actions'),
      enableSorting: false,
      cell: ({ row }) => (
        <div className="text-right">
          <Link to={`/maintenance/tasks/${row.original.id}`} className="text-sm text-rovida-slate-green-gray hover:underline">
            {t('view')}
          </Link>
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={tasks} />
  );
};

export default TasksTable;