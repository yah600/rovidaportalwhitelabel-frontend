import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrialBalanceEntry, mockTrialBalance } from '@/data/mock-financial-reports-details';
import { cn } from '@/lib/utils';

const TrialBalanceReport = () => {
  const { t } = useTranslation(['finance', 'common']);

  const totalDebit = mockTrialBalance.reduce((sum, entry) => sum + entry.debit, 0);
  const totalCredit = mockTrialBalance.reduce((sum, entry) => sum + entry.credit, 0);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-rovida-navy">{t('account', { ns: 'finance' })}</TableHead>
            <TableHead className="text-right text-rovida-navy">{t('debit', { ns: 'finance' })}</TableHead>
            <TableHead className="text-right text-rovida-navy">{t('credit', { ns: 'finance' })}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockTrialBalance.map((entry, index) => (
            <TableRow key={index} className="hover:bg-rovida-soft-gray/50 transition-colors">
              <TableCell className="text-rovida-near-black">{entry.account}</TableCell>
              <TableCell className="text-right font-roboto-mono text-rovida-near-black">{entry.debit > 0 ? `$${entry.debit.toFixed(2)}` : '-'}</TableCell>
              <TableCell className="text-right font-roboto-mono text-rovida-near-black">{entry.credit > 0 ? `$${entry.credit.toFixed(2)}` : '-'}</TableCell>
            </TableRow>
          ))}
          <TableRow className="font-bold bg-rovida-soft-gray/50 hover:bg-rovida-soft-gray/70">
            <TableCell className="text-rovida-navy">{t('total', { ns: 'common' })}</TableCell>
            <TableCell className="text-right font-roboto-mono text-rovida-navy">${totalDebit.toFixed(2)}</TableCell>
            <TableCell className="text-right font-roboto-mono text-rovida-navy">${totalCredit.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default TrialBalanceReport;