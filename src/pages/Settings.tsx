import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon } from 'lucide-react';
import GlassSurface from '@/components/GlassSurface';

const Settings = () => {
  const { t } = useTranslation(['settings', 'common']); // Ensure 'settings' and 'common' namespaces are loaded

  return (
    <div className="flex flex-1 flex-col gap-4">
      <GlassSurface width="100%" height="auto" borderRadius={10} blur={15} backgroundOpacity={0.1} className="p-4">
        <Card className="w-full bg-transparent border-none shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-rovida-navy">
              <SettingsIcon className="h-6 w-6 text-rovida-gold" /> {t('settings overview', { ns: 'settings' })}
            </CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">
              {t('select category manage settings', { ns: 'settings' })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-rovida-slate-green-gray">
              {t('configure app settings description', { ns: 'settings' })}
            </p>
          </CardContent>
        </Card>
      </GlassSurface>

      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-8 card-rovida">
        <p className="text-rovida-slate-green-gray">{t('explore settings navigation left', { ns: 'settings' })}</p>
      </div>
    </div>
  );
};

export default Settings;