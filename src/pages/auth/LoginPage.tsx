import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md card-rovida">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-page-title">{t('login')}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">
            Enter your email and password to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-rovida-near-black">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required className="border-rovida-soft-gray text-rovida-near-black" />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-rovida-near-black">Password</Label>
                <Link to="/auth/forgot" className="ml-auto inline-block text-sm link-rovida">
                  {t('forgot_password')}?
                </Link>
              </div>
              <Input id="password" type="password" required className="border-rovida-soft-gray text-rovida-near-black" />
            </div>
            <Button type="submit" className="w-full btn-primary">
              {t('login')}
            </Button>
            {/* Placeholder for social login or other options */}
            <div className="mt-4 text-center text-sm text-rovida-slate-green-gray">
              Don&apos;t have an account?{" "}
              <Link to="#" className="link-rovida">
                Sign up
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;