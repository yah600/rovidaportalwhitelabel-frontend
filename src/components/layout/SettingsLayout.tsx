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
  LayoutGrid,
  UserCheck,
} from 'lucide-react';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { useAuth } from '@/hooks/useAuth';

interface SettingsNavItem {
  titleKey: string;
  href: string;
  icon: React.ElementType;
  moduleName: string;
}

const settingsNavItems: SettingsNavItem[] = [
  {
    titleKey: 'organization',
    href: '/settings/org',
    icon: SettingsIcon,
    moduleName: 'Settings',
  },
  {
    titleKey: 'portfolio_management',
    href: '/settings/portfolio',
    icon: LayoutGrid,
    moduleName: 'Portfolio Management',
  },
  {
    titleKey: 'buildings',
    href: '/settings/buildings',
    icon: Building,
    moduleName: 'Settings',
  },
  {
    titleKey: 'units',
    href: '/settings/units',
    icon: Scale,
    moduleName: 'Settings',
  },
  {
    titleKey: 'users',
    href: '/settings/users',
    icon: Users,
    moduleName: 'Settings',
  },
  {
    titleKey: 'roles',
    href: '/settings/roles',
    icon: Handshake,
    moduleName: 'Settings',
  },
  {
    titleKey: 'security',
    href: '/settings/security',
    icon: ShieldCheck,
    moduleName: 'Settings',
  },
  {
    titleKey: 'visitor_logs',
    href: '/settings/visitor-logs',
    icon: UserCheck,
    moduleName: 'Visitor Logs',
  },
  {
    titleKey: 'notifications',
    href: '/settings/notifications',
    icon: Bell,
    moduleName: 'Settings',
  },
  {
    titleKey: 'audit_log',
    href: '/settings/audit',
    icon: FileText,
    moduleName: 'Settings',
  },
  {
    titleKey: 'feedback',
    href: '/settings/feedback',
    icon: MessageSquareText,
    moduleName: 'Feedback',
  },
];

const SettingsLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { canRead } = useAuth();

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
          items.push({ label: t(navItem.titleKey), href: navItem.href });
        } else {
          // Fallback for dynamic segments or non-explicitly mapped paths
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
      <p className="text-muted-foreground">{t('manage app settings')}</p>

      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        <aside className="w-full lg:w-64 flex-shrink-0">
          <nav className="flex flex-col gap-1 p-2 rounded-md border bg-background">
            {settingsNavItems.map((item) => (
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
                  {t(item.titleKey)}
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