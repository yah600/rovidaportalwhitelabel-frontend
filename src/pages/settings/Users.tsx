import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { mockUsers } from '@/data/mock-users';
import UsersTable from '@/components/settings/UsersTable';

const SettingsUsers = () => {
  const { t } = useTranslation();

  const hasUsers = mockUsers.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('users')}</h1>
        <Button className="btn-primary">
          <PlusCircle className="mr-2 h-4 w-4" /> {t('add_new_user')}
        </Button>
      </header>

      {hasUsers ? (
        <UsersTable users={mockUsers} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight text-rovida-near-black">
              {t('no_users_found')}
            </h3>
            <p className="text-sm text-rovida-slate-green-gray">
              {t('start_by_adding_new_user')}
            </p>
            <Button className="mt-4 btn-primary">
              <PlusCircle className="mr-2 h-4 w-4" /> {t('add_new_user')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsUsers;