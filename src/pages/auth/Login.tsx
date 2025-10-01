import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import GlassSurface from '@/components/GlassSurface';
import { useUser, MOCK_USERS } from '@/context/UserContext'; // Import MOCK_USERS and useUser
import { toast } from 'sonner'; // Import toast for notifications

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
      toast.success(t('welcome_user_toast', { name: foundUser.user.name }), {
        description: t('logged_in_successfully'),
      });
      if (!foundUser.user.onboarded) {
        navigate('/onboarding'); // Redirect to onboarding if not yet completed
      } else {
        navigate('/dashboard'); // Redirect to dashboard on successful login
      }
    } else {
      setError(t('invalid_email_password'));
      toast.error(t('login_failed_title'), {
        description: t('invalid_email_password_try_again'),
      });
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background p-4">
      <GlassSurface width="100%" height="auto" borderRadius={10} blur={15} backgroundOpacity={0.1} className="max-w-md">
        <Card className="w-full bg-transparent border-none shadow-none relative z-10">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-semibold text-page-title">{t('login_to_gestion_rovida')}</CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">{t('enter_credentials_access_portal')}</CardDescription>
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
                    {t('forgot_password')}?
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
              {t('dont_have_account')}{" "}
              <Link to="#" className="link-rovida">
                {t('sign_up')}
              </Link>
            </div>
            <div className="mt-6 text-center text-xs text-rovida-slate-green-gray">
              <p className="font-semibold mb-2">{t('mock_user_credentials')}</p>
              <ul className="list-disc list-inside text-left mx-auto max-w-xs">
                {MOCK_USERS.map((user) => (
                  <li key={user.email}>{user.email} ({user.user.roles[0].name})</li>
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