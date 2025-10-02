import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { PlusCircle, Users } from 'lucide-react'; // Imported Users
import { mockUsers } from '@/data/mock-users';
import UsersTable from '@/components/settings/UsersTable';
import { Card } from '@/components/ui/card'; // Import Card for the empty state
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

const SettingsUsers = () => {
  const { t } = useTranslation(['settings', 'common']); // Ensure 'settings' and 'common' namespaces are loaded
  const { canRead, canCreate } = useAuth();

  const hasUsers = mockUsers.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('users', { ns: 'settings' })}</h1>
        {canCreate('Settings') && ( // Assuming user creation is part of general settings module
          <Button className="btn-primary">
            <PlusCircle className="mr-2 h-4 w-4" /> {t('add new user', { ns: 'settings' })}
          </Button>
        )}
      </header>

      {canRead('Settings') ? ( // Assuming users list is part of general settings module
        hasUsers ? (
          <div className="card-rovida p-4"> {/* Wrapped content in card-rovida */}
            <UsersTable users={mockUsers} />
          </div>
        ) : (
          <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight text-rovida-near-black">
                {t('no users found', { ns: 'settings' })}
              </h3>
              <p className="text-sm text-rovida-slate-green-gray">
                {t('start by adding new user', { ns: 'settings' })}
              </p>
              {canCreate('Settings') && (
                <Button className="mt-4 btn-primary">
                  <PlusCircle className="mr-2 h-4 w-4" /> {t('add new user', { ns: 'settings' })}
                </Button>
              )}
            </div>
          </Card>
        )
      ) : (
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida">
          <div className="flex flex-col items-center gap-1 text-center">
            <Users className="h-12 w-12 text-rovida-gold" />
            <p>{t('no permission view users', { ns: 'common' })}</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SettingsUsers;