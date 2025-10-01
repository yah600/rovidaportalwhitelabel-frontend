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
  LayoutGrid, // New icon for Portfolio
  UserCheck, // New icon for Visitor Logs
} from 'lucide-react';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

interface SettingsNavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  moduleName: string; // Added moduleName for permission checks
}

const settingsNavItems: SettingsNavItem[] = [
  {
    title: 'Organization',
    href: '/settings/org',
    icon: SettingsIcon,
    moduleName: 'Settings',
  },
  {
    title: 'Portfolio Management',
    href: '/settings/portfolio',
    icon: LayoutGrid,
    moduleName: 'Portfolio Management',
  },
  {
    title: 'Buildings',
    href: '/settings/buildings',
    icon: Building,
    moduleName: 'Settings',
  },
  {
    title: 'Units',
    href: '/settings/units',
    icon: Scale,
    moduleName: 'Settings',
  },
  {
    title: 'Users',
    href: '/settings/users',
    icon: Users,
    moduleName: 'Settings',
  },
  {
    title: 'Roles',
    href: '/settings/roles',
    icon: Handshake,
    moduleName: 'Settings',
  },
  {
    title: 'Security',
    href: '/settings/security',
    icon: ShieldCheck,
    moduleName: 'Settings',
  },
  {
    title: 'Visitor Logs',
    href: '/settings/visitor-logs',
    icon: UserCheck,
    moduleName: 'Visitor Logs',
  },
  {
    title: 'Notifications',
    href: '/settings/notifications',
    icon: Bell,
    moduleName: 'Settings',
  },
  {
    title: 'Audit Log',
    href: '/settings/audit',
    icon: FileText,
    moduleName: 'Settings',
  },
  {
    title: 'Feedback',
    href: '/settings/feedback',
    icon: MessageSquareText,
    moduleName: 'Settings',
  },
];

const SettingsLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { canRead } = useAuth(); // Use useAuth for permission checks

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
          items.push({ label: t(navItem.title.toLowerCase().replace(/[^a-z0-9]/g, '_')), href: navItem.href });
        } else {
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
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('settings')}</h1>
      <p className="text-muted-foreground">{t('manage_app_settings')}</p>

      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        <aside className="w-full lg:w-64 flex-shrink-0">
          <nav className="flex flex-col gap-1 p-2 rounded-md border bg-background">
            {settingsNavItems.map((item) => (
              // Only render if user has read permission for the module
              canRead(item.moduleName) && (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    location.pathname === item.href && "bg-muted text-primary"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {t(item.title.toLowerCase().replace(/[^a-z0-9]/g, '_'))}
                </Link>
              )
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