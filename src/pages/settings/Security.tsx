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
      <h1 className="text-2xl font-semibold md:text-3xl">Security</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Two-Factor Authentication</CardTitle>
            <CardDescription>Add an extra layer of security to your account.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <Label htmlFor="2fa-mode" className="flex flex-col space-y-1">
              <span>Enable 2FA</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Requires a verification code from your phone.
              </span>
            </Label>
            <Switch id="2fa-mode" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Password Management</CardTitle>
            <CardDescription>Update your password or set a new one.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Key className="mr-2 h-4 w-4" /> Change Password
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Sessions</CardTitle>
            <CardDescription>See where you are currently logged in.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <ShieldCheck className="mr-2 h-4 w-4" /> Manage Sessions
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-4">
        <p className="text-muted-foreground">Advanced security settings will be here.</p>
      </div>
    </div>
  );
};

export default SettingsSecurity;