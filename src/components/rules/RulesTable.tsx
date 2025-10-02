"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
import { Rule } from '@/data/mock-rules';
import { format } from 'date-fns';
import { DataTable } from '@/components/DataTable';
import { Link } from 'react-router-dom'; // Import Link

interface RulesTableProps {
  rules: Rule[];
}

const RulesTable = ({ rules }: RulesTableProps) => {
  const { t } = useTranslation(['rules', 'common']); // Ensure 'rules' and 'common' namespaces are loaded

  const getEnforcementLevelVariant = (level: Rule['enforcementLevel']) => {
    switch (level) {
      case 'Warning':
        return 'secondary';
      case 'Fine':
        return 'default';
      case 'Eviction':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const columns: ColumnDef<Rule>[] = [
    {
      accessorKey: "id",
      header: t('id', { ns: 'common' }),
      cell: ({ row }) => (
        <Link to={`/rules/${row.original.id}`} className="text-primary hover:underline">
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
      accessorKey: "category",
      header: t('category', { ns: 'rules' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{t((row.getValue("category") as string).toLowerCase(), { ns: 'rules' })}</span>,
    },
    {
      accessorKey: "effectiveDate",
      header: t('effective date', { ns: 'rules' }),
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("effectiveDate") as Date, 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      accessorKey: "enforcementLevel",
      header: t('enforcement level', { ns: 'rules' }),
      cell: ({ row }) => (
        <Badge variant={getEnforcementLevelVariant(row.getValue("enforcementLevel") as Rule['enforcementLevel'])}>
          {t((row.getValue("enforcementLevel") as string).toLowerCase(), { ns: 'rules' })}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: t('actions', { ns: 'common' }),
      enableSorting: false,
      cell: ({ row }) => (
        <div className="text-right">
          <Link to={`/rules/${row.original.id}`} className="text-sm text-rovida-slate-green-gray hover:underline">
            {t('view', { ns: 'common' })} / {t('edit', { ns: 'common' })}
          </Link>
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={rules} />
  );
};

export default RulesTable;