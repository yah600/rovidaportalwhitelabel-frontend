"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
import { InsurancePolicy } from '@/data/mock-insurance';
import { format } from 'date-fns';
import { DataTable } from '@/components/DataTable';
import { toast } from 'sonner'; // Import toast for actions
import { useAuth } from '@/hooks/useAuth'; // Import useAuth
import { Link } from 'react-router-dom'; // Import Link

interface PoliciesTableProps {
  policies: InsurancePolicy[];
}

const PoliciesTable = ({ policies }: PoliciesTableProps) => {
  const { t } = useTranslation(['insurance', 'common']); // Ensure 'insurance' and 'common' namespaces are loaded

  const getStatusVariant = (status: InsurancePolicy['status']) => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'Expired':
        return 'destructive';
      case 'Pending Renewal':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const handleViewEditPolicy = (policyId: string) => {
    toast.info(t('view edit policy action', { ns: 'insurance', id: policyId })); // Placeholder action with toast
  };

  const columns: ColumnDef<InsurancePolicy>[] = [
    {
      accessorKey: "id",
      header: t('id', { ns: 'common' }),
      cell: ({ row }) => (
        <Link to={`/insurance/${row.original.id}`} className="text-primary hover:underline">
          {row.getValue("id") as string}
        </Link>
      ),
    },
    {
      accessorKey: "provider",
      header: t('provider', { ns: 'insurance' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("provider") as string}</span>,
    },
    {
      accessorKey: "policyNumber",
      header: t('policy number', { ns: 'insurance' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("policyNumber") as string}</span>,
    },
    {
      accessorKey: "type",
      header: t('type', { ns: 'common' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{t((row.getValue("type") as string).toLowerCase(), { ns: 'insurance' })}</span>,
    },
    {
      accessorKey: "coverageAmount",
      header: t('coverage amount', { ns: 'insurance' }),
      cell: ({ row }) => <span className="text-rovida-near-black">${(row.original.coverageAmount as number).toLocaleString()}</span>,
    },
    {
      accessorKey: "endDate",
      header: t('end date', { ns: 'insurance' }),
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("endDate") as Date, 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: t('status', { ns: 'common' }),
      cell: ({ row }) => (
        <Badge variant={getStatusVariant(row.getValue("status") as InsurancePolicy['status'])}>
          {t((row.getValue("status") as string).toLowerCase(), { ns: 'insurance' })}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: t('actions', { ns: 'common' }),
      enableSorting: false,
      cell: ({ row }) => (
        <div className="text-right">
          <Link to={`/insurance/${row.original.id}`} className="text-sm text-rovida-slate-green-gray hover:underline">
            {t('view', { ns: 'common' })} / {t('edit', { ns: 'common' })}
          </Link>
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={policies} />
  );
};

export default PoliciesTable;