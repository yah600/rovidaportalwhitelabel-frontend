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

  // Placeholder for user and building data
  const userName = "John Doe";
  const buildings = [
    { id: '1', name: 'Building A' },
    { id: '2', name: 'Building B' },
  ];
  const currentBuildingId = '1'; // Default selected building

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background px-4 py-2 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {/* Client Logo - Placeholder */}
        <div className="text-lg font-semibold text-primary">Gestion Rovida</div>

        {/* Building Selector */}
        <Select defaultValue={currentBuildingId}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('select_building')} />
          </SelectTrigger>
          <SelectContent>
            {buildings.map((building) => (
              <SelectItem key={building.id} value={building.id}>
                {building.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-8 w-[200px] lg:w-[300px]"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        {/* Feedback Button */}
        <Button variant="ghost" size="sm" className="hidden md:flex">
          <MessageSquareText className="h-4 w-4 mr-2" />
          {t('feedback')}
        </Button>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                <AvatarFallback>{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {/* user email placeholder */}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{t('profile')}</DropdownMenuItem>
            <DropdownMenuItem>{t('settings')}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Topbar;