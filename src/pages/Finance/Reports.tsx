import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart2, FileText, Download, AlertTriangle, BookText, Scale, Wallet, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { mockMonthlyFinancialSummary } from '@/data/mock-financial-reports';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LedgerReport from '@/components/finance/reports/LedgerReport';
import TrialBalanceReport from '@/components/finance/reports/TrialBalanceReport';
import ProfitLossReport from '@/components/finance/reports/ProfitLossReport';
import BalanceSheetReport from '@/components/finance/reports/BalanceSheetReport';

const FinanceReports = () => {
  const { t } = useTranslation(['finance', 'common']);
  const { canExport, canRead } = useAuth();

  const breadcrumbItems = [
    { label: t('finance', { ns: 'finance' }), href: '/finance' },
    { label: t('reports', { ns: 'finance' }), href: '/finance/reports' },
  ];

  const handleGenerateReport = (reportType: string) => {
    toast.info(t('generate report action', { ns: 'finance', type: reportType }));
  };

  const handleExportReport = (reportName: string) => {
    toast.success(t('export report action', { ns: 'finance', name: reportName }));
    // Simulate PDF generation/download
  };

  if (!canRead('Finance - Reports')) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <BarChart2 className="h-12 w-12 text-rovida-gold" />
            <p>{t('no permission view reports', { ns: 'common' })}</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('finance reports', { ns: 'finance' })}</h1>
      <p className="text-rovida-slate-green-gray">{t('access detailed financial analytics', { ns: 'finance' })}</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="card-rovida">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-rovida-navy">{t('monthly expense report', { ns: 'finance' })}</CardTitle>
            <BarChart2 className="h-5 w-5 text-rovida-gold" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-rovida-slate-green-gray mb-4">
              {t('generate detailed expense report', { ns: 'finance' })}
            </p>
            {canExport('Finance - Reports') && (
              <Button variant="outline" size="sm" className="btn-secondary" onClick={() => handleGenerateReport('Monthly Expense')}>
                <Download className="mr-2 h-4 w-4" /> {t('generate report', { ns: 'finance' })}
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="card-rovida">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-rovida-navy">{t('income statement', { ns: 'finance' })}</CardTitle>
            <FileText className="h-5 w-5 text-rovida-gold" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-rovida-slate-green-gray mb-4">
              {t('view summary income expenses', { ns: 'finance' })}
            </p>
            {canExport('Finance - Reports') && (
              <Button variant="outline" size="sm" className="btn-secondary" onClick={() => handleGenerateReport('Income Statement')}>
                <Download className="mr-2 h-4 w-4" /> {t('generate report', { ns: 'finance' })}
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="card-rovida">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-rovida-navy">{t('overdue bills report', { ns: 'finance' })}</CardTitle>
            <AlertTriangle className="h-5 w-5 text-rovida-gold" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-rovida-slate-green-gray mb-4">
              {t('list all overdue bills', { ns: 'finance' })}
            </p>
            {canExport('Finance - Reports') && (
              <Button variant="outline" size="sm" className="btn-secondary" onClick={() => handleGenerateReport('Overdue Bills')}>
                <Download className="mr-2 h-4 w-4" /> {t('generate report', { ns: 'finance' })}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-full card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('monthly financial summary', { ns: 'finance' })}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">{t('summary of income and expenses', { ns: 'finance' })}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockMonthlyFinancialSummary}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEB" />
                <XAxis dataKey="month" stroke="#7C8D89" />
                <YAxis stroke="#7C8D89" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.8)', border: '1px solid #E9ECEB', borderRadius: '8px' }} itemStyle={{ color: '#111418' }} />
                <Legend />
                <Bar dataKey="income" fill="#3A7D44" name={t('income', { ns: 'finance' })} />
                <Bar dataKey="expenses" fill="#B2433F" name={t('expenses', { ns: 'finance' })} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-full card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('detailed financial reports', { ns: 'finance' })}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">{t('explore detailed financial statements', { ns: 'finance' })}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profit-loss">
            <TabsList className="grid w-full grid-cols-4 bg-rovida-soft-gray/50 backdrop-blur-xl border-rovida-soft-gray">
              <TabsTrigger value="profit-loss" className="data-[state=active]:bg-rovida-navy data-[state=active]:text-white data-[state=active]:shadow-subtle text-rovida-near-black">
                <Wallet className="h-4 w-4 mr-2" /> {t('profit loss', { ns: 'finance' })}
              </TabsTrigger>
              <TabsTrigger value="balance-sheet" className="data-[state=active]:bg-rovida-navy data-[state=active]:text-white data-[state=active]:shadow-subtle text-rovida-near-black">
                <Scale className="h-4 w-4 mr-2" /> {t('balance sheet', { ns: 'finance' })}
              </TabsTrigger>
              <TabsTrigger value="ledger" className="data-[state=active]:bg-rovida-navy data-[state=active]:text-white data-[state=active]:shadow-subtle text-rovida-near-black">
                <BookText className="h-4 w-4 mr-2" /> {t('general ledger', { ns: 'finance' })}
              </TabsTrigger>
              <TabsTrigger value="trial-balance" className="data-[state=active]:bg-rovida-navy data-[state=active]:text-white data-[state=active]:shadow-subtle text-rovida-near-black">
                <Landmark className="h-4 w-4 mr-2" /> {t('trial balance', { ns: 'finance' })}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="profit-loss" className="mt-4">
              <ProfitLossReport />
              {canExport('Finance - Reports') && (
                <div className="mt-4 text-right">
                  <Button variant="outline" size="sm" className="btn-secondary" onClick={() => handleExportReport(t('profit loss', { ns: 'finance' }))}>
                    <Download className="mr-2 h-4 w-4" /> {t('export to pdf', { ns: 'common' })}
                  </Button>
                </div>
              )}
            </TabsContent>
            <TabsContent value="balance-sheet" className="mt-4">
              <BalanceSheetReport />
              {canExport('Finance - Reports') && (
                <div className="mt-4 text-right">
                  <Button variant="outline" size="sm" className="btn-secondary" onClick={() => handleExportReport(t('balance sheet', { ns: 'finance' }))}>
                    <Download className="mr-2 h-4 w-4" /> {t('export to pdf', { ns: 'common' })}
                  </Button>
                </div>
              )}
            </TabsContent>
            <TabsContent value="ledger" className="mt-4">
              <LedgerReport />
              {canExport('Finance - Reports') && (
                <div className="mt-4 text-right">
                  <Button variant="outline" size="sm" className="btn-secondary" onClick={() => handleExportReport(t('general ledger', { ns: 'finance' }))}>
                    <Download className="mr-2 h-4 w-4" /> {t('export to pdf', { ns: 'common' })}
                  </Button>
                </div>
              )}
            </TabsContent>
            <TabsContent value="trial-balance" className="mt-4">
              <TrialBalanceReport />
              {canExport('Finance - Reports') && (
                <div className="mt-4 text-right">
                  <Button variant="outline" size="sm" className="btn-secondary" onClick={() => handleExportReport(t('trial balance', { ns: 'finance' }))}>
                    <Download className="mr-2 h-4 w-4" /> {t('export to pdf', { ns: 'common' })}
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceReports;