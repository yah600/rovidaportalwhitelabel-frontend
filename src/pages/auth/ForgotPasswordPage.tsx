import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ForgotPasswordPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md card-rovida">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-page-title">{t('forgot_password')}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">
            {t('enter_email_receive_reset_link')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-rovida-near-black">{t('email')}</Label>
              <Input id="email" type="email" placeholder="m@example.com" required className="border-rovida-soft-gray text-rovida-near-black" />
            </div>
            <Button type="submit" className="w-full btn-primary">
              {t('send_reset_link')}
            </Button>
            <div className="mt-4 text-center text-sm text-rovida-slate-green-gray">
              {t('remember_password')}{" "}
              <Link to="/auth/login" className="link-rovida">
                {t('login')}
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;