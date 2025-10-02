import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import GlassSurface from '@/components/GlassSurface';
import { useUser, MOCK_USERS } from '@/context/UserContext';
import { toast } from 'sonner';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setCurrentUser } = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    const foundUser = MOCK_USERS.find(
      (mockUser) => mockUser.email === email && mockUser.password === password
    );

    if (foundUser) {
      setCurrentUser(foundUser.user);
      toast.success(t('welcome user toast', { name: foundUser.user.name }), {
        description: t('logged in successfully'),
      });
      if (!foundUser.user.onboarded) {
        navigate('/onboarding');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(t('invalid email password'));
      toast.error(t('login failed title'), {
        description: t('invalid email password try again'),
      });
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background p-4">
      <GlassSurface width="100%" height="auto" borderRadius={10} blur={15} backgroundOpacity={0.1} className="max-w-md">
        <Card className="w-full bg-transparent border-none shadow-none relative z-10">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-semibold text-page-title">{t('login to gestion rovida')}</CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">{t('enter credentials access portal')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-rovida-near-black">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="border-rovida-soft-gray text-rovida-near-black bg-white/60"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-rovida-near-black">{t('password')}</Label>
                  <Link to="/auth/forgot" className="ml-auto inline-block text-sm link-rovida">
                    {t('forgot password')}?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  className="border-rovida-soft-gray text-rovida-near-black bg-white/60"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-rovida-error text-sm text-center">{error}</p>}
              <Button type="submit" className="w-full btn-primary">
                {t('login')}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-rovida-slate-green-gray">
              {t('dont have account')}{" "}
              <Link to="#" className="link-rovida">
                {t('sign up')}
              </Link>
            </div>
            <div className="mt-6 text-center text-xs text-rovida-slate-green-gray">
              <p className="font-semibold mb-2">{t('mock user credentials')}</p>
              <ul className="list-disc list-inside text-left mx-auto max-w-xs">
                {MOCK_USERS.map((user) => (
                  <li key={user.email}>{user.email} ({t(user.user.roles[0].name.toLowerCase().replace(/ /g, ''))})</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </GlassSurface>
    </div>
  );
};

export default Login;