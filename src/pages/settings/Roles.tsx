import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { PlusCircle, Users } from 'lucide-react'; // Imported Users
import { mockRoles } from '@/data/mock-roles';
import RolesTable from '@/components/settings/RolesTable';
import { Card } from '@/components/ui/card'; // Import Card for the empty state
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

const SettingsRoles = () => {
  const { t } = useTranslation();
  const { canRead, canCreate } = useAuth();

  const hasRoles = mockRoles.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('roles')}</h1>
        {canCreate('Settings') && ( // Assuming role creation is part of general settings module
          <Button className="btn-primary">
            <PlusCircle className="mr-2 h-4 w-4" /> {t('create new role')}
          </Button>
        )}
      </header>

      {canRead('Settings') ? ( // Assuming roles list is part of general settings module
        hasRoles ? (
          <div className="card-rovida p-4"> {/* Wrapped content in card-rovida */}
            <RolesTable roles={mockRoles} />
          </div>
        ) : (
          <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight text-rovida-near-black">
                {t('no roles found')}
              </h3>
              <p className="text-sm text-rovida-slate-green-gray">
                {t('start by creating new role')}
              </p>
              {canCreate('Settings') && (
                <Button className="mt-4 btn-primary">
                  <PlusCircle className="mr-2 h-4 w-4" /> {t('create new role')}
                </Button>
              )}
            </div>
          </Card>
        )
      ) : (
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida">
          <div className="flex flex-col items-center gap-1 text-center">
            <Users className="h-12 w-12 text-rovida-gold" />
            <p>{t('no permission view roles', { ns: 'common' })}</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SettingsRoles;