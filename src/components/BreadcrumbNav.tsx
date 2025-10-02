import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Home as HomeIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbNavProps {
  items?: BreadcrumbItem[];
}

// Map common path segments to their translation keys
const pathSegmentToKeyMap: Record<string, string> = {
  'dashboard': 'dashboard',
  'issues': 'issues',
  'kanban': 'kanban',
  'new': 'new_issue', // For /issues/new
  'emergency': 'emergency',
  'maintenance': 'maintenance',
  'calendar': 'calendar',
  'assets': 'assets',
  'work-orders': 'work_orders',
  'tasks': 'tasks',
  'agenda': 'agenda_xlsx_import',
  'finance': 'finance',
  'bills': 'bills',
  'payments': 'payments',
  'purchase-orders': 'purchase_orders',
  'reports': 'reports',
  'board': 'board',
  'meetings': 'meetings',
  'votes': 'votes',
  'architectural-requests': 'architectural_requests',
  'rules': 'rules_and_violations',
  'insurance': 'insurance_and_claims',
  'amenities': 'amenity_management',
  'tenancy': 'tenancy',
  'leases': 'leases',
  'documents': 'documents',
  'registry': 'registry',
  'inbox': 'inbox',
  'comms': 'communications',
  'announcements': 'announcements',
  'send': 'send_communication',
  'templates': 'templates',
  'integrations': 'integrations',
  'analytics': 'analytics',
  'settings': 'settings',
  'org': 'organization',
  'portfolio': 'portfolio_management',
  'buildings': 'buildings',
  'units': 'units',
  'users': 'users',
  'roles': 'roles',
  'security': 'security',
  'visitor-logs': 'visitor_logs',
  'notifications': 'notifications',
  'audit': 'audit_log',
  'feedback': 'feedback',
  'profile': 'profile',
  'about': 'about_us',
  'cardnav-demo': 'card_navigation_demo',
  'onboarding': 'onboarding',
  'login': 'login',
  'forgot': 'forgot_password',
  'reset': 'reset_password',
};

const BreadcrumbNav = ({ items }: BreadcrumbNavProps) => {
  const { t } = useTranslation();
  const location = useLocation();

  // Default items if none are provided, based on current path
  const defaultItems: BreadcrumbItem[] = React.useMemo(() => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    let currentPath = '';
    return [
      { label: t('home'), href: '/' },
      ...pathnames.map((name) => {
        currentPath += `/${name}`;
        const translationKey = pathSegmentToKeyMap[name];
        const label = translationKey ? t(translationKey) : name.charAt(0).toUpperCase() + name.slice(1);
        return {
          label: label,
          href: currentPath,
        };
      }),
    ];
  }, [location.pathname, t]);

  const breadcrumbItems = items || defaultItems;

  return (
    <nav aria-label="breadcrumb" className="flex py-2">
      <ol className="flex items-center space-x-1 text-sm text-rovida-slate-green-gray">
        {breadcrumbItems.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 mx-1 text-rovida-slate-green-gray" />}
            <Link
              to={item.href}
              className={cn(
                "hover:text-rovida-gold transition-colors",
                index === breadcrumbItems.length - 1 ? "text-rovida-gold font-medium" : "text-rovida-slate-green-gray"
              )}
            >
              {index === 0 && item.href === '/' ? <HomeIcon className="h-4 w-4 inline-block mr-1" /> : null}
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbNav;