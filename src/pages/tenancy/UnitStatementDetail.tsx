import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, Printer, FileText } from 'lucide-react'; // Imported FileText
import { mockUnitStatements, UnitStatement } from '@/data/mock-unit-statements';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useAuth } from '@/shared/rbac/useAuth';

const UnitStatementDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation(['tenancy', 'finance', 'common']);
  const { canRead, canExport } = useAuth();

  const statement: UnitStatement | undefined = mockUnitStatements.find((s) => s.id === id);

  if (!statement) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-rovida-slate-green-gray">{t('unit statement not found', { ns: 'tenancy' })}</p>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: t('tenancy', { ns: 'tenancy' }), href: '/tenancy' },
    { label: t('unit statements', { ns: 'tenancy' }), href: '/tenancy/statements' },
    { label: `${t('statement', { ns: 'tenancy' })} ${statement.id}`, href: `/tenancy/statements/${statement.id}` },
  ];

  const handleDownloadStatement = () => {
    toast.info(t('download statement action', { ns: 'tenancy', id: statement.id }));
  };

  const handlePrintStatement = () => {
    toast.info(t('print statement action', { ns: 'tenancy', id: statement.id }));
    window.print();
  };

  if (!canRead('Tenancy - Unit Statements')) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <FileText className="h-12 w-12 text-rovida-gold" />
            <p>{t('no permission view unit statements', { ns: 'common' })}</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('unit statement', { ns: 'tenancy' })} - {statement.unitNumber}</h1>
        <div className="flex items-center gap-2">
          {canExport('Tenancy - Unit Statements') && (
            <Button variant="outline" size="sm" className="btn-secondary" onClick={handleDownloadStatement}>
              <Download className="h-4 w-4 mr-2" /> {t('download', { ns: 'common' })}
            </Button>
          )}
          <Button variant="outline" size="sm" className="btn-secondary" onClick={handlePrintStatement}>
            <Printer className="h-4 w-4 mr-2" /> {t('print', { ns: 'common' })}
          </Button>
        </div>
      </header>

      <Card className="card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('statement details', { ns: 'tenancy' })}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">{t('statement period', { ns: 'tenancy' })}: {statement.period}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2 text-rovida-near-black">
            <div className="font-medium">{t('unit number', { ns: 'common' })}:</div>
            <div>{statement.unitNumber}</div>
            <div className="font-medium">{t('owner name', { ns: 'tenancy' })}:</div>
            <div>{statement.ownerName}</div>
            <div className="font-medium">{t('opening balance', { ns: 'tenancy' })}:</div>
            <div className="font-roboto-mono">${statement.openingBalance.toFixed(2)}</div>
            <div className="font-medium">{t('closing balance', { ns: 'tenancy' })}:</div>
            <div className="font-roboto-mono">${statement.closingBalance.toFixed(2)}</div>
          </div>

          <h3 className="text-lg font-semibold text-rovida-navy mt-4">{t('transaction history', { ns: 'tenancy' })}</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-rovida-navy">{t('date', { ns: 'common' })}</TableHead>
                  <TableHead className="text-rovida-navy">{t('description', { ns: 'common' })}</TableHead>
                  <TableHead className="text-right text-rovida-navy">{t('charges', { ns: 'finance' })}</TableHead>
                  <TableHead className="text-right text-rovida-navy">{t('payments', { ns: 'finance' })}</TableHead>
                  <TableHead className="text-right text-rovida-navy">{t('balance', { ns: 'finance' })}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {statement.entries.map((entry) => (
                  <TableRow key={entry.id} className="hover:bg-rovida-soft-gray/50 transition-colors">
                    <TableCell className="text-rovida-near-black">{format(entry.date, 'MMM dd, yyyy')}</TableCell>
                    <TableCell className="text-rovida-slate-green-gray">{entry.description}</TableCell>
                    <TableCell className="text-right font-roboto-mono text-rovida-near-black">{entry.charges > 0 ? `$${entry.charges.toFixed(2)}` : '-'}</TableCell>
                    <TableCell className="text-right font-roboto-mono text-rovida-near-black">{entry.payments > 0 ? `$${entry.payments.toFixed(2)}` : '-'}</TableCell>
                    <TableCell className="text-right font-roboto-mono text-rovida-near-black">${entry.balance.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnitStatementDetail;