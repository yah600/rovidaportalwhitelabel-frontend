import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { PlusCircle, Building } from 'lucide-react'; // Imported Building
import { mockBuildings } from '@/data/mock-buildings';
import BuildingsTable from '@/components/settings/BuildingsTable';
import { Card } from '@/components/ui/card'; // Import Card for the empty state
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

const SettingsBuildings = () => {
  const { t } = useTranslation(['settings', 'common']); // Ensure 'settings' and 'common' namespaces are loaded
  const { canRead, canCreate } = useAuth();

  const hasBuildings = mockBuildings.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('buildings', { ns: 'settings' })}</h1>
        {canCreate('Settings') && ( // Assuming building creation is part of general settings module
          <Button className="btn-primary">
            <PlusCircle className="mr-2 h-4 w-4" /> {t('add new building', { ns: 'settings' })}
          </Button>
        )}
      </header>

      {canRead('Settings') ? ( // Assuming buildings list is part of general settings module
        hasBuildings ? (
          <div className="card-rovida p-4"> {/* Wrapped content in card-rovida */}
            <BuildingsTable buildings={mockBuildings} />
          </div>
        ) : (
          <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight text-rovida-near-black">
                {t('no buildings found', { ns: 'settings' })}
              </h3>
              <p className="text-sm text-rovida-slate-green-gray">
                {t('start by adding new building', { ns: 'settings' })}
              </p>
              {canCreate('Settings') && (
                <Button className="mt-4 btn-primary">
                  <PlusCircle className="mr-2 h-4 w-4" /> {t('add new building', { ns: 'settings' })}
                </Button>
              )}
            </div>
          </Card>
        )
      ) : (
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida">
          <div className="flex flex-col items-center gap-1 text-center">
            <Building className="h-12 w-12 text-rovida-gold" />
            <p>{t('no permission view buildings', { ns: 'common' })}</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SettingsBuildings;