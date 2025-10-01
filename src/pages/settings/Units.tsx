import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { mockUnits } from '@/data/mock-units';
import UnitsTable from '@/components/settings/UnitsTable';

const SettingsUnits = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('settings'), href: '/settings' },
    { label: 'Units', href: '/settings/units' },
  ];

  const hasUnits = mockUnits.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">{t('settings')} Units</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Unit
        </Button>
      </header>

      {hasUnits ? (
        <UnitsTable units={mockUnits} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              No units found.
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start by adding a new unit.
            </p>
            <Button className="mt-4">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Unit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsUnits;