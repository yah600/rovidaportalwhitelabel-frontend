import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockBills } from '@/data/mock-bills';
import BillsTable from '@/components/finance/BillsTable';
import { Card } from '@/components/ui/card'; // Import Card for the empty state
import { toast } from 'sonner'; // Import toast for actions
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

const FinanceBills = () => {
  const { t } = useTranslation(['finance', 'common']); // Ensure 'finance' and 'common' namespaces are loaded
  const { canRead, canCreate } = useAuth();

  const breadcrumbItems = [
    { label: t('finance', { ns: 'finance' }), href: '/finance' },
    { label: t('bills', { ns: 'finance' }), href: '/finance/bills' },
  ];

  const hasBills = mockBills.length > 0;

  const handleCreateNewBill = () => {
    toast.info(t('create new bill action', { ns: 'finance' })); // Placeholder action with toast
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('finance', { ns: 'finance' })} {t('bills', { ns: 'finance' })}</h1>
        {canCreate('Finance - Bills/Recurring/Deposits') && (
          <Button className="btn-primary" onClick={handleCreateNewBill}>
            <PlusCircle className="mr-2 h-4 w-4" /> {t('create new bill', { ns: 'finance' })}
          </Button>
        )}
      </header>

      {canRead('Finance - Bills/Recurring/Deposits') ? (
        hasBills ? (
          <div className="card-rovida p-4"> {/* Wrapped content in card-rovida */}
            <BillsTable bills={mockBills} />
          </div>
        ) : (
          <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight text-rovida-near-black">
                {t('no bills found', { ns: 'finance' })}
              </h3>
              <p className="text-sm text-rovida-slate-green-gray">
                {t('start by creating new bill', { ns: 'finance' })}
              </p>
              {canCreate('Finance - Bills/Recurring/Deposits') && (
                <Button className="mt-4 btn-primary" onClick={handleCreateNewBill}>
                  <PlusCircle className="mr-2 h-4 w-4" /> {t('create new bill', { ns: 'finance' })}
                </Button>
              )}
            </div>
          </Card>
        )
      ) : (
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida">
          <div className="flex flex-col items-center gap-1 text-center">
            <Receipt className="h-12 w-12 text-rovida-gold" />
            <p>{t('no permission view bills', { ns: 'common' })}</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default FinanceBills;