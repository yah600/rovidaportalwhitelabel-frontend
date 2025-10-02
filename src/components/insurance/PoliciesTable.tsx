"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
import { InsurancePolicy } from '@/data/mock-insurance';
import { format } from 'date-fns';
import { DataTable } from '@/components/DataTable';

interface PoliciesTableProps {
  policies: InsurancePolicy[];
}

const PoliciesTable = ({ policies }: PoliciesTableProps) => {
  const { t } = useTranslation();

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

  const columns: ColumnDef<InsurancePolicy>[] = [
    {
      accessorKey: "id",
      header: t('id'),
      cell: ({ row }) => <span className="font-medium text-rovida-near-black">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "provider",
      header: t('provider'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("provider")}</span>,
    },
    {
      accessorKey: "policyNumber",
      header: t('policy_number'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("policyNumber")}</span>,
    },
    {
      accessorKey: "type",
      header: t('type'),
      cell: ({ row }) => <span className="text-rovida-near-black">{t(row.getValue("type").toLowerCase())}</span>,
    },
    {
      accessorKey: "coverageAmount",
      header: t('coverage_amount'),
      cell: ({ row }) => <span className="text-rovida-near-black">${row.original.coverageAmount.toLocaleString()}</span>,
    },
    {
      accessorKey: "endDate",
      header: t('end_date'),
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("endDate"), 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: t('status'),
      cell: ({ row }) => (
        <Badge variant={getStatusVariant(row.getValue("status"))}>
          {t(row.getValue("status").toLowerCase().replace(/ /g, '_'))}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: t('actions'),
      enableSorting: false,
      cell: () => (
        <div className="text-right">
          <span className="text-sm text-rovida-slate-green-gray">{t('view')} / {t('edit')}</span>
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={policies} />
  );
};

export default PoliciesTable;