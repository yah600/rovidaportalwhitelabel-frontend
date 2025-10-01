import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ResetPassword = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-rovida-soft-gray/50 backdrop-blur-md p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-md border-rovida-soft-gray shadow-subtle">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold text-rovida-navy">{t('reset_password')}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">Enter your new password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-rovida-near-black">New Password</Label>
              <Input
                id="password"
                type="password"
                required
                className="border-rovida-soft-gray text-rovida-near-black bg-white/60"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password" className="text-rovida-near-black">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                required
                className="border-rovida-soft-gray text-rovida-near-black bg-white/60"
              />
            </div>
            <Button type="submit" className="w-full btn-primary">
              Reset Password
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-rovida-slate-green-gray">
            <Link to="/auth/login" className="link-rovida">
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;