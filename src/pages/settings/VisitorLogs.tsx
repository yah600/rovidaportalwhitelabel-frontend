import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserCheck, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SettingsVisitorLogs = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-1 flex-col gap-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('visitor_logs')}</h1>
        <Button className="btn-primary">
          <PlusCircle className="mr-2 h-4 w-4" /> {t('add_new_visitor')}
        </Button>
      </header>
      <p className="text-rovida-slate-green-gray">{t('track_manage_visitor_access')}</p>

      <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
        <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
          <UserCheck className="h-12 w-12 text-rovida-gold" />
          <p>{t('visitor_logs_managed_here')}</p>
          <Button variant="outline" className="mt-4 btn-secondary">
            <PlusCircle className="mr-2 h-4 w-4" /> {t('add_first_visitor')}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SettingsVisitorLogs;