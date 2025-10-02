import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import GlassSurface from '@/components/GlassSurface'; // Import GlassSurface for consistent styling

const AuthPage = () => {
  const { t } = useTranslation(['auth', 'common']);
  const location = useLocation();
  const isLoginPage = location.pathname === '/auth/login';
  const isRegisterPage = location.pathname === '/auth/register';
  const isForgotPasswordPage = location.pathname === '/auth/forgot'; // Corrected path for forgot password

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background p-4">
      <GlassSurface width="100%" height="auto" borderRadius={10} blur={15} backgroundOpacity={0.1} className="max-w-md">
        <Card className="w-full bg-transparent border-none shadow-none relative z-10">
          <CardHeader className="text-center">
            <img src="/AVERO.png" alt={t('welcome to gestion rovida', { ns: 'common' })} className="mx-auto h-10 w-auto mb-4" />
            <CardTitle className="text-2xl text-rovida-navy">{t('welcome back', { ns: 'auth' })}</CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">
              {t('enter email password access account', { ns: 'auth' })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={isRegisterPage ? "register" : "login"} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-rovida-soft-gray">
                <TabsTrigger value="login" asChild>
                  <Link
                    to="/auth/login"
                    className={cn(
                      "data-[state=active]:bg-rovida-navy data-[state=active]:text-white",
                      isLoginPage ? "bg-rovida-navy text-white" : ""
                    )}
                  >
                    {t('login', { ns: 'auth' })}
                  </Link>
                </TabsTrigger>
                <TabsTrigger value="register" asChild>
                  <Link
                    to="/auth/register"
                    className={cn(
                      "data-[state=active]:bg-rovida-navy data-[state=active]:text-white",
                      isRegisterPage ? "bg-rovida-navy text-white" : ""
                    )}
                  >
                    {t('sign up', { ns: 'auth' })}
                  </Link>
                </TabsTrigger>
              </TabsList>
              <div className="mt-4">
                <Outlet /> {/* Renders Login, Register, or ForgotPassword components */}
              </div>
            </Tabs>
            {isLoginPage && (
              <p className="mt-4 text-center text-sm text-rovida-slate-green-gray">
                {t('forgot password', { ns: 'auth' })}?{' '}
                <Link to="/auth/forgot" className="link-rovida">
                  {t('reset password', { ns: 'auth' })}
                </Link>
              </p>
            )}
          </CardContent>
        </Card>
      </GlassSurface>
    </div>
  );
};

export default AuthPage;