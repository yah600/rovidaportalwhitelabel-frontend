"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
import { Rule } from '@/data/mock-rules';
import { format } from 'date-fns';
import { DataTable } from '@/components/DataTable';

interface RulesTableProps {
  rules: Rule[];
}

const RulesTable = ({ rules }: RulesTableProps) => {
  const { t } = useTranslation();

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
      header: t('id'),
      cell: ({ row }) => <span className="font-medium text-rovida-near-black">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "title",
      header: t('title'),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("title")}</span>,
    },
    {
      accessorKey: "category",
      header: t('category'),
      cell: ({ row }) => <span className="text-rovida-near-black">{t(row.getValue("category").toLowerCase())}</span>,
    },
    {
      accessorKey: "effectiveDate",
      header: t('effective_date'),
      cell: ({ row }) => (
        <span className="text-rovida-slate-green-gray">
          {format(row.getValue("effectiveDate"), 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      accessorKey: "enforcementLevel",
      header: t('enforcement_level'),
      cell: ({ row }) => (
        <Badge variant={getEnforcementLevelVariant(row.getValue("enforcementLevel"))}>
          {t(row.getValue("enforcementLevel").toLowerCase())}
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
    <DataTable columns={columns} data={rules} />
  );
};

export default RulesTable;