import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LedgerEntry, mockLedger } from '@/data/mock-financial-reports-details';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const LedgerReport = () => {
  const { t } = useTranslation(['finance', 'common']);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-rovida-navy">{t('date', { ns: 'common' })}</TableHead>
            <TableHead className="text-rovida-navy">{t('account', { ns: 'finance' })}</TableHead>
            <TableHead className="text-rovida-navy">{t('description', { ns: 'common' })}</TableHead>
            <TableHead className="text-right text-rovida-navy">{t('debit', { ns: 'finance' })}</TableHead>
            <TableHead className="text-right text-rovida-navy">{t('credit', { ns: 'finance' })}</TableHead>
            <TableHead className="text-right text-rovida-navy">{t('balance', { ns: 'finance' })}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockLedger.map((entry) => (
            <TableRow key={entry.id} className="hover:bg-rovida-soft-gray/50 transition-colors">
              <TableCell className="text-rovida-near-black">{format(entry.date, 'MMM dd, yyyy')}</TableCell>
              <TableCell className="text-rovida-near-black">{entry.account}</TableCell>
              <TableCell className="text-rovida-slate-green-gray">{entry.description}</TableCell>
              <TableCell className="text-right font-roboto-mono text-rovida-near-black">{entry.debit > 0 ? `$${entry.debit.toFixed(2)}` : '-'}</TableCell>
              <TableCell className="text-right font-roboto-mono text-rovida-near-black">{entry.credit > 0 ? `$${entry.credit.toFixed(2)}` : '-'}</TableCell>
              <TableCell className="text-right font-roboto-mono text-rovida-near-black">${entry.balance.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LedgerReport;