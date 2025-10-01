import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { mockBuildings } from '@/data/mock-buildings';
import BuildingsTable from '@/components/settings/BuildingsTable';

const SettingsBuildings = () => {
  const { t } = useTranslation();

  const hasBuildings = mockBuildings.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">Buildings</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Building
        </Button>
      </header>

      {hasBuildings ? (
        <BuildingsTable buildings={mockBuildings} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              No buildings found.
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start by adding a new building.
            </p>
            <Button className="mt-4">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Building
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsBuildings;