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

const Topbar = () => {
  const { t } = useTranslation();

  const userName = "John Doe";
  const buildings = [
    { id: '1', name: 'Building A' },
    { id: '2', name: 'Building B' },
  ];
  const currentBuildingId = '1';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-rovida-soft-gray bg-white/80 backdrop-blur-xl px-4 py-2 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="text-lg font-semibold text-rovida-navy">Gestion Rovida</div>

        <Select defaultValue={currentBuildingId}>
          <SelectTrigger className="w-[180px] border-rovida-soft-gray text-rovida-near-black">
            <SelectValue placeholder={t('select_building')} />
          </SelectTrigger>
          <SelectContent className="bg-white/80 backdrop-blur-xl border-rovida-soft-gray">
            {buildings.map((building) => (
              <SelectItem key={building.id} value={building.id}>
                {building.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-rovida-slate-green-gray" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-8 w-[200px] lg:w-[300px] border-rovida-soft-gray text-rovida-near-black bg-white/60"
          />
        </div>

        <Button variant="ghost" size="icon" className="text-rovida-near-black hover:bg-rovida-soft-gray">
          <Bell className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="sm" className="hidden md:flex text-rovida-near-black hover:bg-rovida-soft-gray">
          <MessageSquareText className="h-4 w-4 mr-2" />
          {t('feedback')}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full border border-rovida-soft-gray hover:bg-rovida-soft-gray">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                <AvatarFallback className="bg-rovida-navy text-white">{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white/80 backdrop-blur-xl border-rovida-soft-gray text-rovida-near-black" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-rovida-slate-green-gray">
                  {/* user email placeholder */}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-rovida-soft-gray" />
            <DropdownMenuItem className="hover:bg-rovida-soft-gray">{t('profile')}</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-rovida-soft-gray">{t('settings')}</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-rovida-soft-gray" />
            <DropdownMenuItem className="hover:bg-rovida-soft-gray">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Topbar;