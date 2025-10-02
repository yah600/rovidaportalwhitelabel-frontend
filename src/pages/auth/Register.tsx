import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import { toast } from 'sonner';

const Register = () => {
  const { t } = useTranslation(['auth', 'common']);
  const navigate = useNavigate();
  const { registerUser, setCurrentUser } = useUser();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError(t('fill all fields', { ns: 'onboarding' }));
      toast.error(t('registration failed title', { ns: 'auth' }), {
        description: t('fill all fields description', { ns: 'auth' }),
      });
      return;
    }

    try {
      const newUser = registerUser(name, email, password);
      setCurrentUser(newUser); // Log in the new user immediately
      toast.success(t('registration successful title', { ns: 'auth' }), {
        description: t('registration successful description', { ns: 'auth' }),
      });
      navigate('/onboarding'); // Direct to onboarding after registration
    } catch (e: any) {
      setError(e.message);
      toast.error(t('registration failed title', { ns: 'auth' }), {
        description: e.message,
      });
    }
  };

  return (
    <Card className="w-full bg-transparent border-none shadow-none relative z-10">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-semibold text-page-title">{t('create account', { ns: 'auth' })}</CardTitle>
        <CardDescription className="text-rovida-slate-green-gray">{t('enter details create account', { ns: 'auth' })}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-rovida-near-black">{t('full name', { ns: 'common' })}</Label>
            <Input
              id="name"
              type="text"
              placeholder={t('enter full name', { ns: 'onboarding' })}
              required
              className="border-rovida-soft-gray text-rovida-near-black bg-white/60"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-rovida-near-black">{t('email', { ns: 'common' })}</Label>
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
            <Label htmlFor="password" className="text-rovida-near-black">{t('password', { ns: 'auth' })}</Label>
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
            {t('sign up', { ns: 'auth' })}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm text-rovida-slate-green-gray">
          {t('already have account', { ns: 'auth' })}{" "}
          <Link to="/auth/login" className="link-rovida">
            {t('login', { ns: 'auth' })}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default Register;