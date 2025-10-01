import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Bell, Mail, MessageSquare } from 'lucide-react';

const SettingsNotifications = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-1 flex-col gap-4">
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('notifications')}</h1>

      <Card className="w-full card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('email_notifications')}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">{t('control_email_notifications')}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-issues" className="flex flex-col space-y-1 text-rovida-near-black">
              <span>{t('new_issue_alerts')}</span>
              <span className="font-normal leading-snug text-rovida-slate-green-gray">
                {t('receive_email_new_issue')}
              </span>
            </Label>
            <Switch id="email-issues" defaultChecked className="data-[state=checked]:bg-rovida-gold" />
          </div>
          <Separator className="bg-rovida-soft-gray" />
          <div className="flex items-center justify-between">
            <Label htmlFor="email-announcements" className="flex flex-col space-y-1 text-rovida-near-black">
              <span>{t('announcements_email')}</span>
              <span className="font-normal leading-snug text-rovida-slate-green-gray">
                {t('get_emails_announcements')}
              </span>
            </Label>
            <Switch id="email-announcements" defaultChecked className="data-[state=checked]:bg-rovida-gold" />
          </div>
          <Separator className="bg-rovida-soft-gray" />
          <div className="flex items-center justify-between">
            <Label htmlFor="email-billing" className="flex flex-col space-y-1 text-rovida-near-black">
              <span>{t('billing_reminders')}</span>
              <span className="font-normal leading-snug text-rovida-slate-green-gray">
                {t('receive_reminders_bill_due_dates')}
              </span>
            </Label>
            <Switch id="email-billing" className="data-[state=checked]:bg-rovida-gold" />
          </div>
        </CardContent>
      </Card>

      <Card className="w-full card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('sms_notifications')}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">{t('control_sms_notifications')}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="sms-emergency" className="flex flex-col space-y-1 text-rovida-near-black">
              <span>{t('emergency_alerts')}</span>
              <span className="font-normal leading-snug text-rovida-slate-green-gray">
                {t('receive_critical_alerts_sms')}
              </span>
            </Label>
            <Switch id="sms-emergency" defaultChecked className="data-[state=checked]:bg-rovida-gold" />
          </div>
          <Separator className="bg-rovida-soft-gray" />
          <div className="flex items-center justify-between">
            <Label htmlFor="sms-maintenance" className="flex flex-col space-y-1 text-rovida-near-black">
              <span>{t('maintenance_updates')}</span>
              <span className="font-normal leading-snug text-rovida-slate-green-gray">
                {t('get_sms_maintenance_work')}
              </span>
            </Label>
            <Switch id="sms-maintenance" className="data-[state=checked]:bg-rovida-gold" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsNotifications;