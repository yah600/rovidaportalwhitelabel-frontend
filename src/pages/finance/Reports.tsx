import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, FileText, Download, AlertTriangle } from 'lucide-react'; // Added AlertTriangle
import { Button } from '@/components/ui/button';
import { toast } from 'sonner'; // Import toast for actions

const FinanceReports = () => {
  const { t } = useTranslation(['finance', 'common']); // Ensure 'finance' and 'common' namespaces are loaded
  const breadcrumbItems = [
    { label: t('finance', { ns: 'finance' }), href: '/finance' },
    { label: t('reports', { ns: 'finance' }), href: '/finance/reports' },
  ];

  const handleGenerateReport = (reportType: string) => {
    toast.info(t('generate report action', { ns: 'finance', type: reportType })); // Placeholder action with toast
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('finance', { ns: 'finance' })} {t('reports', { ns: 'finance' })}</h1>

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
            <Button variant="outline" size="sm" className="btn-secondary" onClick={() => handleGenerateReport('Monthly Expense')}>
              <Download className="mr-2 h-4 w-4" /> {t('generate report', { ns: 'finance' })}
            </Button>
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
            <Button variant="outline" size="sm" className="btn-secondary" onClick={() => handleGenerateReport('Income Statement')}>
              <Download className="mr-2 h-4 w-4" /> {t('generate report', { ns: 'finance' })}
            </Button>
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
            <Button variant="outline" size="sm" className="btn-secondary" onClick={() => handleGenerateReport('Overdue Bills')}>
              <Download className="mr-2 h-4 w-4" /> {t('generate report', { ns: 'finance' })}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4">
        <p className="text-rovida-slate-green-gray">{t('financial reports displayed here', { ns: 'finance' })}</p>
      </Card>
    </div>
  );
};

export default FinanceReports;