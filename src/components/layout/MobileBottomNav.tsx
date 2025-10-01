import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { LayoutDashboard, ClipboardList, MessageSquare, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from './Sidebar'; // Re-use the Sidebar for the "More" menu

const MobileBottomNav = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const navItems = [
    { title: t('dashboard'), href: '/dashboard', icon: LayoutDashboard },
    { title: t('issues'), href: '/issues', icon: ClipboardList },
    { title: t('communications'), href: '/comms', icon: MessageSquare },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
      <nav className="flex justify-around h-14 items-center">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex flex-col items-center justify-center text-xs text-muted-foreground transition-colors hover:text-primary",
              location.pathname.startsWith(item.href) && "text-primary"
            )}
          >
            <item.icon className="h-5 w-5 mb-1" />
            {item.title}
          </Link>
        ))}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="flex flex-col items-center justify-center text-xs text-muted-foreground transition-colors hover:text-primary h-full"
            >
              <MoreHorizontal className="h-5 w-5 mb-1" />
              More
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <Sidebar className="w-full" />
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default MobileBottomNav;