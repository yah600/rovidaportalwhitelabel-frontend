import React from 'react';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-1 flex-col gap-4">
      <h1 className="text-2xl font-semibold md:text-3xl">{t('profile')}</h1>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <p className="text-muted-foreground">User profile details will be here.</p>
      </div>
    </div>
  );
};

export default Profile;