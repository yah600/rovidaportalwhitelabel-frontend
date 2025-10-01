import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Prism from '@/components/Prism'; // Import Prism

const Login = () => {
  const { t } = useTranslation();

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-rovida-soft-gray/50 backdrop-blur-xl p-4">
      <Prism
        animationType="rotate"
        timeScale={0.2} // Reduced timeScale for slower animation
        height={3.5}
        baseWidth={5.5}
        scale={3.6}
        hueShift={0}
        colorFrequency={1}
        noise={0.2} // Reduced noise for a smoother effect
        glow={0.5} // Reduced glow intensity
        transparent={true}
      />
      <Card className="w-full max-w-md card-rovida relative z-10">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold text-page-title">Login to Gestion Rovida</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">Enter your credentials to access the portal.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-rovida-near-black">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="border-rovida-soft-gray text-rovida-near-black bg-white/60"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-rovida-near-black">Password</Label>
                <Link to="/auth/forgot" className="ml-auto inline-block text-sm link-rovida">
                  {t('forgot_password')}?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                className="border-rovida-soft-gray text-rovida-near-black bg-white/60"
              />
            </div>
            <Button type="submit" className="w-full btn-primary">
              {t('login')}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-rovida-slate-green-gray">
            Don't have an account?{" "}
            <Link to="#" className="link-rovida">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;