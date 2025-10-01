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
      <h1 className="text-2xl font-semibold md:text-3xl">Notifications</h1>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Control which email notifications you receive.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-issues" className="flex flex-col space-y-1">
              <span>New Issue Alerts</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Receive an email when a new issue is reported in your building.
              </span>
            </Label>
            <Switch id="email-issues" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <Label htmlFor="email-announcements" className="flex flex-col space-y-1">
              <span>Announcements</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Get emails for important building announcements.
              </span>
            </Label>
            <Switch id="email-announcements" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <Label htmlFor="email-billing" className="flex flex-col space-y-1">
              <span>Billing Reminders</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Receive reminders for upcoming bill due dates.
              </span>
            </Label>
            <Switch id="email-billing" />
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>SMS Notifications</CardTitle>
          <CardDescription>Control which SMS notifications you receive.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="sms-emergency" className="flex flex-col space-y-1">
              <span>Emergency Alerts</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Receive critical alerts via SMS.
              </span>
            </Label>
            <Switch id="sms-emergency" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <Label htmlFor="sms-maintenance" className="flex flex-col space-y-1">
              <span>Maintenance Updates</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Get SMS updates for maintenance work affecting your unit.
              </span>
            </Label>
            <Switch id="sms-maintenance" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsNotifications;