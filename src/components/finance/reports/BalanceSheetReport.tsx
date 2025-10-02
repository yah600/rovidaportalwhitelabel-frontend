import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BalanceSheetEntry, mockBalanceSheet } from '@/data/mock-financial-reports-details';
import { cn } from '@/lib/utils';

const BalanceSheetReport = () => {
  const { t } = useTranslation(['finance', 'common']);

  const totalAssets = mockBalanceSheet.filter(e => e.type === 'asset').reduce((sum, e) => sum + e.amount, 0);
  const totalLiabilities = mockBalanceSheet.filter(e => e.type === 'liability').reduce((sum, e) => sum + e.amount, 0);
  const totalEquity = mockBalanceSheet.filter(e => e.type === 'equity').reduce((sum, e) => sum + e.amount, 0);

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
            <TableCell className="text-rovida-navy">{t('assets', { ns: 'finance' })}</TableCell>
            <TableCell className="text-right text-rovida-navy"></TableCell>
          </TableRow>
          {mockBalanceSheet.filter(e => e.type === 'asset').map((entry, index) => (
            <TableRow key={index} className="hover:bg-rovida-soft-gray/50 transition-colors">
              <TableCell className="pl-8 text-rovida-near-black">{entry.category}</TableCell>
              <TableCell className="text-right font-roboto-mono text-rovida-near-black">${entry.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
          <TableRow className="font-bold">
            <TableCell className="text-rovida-navy">{t('total assets', { ns: 'finance' })}</TableCell>
            <TableCell className="text-right font-roboto-mono text-rovida-navy">${totalAssets.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow className="bg-rovida-soft-gray/50 hover:bg-rovida-soft-gray/70 font-semibold mt-4">
            <TableCell className="text-rovida-navy">{t('liabilities', { ns: 'finance' })}</TableCell>
            <TableCell className="text-right text-rovida-navy"></TableCell>
          </TableRow>
          {mockBalanceSheet.filter(e => e.type === 'liability').map((entry, index) => (
            <TableRow key={index} className="hover:bg-rovida-soft-gray/50 transition-colors">
              <TableCell className="pl-8 text-rovida-near-black">{entry.category}</TableCell>
              <TableCell className="text-right font-roboto-mono text-rovida-near-black">${entry.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
          <TableRow className="font-bold">
            <TableCell className="text-rovida-navy">{t('total liabilities', { ns: 'finance' })}</TableCell>
            <TableCell className="text-right font-roboto-mono text-rovida-navy">${totalLiabilities.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow className="bg-rovida-soft-gray/50 hover:bg-rovida-soft-gray/70 font-semibold mt-4">
            <TableCell className="text-rovida-navy">{t('equity', { ns: 'finance' })}</TableCell>
            <TableCell className="text-right text-rovida-navy"></TableCell>
          </TableRow>
          {mockBalanceSheet.filter(e => e.type === 'equity').map((entry, index) => (
            <TableRow key={index} className="hover:bg-rovida-soft-gray/50 transition-colors">
              <TableCell className="pl-8 text-rovida-near-black">{entry.category}</TableCell>
              <TableCell className="text-right font-roboto-mono text-rovida-near-black">${entry.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
          <TableRow className="font-bold">
            <TableCell className="text-rovida-navy">{t('total equity', { ns: 'finance' })}</TableCell>
            <TableCell className="text-right font-roboto-mono text-rovida-navy">${totalEquity.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow className="font-bold bg-rovida-gold/20">
            <TableCell className="text-rovida-navy">{t('liabilities and equity', { ns: 'finance' })}</TableCell>
            <TableCell className="text-right font-roboto-mono text-rovida-navy">${(totalLiabilities + totalEquity).toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default BalanceSheetReport;