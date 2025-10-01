import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-1 flex-col gap-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-6 w-6" /> {t('settings')} Overview
          </CardTitle>
          <CardDescription>
            Select a category from the sidebar to manage specific application settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Here you can configure various aspects of your application, from organization details to user management and security.
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-8">
        <p className="text-muted-foreground">Explore the settings categories using the navigation on the left.</p>
      </div>
    </div>
  );
};

export default Settings;