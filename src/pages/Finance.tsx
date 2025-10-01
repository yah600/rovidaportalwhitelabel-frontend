import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign, Receipt, CreditCard, BarChart2, ArrowRight } from 'lucide-react';
import { mockBills } from '@/data/mock-bills';
import { mockPayments } from '@/data/mock-payments';

const Finance = () => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { label: t('finance'), href: '/finance' },
  ];

  // Calculate summary data
  const outstandingBills = mockBills.filter(bill => bill.status === 'Due' || bill.status === 'Overdue' || bill.status === 'Pending Approval');
  const totalOutstandingAmount = outstandingBills.reduce((sum, bill) => sum + bill.amount, 0);
  const overdueBillsCount = mockBills.filter(bill => bill.status === 'Overdue').length;
  const totalPayments = mockPayments.length;
  const totalPaymentsAmount = mockPayments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl">{t('finance')} Overview</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Outstanding Bills Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Bills</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOutstandingAmount.toFixed(2)} CAD</div>
            <p className="text-xs text-muted-foreground">{outstandingBills.length} bills pending</p>
            <Link to="/finance/bills" className="mt-2 inline-flex items-center text-sm text-primary hover:underline">
              View Bills <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        {/* Overdue Bills Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Bills</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overdueBillsCount}</div>
            <p className="text-xs text-muted-foreground">Action required</p>
            <Link to="/finance/bills" className="mt-2 inline-flex items-center text-sm text-primary hover:underline">
              View Overdue <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        {/* Total Payments Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPaymentsAmount.toFixed(2)} CAD</div>
            <p className="text-xs text-muted-foreground">{totalPayments} payments recorded</p>
            <Link to="/finance/payments" className="mt-2 inline-flex items-center text-sm text-primary hover:underline">
              View Payments <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        {/* Financial Reports Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Financial Reports</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Generate Reports</div>
            <p className="text-xs text-muted-foreground">Access detailed financial analytics.</p>
            <Link to="/finance/reports" className="mt-2 inline-flex items-center text-sm text-primary hover:underline">
              Go to Reports <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-4 p-8">
        <p className="text-muted-foreground">Detailed financial dashboards and charts coming soon!</p>
      </div>
    </div>
  );
};

export default Finance;