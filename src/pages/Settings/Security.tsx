import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Key, ShieldCheck } from 'lucide-react';

const SettingsSecurity = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-1 flex-col gap-4">
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('security')}</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="card-rovida">
          <CardHeader>
            <CardTitle className="text-rovida-navy">{t('two factor authentication')}</CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">{t('add extra layer security')}</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <Label htmlFor="2fa-mode" className="flex flex-col space-y-1 text-rovida-near-black">
              <span>{t('enable 2fa')}</span>
              <span className="font-normal leading-snug text-rovida-slate-green-gray">
                {t('requires verification code')}
              </span>
            </Label>
            <Switch id="2fa-mode" className="data-[state=checked]:bg-rovida-gold" />
          </CardContent>
        </Card>

        <Card className="card-rovida">
          <CardHeader>
            <CardTitle className="text-rovida-navy">{t('password management')}</CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">{t('update password set new')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full btn-secondary">
              <Key className="mr-2 h-4 w-4" /> {t('change password')}
            </Button>
          </CardContent>
        </Card>

        <Card className="card-rovida">
          <CardHeader>
            <CardTitle className="text-rovida-navy">{t('active sessions')}</CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">{t('see where logged in')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full btn-secondary">
              <ShieldCheck className="mr-2 h-4 w-4" /> {t('manage sessions')}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4">
        <p className="text-rovida-slate-green-gray">{t('advanced security settings here')}</p>
      </div>
    </div>
  );
};

export default SettingsSecurity;