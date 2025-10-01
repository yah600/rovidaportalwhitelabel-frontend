import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import {
  Building,
  Users,
  ShieldCheck,
  Bell,
  FileText,
  MessageSquareText,
  Settings as SettingsIcon,
  Scale,
  Handshake,
} from 'lucide-react';
import BreadcrumbNav from '@/components/BreadcrumbNav';

interface SettingsNavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const settingsNavItems: SettingsNavItem[] = [
  {
    title: 'Organization',
    href: '/settings/org',
    icon: SettingsIcon,
  },
  {
    title: 'Buildings',
    href: '/settings/buildings',
    icon: Building,
  },
  {
    title: 'Units',
    href: '/settings/units',
    icon: Scale,
  },
  {
    title: 'Users',
    href: '/settings/users',
    icon: Users,
  },
  {
    title: 'Roles',
    href: '/settings/roles',
    icon: Handshake,
  },
  {
    title: 'Security',
    href: '/settings/security',
    icon: ShieldCheck,
  },
  {
    title: 'Notifications',
    href: '/settings/notifications',
    icon: Bell,
  },
  {
    title: 'Audit Log',
    href: '/settings/audit',
    icon: FileText,
  },
  {
    title: 'Feedback',
    href: '/settings/feedback',
    icon: MessageSquareText,
  },
];

const SettingsLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();

  // Generate breadcrumb items dynamically based on current path and settingsNavItems
  const generateBreadcrumbItems = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    let currentPath = '';
    const items = [{ label: t('home'), href: '/' }];

    pathnames.forEach((name, index) => {
      currentPath += `/${name}`;
      if (name === 'settings' && index === 0) {
        items.push({ label: t('settings'), href: '/settings' });
      } else {
        const navItem = settingsNavItems.find(item => item.href === currentPath);
        if (navItem) {
          items.push({ label: navItem.title, href: navItem.href });
        } else {
          // Fallback for dynamic segments or untranslated paths
          const translatedLabel = t(name.toLowerCase()) !== name.toLowerCase() ? t(name.toLowerCase()) : name.charAt(0).toUpperCase() + name.slice(1);
          items.push({ label: translatedLabel, href: currentPath });
        }
      }
    });
    return items;
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={generateBreadcrumbItems()} />
      <h1 className="text-2xl font-semibold md:text-3xl">{t('settings')}</h1>
      <p className="text-muted-foreground">Manage your application settings and configurations.</p>

      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        <aside className="w-full lg:w-64 flex-shrink-0">
          <nav className="flex flex-col gap-1 p-2 rounded-md border bg-background">
            {settingsNavItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  location.pathname === item.href && "bg-muted text-primary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SettingsLayout;