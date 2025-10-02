import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/context/UserContext'; // Import useUser
import { toast } from 'sonner'; // Import toast for actions

const Profile = () => {
  const { t } = useTranslation(['profile', 'common']); // Get current user from context
  const { currentUser } = useUser(); // Get current user from context

  const breadcrumbItems = [
    { label: t('profile', { ns: 'profile' }), href: '/profile' },
  ];

  const userName = currentUser?.name || t('guest', { ns: 'common' });
  const userEmail = currentUser?.email || "";
  const userRole = currentUser?.roles[0]?.name || ""; // Assuming first role is primary

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Placeholder for saving profile changes
    toast.success(t('profile updated simulated', { ns: 'profile' }));
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('profile', { ns: 'profile' })}</h1>

      <Card className="max-w-3xl mx-auto w-full card-rovida">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/avatars/01.png" alt={userName} />
            <AvatarFallback className="bg-rovida-navy text-white">{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl text-rovida-navy">{userName}</CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">{userRole}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="md:text-right text-rovida-near-black">{t('full name', { ns: 'profile' })}</Label>
              <Input id="name" type="text" defaultValue={userName} className="md:col-span-3 border-rovida-soft-gray text-rovida-near-black" />
            </div>
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="md:text-right text-rovida-near-black">{t('email', { ns: 'common' })}</Label>
              <Input id="email" type="email" defaultValue={userEmail} disabled className="md:col-span-3 border-rovida-soft-gray text-rovida-near-black" />
            </div>
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="md:text-right text-rovida-near-black">{t('role', { ns: 'profile' })}</Label>
              <Input id="role" type="text" defaultValue={userRole} disabled className="md:col-span-3 border-rovida-soft-gray text-rovida-near-black" />
            </div>
            <Button type="submit" className="w-full btn-primary">
              <Save className="mr-2 h-4 w-4" /> {t('save changes', { ns: 'common' })}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;