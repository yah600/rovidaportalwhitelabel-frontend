import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ProfitLossEntry, mockProfitLoss } from '@/data/mock-financial-reports-details';
import { cn } from '@/lib/utils';

const ProfitLossReport = () => {
  const { t } = useTranslation(['finance', 'common']);

  const totalIncome = mockProfitLoss.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);
  const totalExpenses = mockProfitLoss.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
  const netProfitLoss = totalIncome - totalExpenses;

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-rovida-navy">{t('category', { ns: 'finance' })}</TableHead>
            <TableHead className="text-right text-rovida-navy">{t('amount', { ns: 'finance' })}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="bg-rovida-soft-gray/50 hover:bg-rovida-soft-gray/70 font-semibold">
            <TableCell className="text-rovida-navy">{t('income', { ns: 'finance' })}</TableCell>
            <TableCell className="text-right text-rovida-navy"></TableCell>
          </TableRow>
          {mockProfitLoss.filter(e => e.type === 'income').map((entry, index) => (
            <TableRow key={index} className="hover:bg-rovida-soft-gray/50 transition-colors">
              <TableCell className="pl-8 text-rovida-near-black">{entry.category}</TableCell>
              <TableCell className="text-right font-roboto-mono text-rovida-near-black">${entry.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
          <TableRow className="font-bold">
            <TableCell className="text-rovida-navy">{t('total income', { ns: 'finance' })}</TableCell>
            <TableCell className="text-right font-roboto-mono text-rovida-navy">${totalIncome.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow className="bg-rovida-soft-gray/50 hover:bg-rovida-soft-gray/70 font-semibold mt-4">
            <TableCell className="text-rovida-navy">{t('expenses', { ns: 'finance' })}</TableCell>
            <TableCell className="text-right text-rovida-navy"></TableCell>
          </TableRow>
          {mockProfitLoss.filter(e => e.type === 'expense').map((entry, index) => (
            <TableRow key={index} className="hover:bg-rovida-soft-gray/50 transition-colors">
              <TableCell className="pl-8 text-rovida-near-black">{entry.category}</TableCell>
              <TableCell className="text-right font-roboto-mono text-rovida-near-black">${entry.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
          <TableRow className="font-bold">
            <TableCell className="text-rovida-navy">{t('total expenses', { ns: 'finance' })}</TableCell>
            <TableCell className="text-right font-roboto-mono text-rovida-navy">${totalExpenses.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow className="font-bold bg-rovida-gold/20">
            <TableCell className="text-rovida-navy">{t('net profit loss', { ns: 'finance' })}</TableCell>
            <TableCell className="text-right font-roboto-mono text-rovida-navy">${netProfitLoss.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ProfitLossReport;