import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
// Removed Prism import

const ResetPassword = () => {
  const { t } = useTranslation();

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background p-4"> {/* Set a solid background */}
      {/* Removed Prism component */}
      <Card className="w-full max-w-md card-rovida relative z-10">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold text-page-title">{t('reset_password')}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">{t('enter_new_password')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-rovida-near-black">{t('new_password')}</Label>
              <Input
                id="password"
                type="password"
                required
                className="border-rovida-soft-gray text-rovida-near-black bg-white/60"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password" className="text-rovida-near-black">{t('confirm_new_password')}</Label>
              <Input
                id="confirm-password"
                type="password"
                required
                className="border-rovida-soft-gray text-rovida-near-black bg-white/60"
              />
            </div>
            <Button type="submit" className="w-full btn-primary">
              {t('reset_password_button')}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-rovida-slate-green-gray">
            <Link to="/auth/login" className="link-rovida">
              {t('back_to_login')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;