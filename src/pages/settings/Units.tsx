import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { mockUnits } from '@/data/mock-units';
import UnitsTable from '@/components/settings/UnitsTable';
import { Card } from '@/components/ui/card'; // Import Card for the empty state

const SettingsUnits = () => {
  const { t } = useTranslation(['settings', 'common']); // Ensure 'settings' and 'common' namespaces are loaded

  const hasUnits = mockUnits.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('units', { ns: 'settings' })}</h1>
        <Button className="btn-primary">
          <PlusCircle className="mr-2 h-4 w-4" /> {t('add new unit', { ns: 'settings' })}
        </Button>
      </header>

      {hasUnits ? (
        <div className="card-rovida p-4"> {/* Wrapped content in card-rovida */}
          <UnitsTable units={mockUnits} />
        </div>
      ) : (
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight text-rovida-near-black">
              {t('no units found', { ns: 'settings' })}
            </h3>
            <p className="text-sm text-rovida-slate-green-gray">
              {t('start by adding new unit', { ns: 'settings' })}
            </p>
            <Button className="mt-4 btn-primary">
              <PlusCircle className="mr-2 h-4 w-4" /> {t('add new unit', { ns: 'settings' })}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SettingsUnits;