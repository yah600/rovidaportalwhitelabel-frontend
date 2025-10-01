import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, FileText, Download, AlertTriangle } from 'lucide-react'; // Added AlertTriangle
import { Button } from '@/components/ui/button';

const FinanceReports = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('finance'), href: '/finance' },
    { label: t('reports'), href: '/finance/reports' },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('finance')} {t('reports')}</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="card-rovida">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-rovida-navy">{t('monthly_expense_report')}</CardTitle>
            <BarChart2 className="h-5 w-5 text-rovida-gold" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-rovida-slate-green-gray mb-4">
              {t('generate_detailed_expense_report')}
            </p>
            <Button variant="outline" size="sm" className="btn-secondary">
              <Download className="mr-2 h-4 w-4" /> {t('generate_report')}
            </Button>
          </CardContent>
        </Card>

        <Card className="card-rovida">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-rovida-navy">{t('income_statement')}</CardTitle>
            <FileText className="h-5 w-5 text-rovida-gold" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-rovida-slate-green-gray mb-4">
              {t('view_summary_income_expenses')}
            </p>
            <Button variant="outline" size="sm" className="btn-secondary">
              <Download className="mr-2 h-4 w-4" /> {t('generate_report')}
            </Button>
          </CardContent>
        </Card>

        <Card className="card-rovida">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-rovida-navy">{t('overdue_bills_report')}</CardTitle>
            <AlertTriangle className="h-5 w-5 text-rovida-gold" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-rovida-slate-green-gray mb-4">
              {t('list_all_overdue_bills')}
            </p>
            <Button variant="outline" size="sm" className="btn-secondary">
              <Download className="mr-2 h-4 w-4" /> {t('generate_report')}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4">
        <p className="text-rovida-slate-green-gray">{t('financial_reports_displayed_here')}</p>
      </Card>
    </div>
  );
};

export default FinanceReports;