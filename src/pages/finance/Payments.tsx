import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { mockPayments } from '@/data/mock-payments';
import PaymentsTable from '@/components/finance/PaymentsTable';
import { Card } from '@/components/ui/card'; // Import Card for the empty state
import { toast } from 'sonner'; // Import toast for actions

const FinancePayments = () => {
  const { t } = useTranslation(['finance', 'common']); // Ensure 'finance' and 'common' namespaces are loaded
  const breadcrumbItems = [
    { label: t('finance', { ns: 'finance' }), href: '/finance' },
    { label: t('payments', { ns: 'finance' }), href: '/finance/payments' },
  ];

  const hasPayments = mockPayments.length > 0;

  const handleRecordPayment = () => {
    toast.info(t('record payment action', { ns: 'finance' })); // Placeholder action with toast
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('finance', { ns: 'finance' })} {t('payments', { ns: 'finance' })}</h1>
        <Button className="btn-primary" onClick={handleRecordPayment}>
          <PlusCircle className="mr-2 h-4 w-4" /> {t('record payment', { ns: 'finance' })}
        </Button>
      </header>

      {hasPayments ? (
        <div className="card-rovida p-4"> {/* Wrapped content in card-rovida */}
          <PaymentsTable payments={mockPayments} />
        </div>
      ) : (
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight text-rovida-near-black">
              {t('no payments found', { ns: 'finance' })}
            </h3>
            <p className="text-sm text-rovida-slate-green-gray">
              {t('start by recording new payment', { ns: 'finance' })}
            </p>
            <Button className="mt-4 btn-primary" onClick={handleRecordPayment}>
              <PlusCircle className="mr-2 h-4 w-4" /> {t('record payment', { ns: 'finance' })}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default FinancePayments;