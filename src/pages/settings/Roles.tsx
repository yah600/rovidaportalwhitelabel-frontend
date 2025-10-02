import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { mockRoles } from '@/data/mock-roles';
import RolesTable from '@/components/settings/RolesTable';

const SettingsRoles = () => {
  const { t } = useTranslation();

  const hasRoles = mockRoles.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('roles')}</h1>
        <Button className="btn-primary">
          <PlusCircle className="mr-2 h-4 w-4" /> {t('create new role')}
        </Button>
      </header>

      {hasRoles ? (
        <RolesTable roles={mockRoles} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight text-rovida-near-black">
              {t('no roles found')}
            </h3>
            <p className="text-sm text-rovida-slate-green-gray">
              {t('start by creating new role')}
            </p>
            <Button className="mt-4 btn-primary">
              <PlusCircle className="mr-2 h-4 w-4" /> {t('create new role')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsRoles;