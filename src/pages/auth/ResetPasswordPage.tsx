import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ResetPasswordPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md card-rovida">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-page-title">{t('reset password')}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">
            {t('enter new password below')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-rovida-near-black">{t('new password')}</Label>
              <Input id="password" type="password" required className="border-rovida-soft-gray text-rovida-near-black" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password" className="md:text-right text-rovida-near-black">{t('confirm new password')}</Label>
              <Input id="confirm-password" type="password" required className="border-rovida-soft-gray text-rovida-near-black" />
            </div>
            <Button type="submit" className="w-full btn-primary">
              {t('reset password button')}
            </Button>
            <div className="mt-4 text-center text-sm text-rovida-slate-green-gray">
              <Link to="/auth/login" className="link-rovida">
                {t('return to login')}
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;