import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Search, MessageSquareText } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUser } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import LanguageToggle from './LanguageToggle';
import { useAuth } from '@/hooks/useAuth';

const Topbar = () => {
  const { t } = useTranslation(['common', 'dashboard', 'settings', 'auth']); // Specify namespaces
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useUser();
  const { canRead } = useAuth();

  const userName = currentUser?.name || t("guest", { ns: 'common' });
  const userEmail = currentUser?.email || "";
  const buildings = [
    { id: '1', name: t('building a', { ns: 'common' }) },
    { id: '2', name: t('building b', { ns: 'common' }) },
  ];
  const currentBuildingId = '1';

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    console.log("Search Term:", event.target.value);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    toast.info(t('logged out title', { ns: 'common' }), {
      description: t('logged out description', { ns: 'common' }),
    });
    navigate('/auth/login');
  };

  const handleNotificationsClick = () => {
    if (canRead('Settings')) {
      navigate('/settings/notifications');
    } else {
      toast.error(t('permission denied', { ns: 'common' }), {
        description: t('no permission view notifications', { ns: 'common' }),
      });
    }
  };

  const handleFeedbackClick = () => {
    if (canRead('Settings')) { // Feedback is part of Settings module
      navigate('/settings/feedback');
    } else {
      toast.error(t('permission denied', { ns: 'common' }), {
        description: t('no permission send feedback', { ns: 'common' }),
      });
    }
  };

  const [searchTerm, setSearchTerm] = React.useState('');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-rovida-soft-gray bg-white/80 backdrop-blur-xl px-4 py-2 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-4">
        <img src="/AVERO.png" alt={t('welcome to gestion rovida', { ns: 'common' })} className="h-10 w-auto" />

        {currentUser && (
          <Select defaultValue={currentBuildingId}>
            <SelectTrigger className="w-[180px] border-rovida-soft-gray text-rovida-near-black bg-white/60 backdrop-blur-sm">
              <SelectValue placeholder={t('select building', { ns: 'common' })} />
            </SelectTrigger>
            <SelectContent className="bg-white/80 backdrop-blur-xl border-rovida-soft-gray">
              {buildings.map((building) => (
                <SelectItem key={building.id} value={building.id}>
                  {building.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {currentUser && (
          <>
            <div className="relative hidden md:block">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-rovida-slate-green-gray" />
              <Input
                type="text"
                placeholder={t('search placeholder', { ns: 'common' })}
                className="pl-8 w-[200px] lg:w-[300px] border-rovida-soft-gray text-rovida-near-black bg-white/60 backdrop-blur-sm"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            <Button variant="ghost" size="icon" className="text-rovida-near-black hover:bg-rovida-soft-gray" onClick={handleNotificationsClick}>
              <Bell className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="sm" className="hidden md:flex text-rovida-near-black hover:bg-rovida-soft-gray" onClick={handleFeedbackClick}>
              <MessageSquareText className="h-4 w-4 mr-2" />
              {t('feedback', { ns: 'common' })}
            </Button>
          </>
        )}

        <LanguageToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full border border-rovida-soft-gray hover:bg-rovida-soft-gray">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt={userName} />
                <AvatarFallback className="bg-rovida-navy text-white">{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white/80 backdrop-blur-xl border-rovida-soft-gray text-rovida-near-black" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-rovida-slate-green-gray">
                  {userEmail}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-rovida-soft-gray" />
            <DropdownMenuItem className="hover:bg-rovida-soft-gray" onClick={() => navigate('/profile')}>{t('profile', { ns: 'common' })}</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-rovida-soft-gray" onClick={() => navigate('/settings')}>{t('settings', { ns: 'common' })}</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-rovida-soft-gray" />
            <DropdownMenuItem className="hover:bg-rovida-soft-gray" onClick={handleLogout}>{t('logout', { ns: 'common' })}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Topbar;