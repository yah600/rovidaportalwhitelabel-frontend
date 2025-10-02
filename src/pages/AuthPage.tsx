import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const AuthPage = () => {
  const { t } = useTranslation(['auth', 'common']); // Specify namespaces for AuthPage
  const location = useLocation();
  const isLoginPage = location.pathname === '/auth/login';
  const isRegisterPage = location.pathname === '/auth/register';
  const isForgotPasswordPage = location.pathname === '/auth/forgot-password';

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rovida-light-blue to-rovida-light-green p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-xl border-rovida-soft-gray shadow-lg">
        <CardHeader className="text-center">
          <img src="/AVERO.png" alt={t('welcome to gestion rovida', { ns: 'common' })} className="mx-auto h-10 w-auto mb-4" />
          <CardTitle className="text-2xl text-rovida-navy">{t('welcome back', { ns: 'auth' })}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">
            {t('enter credentials access account', { ns: 'auth' })}
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
                  {t('register', { ns: 'auth' })}
                </Link>
              </TabsTrigger>
            </TabsList>
            <div className="mt-4">
              <Outlet /> {/* Renders Login, Register, or ForgotPassword components */}
            </div>
          </Tabs>
          {isLoginPage && (
            <p className="mt-4 text-center text-sm text-rovida-slate-green-gray">
              {t('forgot password question', { ns: 'auth' })}{' '}
              <Link to="/auth/forgot-password" className="link-rovida">
                {t('reset here', { ns: 'auth' })}
              </Link>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;