import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon } from 'lucide-react';
import GlassSurface from '@/components/GlassSurface';

const Settings = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-1 flex-col gap-4">
      <GlassSurface width="100%" height="auto" borderRadius={10} blur={15} backgroundOpacity={0.1} className="p-4">
        <Card className="w-full bg-transparent border-none shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-rovida-navy">
              <SettingsIcon className="h-6 w-6 text-rovida-gold" /> {t('settings_overview')}
            </CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">
              {t('select_category_manage_settings')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-rovida-slate-green-gray">
              {t('configure_app_settings_description')}
            </p>
          </CardContent>
        </Card>
      </GlassSurface>

      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-8 card-rovida">
        <p className="text-rovida-slate-green-gray">{t('explore_settings_navigation_left')}</p>
      </div>
    </div>
  );
};

export default Settings;