import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart2, FileText, Download, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { mockMonthlyFinancialSummary } from '@/data/mock-financial-reports';

const FinanceReports = () => {
  const { t } = useTranslation(['finance', 'common']);
  const { canExport } = useAuth();

  const breadcrumbItems = [
    { label: t('finance', { ns: 'finance' }), href: '/finance' },
    { label: t('reports', { ns: 'finance' }), href: '/finance/reports' },
  ];

  const handleGenerateReport = (reportType: string) => {
    toast.info(t('generate report action', { ns: 'finance', type: reportType }));
  };

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
    </div>
  );
};

export default FinanceReports;