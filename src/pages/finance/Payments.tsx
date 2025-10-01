import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { mockPayments } from '@/data/mock-payments';
import PaymentsTable from '@/components/finance/PaymentsTable';

const FinancePayments = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('finance'), href: '/finance' },
    { label: t('payments'), href: '/finance/payments' },
  ];

  const hasPayments = mockPayments.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('finance')} {t('payments')}</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> {t('record_payment')}
        </Button>
      </header>

      {hasPayments ? (
        <PaymentsTable payments={mockPayments} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              {t('no_payments_found')}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t('start_by_recording_new_payment')}
            </p>
            <Button className="mt-4">
              <PlusCircle className="mr-2 h-4 w-4" /> {t('record_payment')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancePayments;