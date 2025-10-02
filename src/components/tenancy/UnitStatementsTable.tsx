"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table";
import { UnitStatement } from '@/data/mock-unit-statements';
import { DataTable } from '@/components/DataTable';
import { Link } from 'react-router-dom';

interface UnitStatementsTableProps {
  statements: UnitStatement[];
}

const UnitStatementsTable = ({ statements }: UnitStatementsTableProps) => {
  const { t } = useTranslation(['tenancy', 'common', 'finance']);

  const columns: ColumnDef<UnitStatement>[] = [
    {
      accessorKey: "id",
      header: t('id', { ns: 'common' }),
      cell: ({ row }) => (
        <Link to={`/tenancy/statements/${row.original.id}`} className="text-primary hover:underline">
          {row.getValue("id") as string}
        </Link>
      ),
    },
    {
      accessorKey: "unitNumber",
      header: t('unit number', { ns: 'common' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("unitNumber") as string}</span>,
    },
    {
      accessorKey: "ownerName",
      header: t('owner name', { ns: 'tenancy' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("ownerName") as string}</span>,
    },
    {
      accessorKey: "period",
      header: t('statement period', { ns: 'tenancy' }),
      cell: ({ row }) => <span className="text-rovida-near-black">{row.getValue("period") as string}</span>,
    },
    {
      accessorKey: "openingBalance",
      header: t('opening balance', { ns: 'tenancy' }),
      cell: ({ row }) => <span className="font-roboto-mono text-rovida-near-black">${(row.original.openingBalance as number).toFixed(2)}</span>,
    },
    {
      accessorKey: "closingBalance",
      header: t('closing balance', { ns: 'tenancy' }),
      cell: ({ row }) => <span className="font-roboto-mono text-rovida-near-black">${(row.original.closingBalance as number).toFixed(2)}</span>,
    },
    {
      id: "actions",
      header: t('actions', { ns: 'common' }),
      enableSorting: false,
      cell: ({ row }) => (
        <div className="text-right">
          <Link to={`/tenancy/statements/${row.original.id}`} className="text-sm text-rovida-slate-green-gray hover:underline">
            {t('view', { ns: 'common' })}
          </Link>
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={statements} />
  );
};

export default UnitStatementsTable;