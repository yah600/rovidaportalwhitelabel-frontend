"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
import { WorkOrder } from '@/data/mock-work-orders';
import { format } from 'date-fns';
import { DataTable } from '@/components/DataTable';

interface WorkOrdersTableProps {
  workOrders: WorkOrder[];
}

const WorkOrdersTable = ({ workOrders }: WorkOrdersTableProps) => {
  const { t } = useTranslation(['maintenance', 'common']); // Specify namespaces

  const getStatusVariant = (status: WorkOrder['status']) => {
    switch (status) {
      case 'Open':
        return 'default';
      case 'In Progress':
        return 'secondary';
      case 'Completed':
        return 'outline';
      case 'Cancelled':
        return 'destructive';
      case 'Pending Parts':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: WorkOrder['priority']) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-red-500 text-white';
      case 'High':
        return 'bg-orange-500 text-white';
      case 'Medium':
        return 'bg-yellow-500 text-black';
      case 'Low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const columns: ColumnDef<WorkOrder>[] = [
    {
      accessorKey: "id",
      header: t('id', { ns: 'common' }),
      cell: ({ row }) => (
        <Link to={`/maintenance/work-orders/${row.original.id}`} className="text-primary hover:underline">
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
      accessorKey: "assignedTo",
      header: t('assigned to', { ns: 'common' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("assignedTo") as string}</span>,
    },
    {
      accessorKey: "status",
      header: t('status', { ns: 'common' }),
      cell: ({ row }) => (
        <Badge variant={getStatusVariant(row.getValue("status") as WorkOrder['status'])}>
          {t((row.getValue("status") as string).toLowerCase(), { ns: 'maintenance' })}
        </Badge>
      ),
    },
    {
      accessorKey: "priority",
      header: t('priority', { ns: 'common' }),
      cell: ({ row }) => (
        <Badge className={getPriorityColor(row.getValue("priority") as WorkOrder['priority'])}>
          {t((row.getValue("priority") as string).toLowerCase(), { ns: 'common' })}
        </Badge>
      ),
    },
    {
      accessorKey: "dueDate",
      header: t('due date', { ns: 'common' }),
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("dueDate") as Date, 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      id: "actions",
      header: t('actions', { ns: 'common' }),
      enableSorting: false,
      cell: ({ row }) => (
        <div className="text-right">
          <Link to={`/maintenance/work-orders/${row.original.id}`} className="text-sm text-rovida-slate-green-gray hover:underline">
            {t('view', { ns: 'common' })}
          </Link>
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={workOrders} />
  );
};

export default WorkOrdersTable;