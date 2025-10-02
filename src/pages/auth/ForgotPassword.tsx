import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import GlassSurface from '@/components/GlassSurface'; // Import GlassSurface

const ForgotPassword = () => {
  const { t } = useTranslation();

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background p-4">
      <GlassSurface width="100%" height="auto" borderRadius={10} blur={15} backgroundOpacity={0.1} className="max-w-md">
        <Card className="w-full bg-transparent border-none shadow-none relative z-10">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-semibold text-page-title">{t('forgot password')}</CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">{t('enter email receive reset link')}</CardDescription>
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
                {t('send reset link')}
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

export default ForgotPassword;