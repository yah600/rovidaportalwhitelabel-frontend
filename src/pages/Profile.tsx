import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Profile = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('profile'), href: '/profile' },
  ];

  // Placeholder for user data
  const currentUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Property Manager',
    avatarUrl: '/avatars/01.png', // Example avatar
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Placeholder for saving profile changes
    alert('Profile updated! (Simulated)');
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('profile')}</h1>

      <Card className="max-w-3xl mx-auto w-full card-rovida">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
            <AvatarFallback className="bg-rovida-navy text-white">{currentUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl text-rovida-navy">{currentUser.name}</CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">{currentUser.role}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="md:text-right text-rovida-near-black">{t('full_name')}</Label>
              <Input id="name" type="text" defaultValue={currentUser.name} className="md:col-span-3 border-rovida-soft-gray text-rovida-near-black" />
            </div>
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="md:text-right text-rovida-near-black">{t('email')}</Label>
              <Input id="email" type="email" defaultValue={currentUser.email} disabled className="md:col-span-3 border-rovida-soft-gray text-rovida-near-black" />
            </div>
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="md:text-right text-rovida-near-black">{t('role')}</Label>
              <Input id="role" type="text" defaultValue={currentUser.role} disabled className="md:col-span-3 border-rovida-soft-gray text-rovida-near-black" />
            </div>
            <Button type="submit" className="w-full btn-primary">
              <Save className="mr-2 h-4 w-4" /> {t('save_changes')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;