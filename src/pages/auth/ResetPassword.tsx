import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import GlassSurface from '@/components/GlassSurface'; // Import GlassSurface

const ResetPassword = () => {
  const { t } = useTranslation();

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background p-4">
      <GlassSurface width="100%" height="auto" borderRadius={10} blur={15} backgroundOpacity={0.1} className="max-w-md">
        <Card className="w-full bg-transparent border-none shadow-none relative z-10">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-semibold text-page-title">{t('reset password')}</CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">{t('enter new password below')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-rovida-near-black">{t('new password')}</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  className="border-rovida-soft-gray text-rovida-near-black bg-white/60"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password" className="text-rovida-near-black">{t('confirm new password')}</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  className="border-rovida-soft-gray text-rovida-near-black bg-white/60"
                />
              </div>
              <Button type="submit" className="w-full btn-primary">
                {t('reset password button')}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-rovida-slate-green-gray">
              <Link to="/auth/login" className="link-rovida">
                {t('back to login')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </GlassSurface>
    </div>
  );
};

export default ResetPassword;