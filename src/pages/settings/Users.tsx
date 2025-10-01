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
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">Users</h1>
        <Button className="btn-primary">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New User
        </Button>
      </header>

      {hasUsers ? (
        <UsersTable users={mockUsers} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight text-rovida-near-black">
              No users found.
            </h3>
            <p className="text-sm text-rovida-slate-green-gray">
              You can start by adding a new user.
            </p>
            <Button className="mt-4 btn-primary">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New User
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsUsers;