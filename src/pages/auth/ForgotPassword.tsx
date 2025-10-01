import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
// Removed Prism import

const ForgotPassword = () => {
  const { t } = useTranslation();

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background p-4"> {/* Set a solid background */}
      {/* Removed Prism component */}
      <Card className="w-full max-w-md card-rovida relative z-10">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold text-page-title">{t('forgot_password')}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">{t('enter_email_receive_reset_link')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-rovida-near-black">{t('email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="border-rovida-soft-gray text-rovida-near-black bg-white/60"
              />
            </div>
            <Button type="submit" className="w-full btn-primary">
              {t('send_reset_link')}
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

export default ForgotPassword;