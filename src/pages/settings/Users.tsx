import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { mockUsers } from '@/data/mock-users';
import UsersTable from '@/components/settings/UsersTable';
import { Card } from '@/components/ui/card'; // Import Card for the empty state

const SettingsUsers = () => {
  const { t } = useTranslation(['settings', 'common']); // Ensure 'settings' and 'common' namespaces are loaded

  const hasUsers = mockUsers.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('users', { ns: 'settings' })}</h1>
        <Button className="btn-primary">
          <PlusCircle className="mr-2 h-4 w-4" /> {t('add new user', { ns: 'settings' })}
        </Button>
      </header>

      {hasUsers ? (
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
            <Button className="mt-4 btn-primary">
              <PlusCircle className="mr-2 h-4 w-4" /> {t('add new user', { ns: 'settings' })}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SettingsUsers;