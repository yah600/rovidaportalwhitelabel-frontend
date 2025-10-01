import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockBills } from '@/data/mock-bills';
import BillsTable from '@/components/finance/BillsTable';

const FinanceBills = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('finance'), href: '/finance' },
    { label: t('bills'), href: '/finance/bills' },
  ];

  const hasBills = mockBills.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('finance')} {t('bills')}</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> {t('create_new_bill')}
        </Button>
      </header>

      {hasBills ? (
        <BillsTable bills={mockBills} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              {t('no_bills_found')}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t('start_by_creating_new_bill')}
            </p>
            <Button className="mt-4">
              <PlusCircle className="mr-2 h-4 w-4" /> {t('create_new_bill')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceBills;