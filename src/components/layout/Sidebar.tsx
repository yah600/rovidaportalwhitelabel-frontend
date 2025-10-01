import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  AlertTriangle,
  Wrench,
  DollarSign,
  Users,
  FileText,
  MessageSquare,
  Plug,
  BarChart2,
  Settings,
  User,
  ClipboardList,
  Kanban,
  CalendarDays,
  Building,
  Receipt,
  Scale,
  Mail,
  Megaphone,
  FileStack,
  Vote,
  Handshake,
  Bell,
  MessageSquareText,
  ChevronDown,
  Info,
  Menu,
  PlusCircle, // Added PlusCircle for New Incident
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  moduleName: string; // Corresponds to a key in PERMISSIONS_MATRIX
  subItems?: NavItem[];
}

const Sidebar = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { canRead } = useAuth(); // Use the useAuth hook
  const sidebarContentRef = React.useRef<HTMLDivElement>(null);

  const [openSubMenus, setOpenSubMenus] = React.useState<Record<string, boolean>>({});
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const navItems: NavItem[] = [
    { title: t('dashboard'), href: '/dashboard', icon: LayoutDashboard, moduleName: 'Dashboard' },
    {
      title: t('issues'),
      href: '/issues',
      icon: ClipboardList,
      moduleName: 'Issues',
      subItems: [
        { title: t('issues'), href: '/issues', icon: ClipboardList, moduleName: 'Issues' },
        { title: 'Kanban', href: '/issues/kanban', icon: Kanban, moduleName: 'Issues' },
        { title: 'New Incident', href: '/issues/new', icon: PlusCircle, moduleName: 'Issues' },
      ],
    },
    { title: t('emergency'), href: '/emergency', icon: AlertTriangle, moduleName: 'Emergency Center' },
    {
      title: t('maintenance'),
      href: '/maintenance',
      icon: Wrench,
      moduleName: 'Maintenance',
      subItems: [
        { title: 'Calendar', href: '/maintenance/calendar', icon: CalendarDays, moduleName: 'Maintenance' },
        { title: 'Assets', href: '/maintenance/assets', icon: Building, moduleName: 'Maintenance' },
        { title: 'Work Orders', href: '/maintenance/work-orders', icon: Wrench, moduleName: 'Maintenance' },
        { title: 'Tasks', href: '/maintenance/tasks', icon: ClipboardList, moduleName: 'Maintenance' },
        { title: 'Agenda (XLSX)', href: '/maintenance/agenda', icon: FileStack, moduleName: 'Maintenance Agenda XLSX' },
      ],
    },
    {
      title: t('finance'),
      href: '/finance',
      icon: DollarSign,
      moduleName: 'Finance', // General finance module
      subItems: [
        { title: 'Bills', href: '/finance/bills', icon: Receipt, moduleName: 'Finance - Bills/Recurring/Deposits' },
        { title: 'Payments', href: '/finance/payments', icon: DollarSign, moduleName: 'Finance - Bills/Recurring/Deposits' },
        { title: 'Reports', href: '/finance/reports', icon: BarChart2, moduleName: 'Finance - Reports' },
      ],
    },
    {
      title: t('board'),
      href: '/board',
      icon: Users, // Changed to Users for consistency with mock-roles
      moduleName: 'Board', // General board module
      subItems: [
        { title: 'Meetings', href: '/board/meetings', icon: Handshake, moduleName: 'Board - Meetings/Votes' },
        { title: 'Votes', href: '/board/votes', icon: Vote, moduleName: 'Board - Meetings/Votes' },
      ],
    },
    {
      title: t('documents'),
      href: '/documents',
      icon: FileText,
      moduleName: 'Documents',
      subItems: [
        { title: 'Inbox', href: '/documents/inbox', icon: Mail, moduleName: 'Documents' },
        { title: 'Registry', href: '/documents/registry', icon: FileText, moduleName: 'Documents' },
      ],
    },
    {
      title: t('communications'),
      href: '/comms',
      icon: MessageSquare,
      moduleName: 'Communications',
      subItems: [
        { title: 'Announcements', href: '/comms/announcements', icon: Megaphone, moduleName: 'Communications' },
        { title: 'Send', href: '/comms/send', icon: MessageSquare, moduleName: 'Communications' },
        { title: 'Templates', href: '/comms/templates', icon: FileText, moduleName: 'Communications' },
      ],
    },
    { title: t('integrations'), href: '/integrations', icon: Plug, moduleName: 'Integrations' },
    { title: t('analytics'), href: '/analytics', icon: BarChart2, moduleName: 'Analytics' },
    {
      title: t('settings'),
      href: '/settings',
      icon: Settings,
      moduleName: 'Settings', // General settings module
      subItems: [
        { title: 'Organization', href: '/settings/org', icon: Settings, moduleName: 'Settings' },
        { title: 'Buildings', href: '/settings/buildings', icon: Building, moduleName: 'Settings' },
        { title: 'Units', href: '/settings/units', icon: Scale, moduleName: 'Settings' },
        { title: 'Users', href: '/settings/users', icon: Users, moduleName: 'Settings' },
        { title: 'Roles', href: '/settings/roles', icon: Users, moduleName: 'Settings' },
        { title: 'Security', href: '/settings/security', icon: Settings, moduleName: 'Settings' },
        { title: 'Notifications', href: '/settings/notifications', icon: Bell, moduleName: 'Settings' },
        { title: 'Audit Log', href: '/settings/audit', icon: FileText, moduleName: 'Settings' },
        { title: 'Feedback', href: '/settings/feedback', icon: MessageSquareText, moduleName: 'Settings' },
      ],
    },
    { title: t('profile'), href: '/profile', icon: User, moduleName: 'Profile' },
    // Removed 'About Us', 'CardNav Demo', 'Onboarding' from sidebar navigation
  ];

  React.useEffect(() => {
    const initialOpenSubMenus: Record<string, boolean> = {};
    navItems.forEach(item => {
      if (item.subItems && item.subItems.some(sub => location.pathname.startsWith(sub.href))) {
        initialOpenSubMenus[item.href] = true;
      }
    });
    setOpenSubMenus(initialOpenSubMenus);
  }, [location.pathname]);

  const toggleSubMenu = (href: string) => {
    setOpenSubMenus(prev => ({
      ...prev,
      [href]: !prev[href],
    }));
  };

  React.useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', isCollapsed ? '70px' : '280px');
  }, [isCollapsed]);

  const renderNavItems = (items: NavItem[]) => {
    return items.map((item) => {
      // Check if the user has read permission for the module
      if (!canRead(item.moduleName)) {
        return null;
      }

      const isActive = location.pathname === item.href || (item.subItems && item.subItems.some(sub => location.pathname.startsWith(sub.href)));
      const isSubMenuOpen = openSubMenus[item.href] || false;

      return (
        <div key={item.href}>
          <div
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-rovida-near-black transition-all hover:bg-rovida-soft-gray hover:text-rovida-navy",
              isActive && "bg-rovida-soft-gray text-rovida-navy",
              isCollapsed && "justify-center"
            )}
            onClick={() => item.subItems ? toggleSubMenu(item.href) : null}
          >
            <Link to={item.href} className={cn("flex items-center gap-3 flex-1", isCollapsed && "justify-center")}>
              <item.icon className="h-4 w-4" />
              {!isCollapsed && item.title}
            </Link>
            {item.subItems && !isCollapsed && (
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  isSubMenuOpen ? "rotate-180" : "rotate-0"
                )}
              />
            )}
          </div>
          {item.subItems && isSubMenuOpen && !isCollapsed && (
            <div className="ml-6 mt-1 space-y-1">
              {item.subItems.map(subItem => {
                // Check read permission for sub-items as well
                if (!canRead(subItem.moduleName)) {
                  return null;
                }
                return (
                  <Link
                    key={subItem.href}
                    to={subItem.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-rovida-near-black transition-all hover:bg-rovida-soft-gray hover:text-rovida-navy text-sm",
                      location.pathname === subItem.href && "bg-rovida-soft-gray text-rovida-navy"
                    )}
                  >
                    {subItem.title}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div
      className={cn(
        "hidden border-r border-rovida-soft-gray bg-white/80 backdrop-blur-xl md:flex flex-col transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[70px]" : "w-[280px]", // Use fixed widths for collapsed/expanded
        className
      )}
      style={{ '--sidebar-width': isCollapsed ? '70px' : '280px' } as React.CSSProperties}
    >
      <div className="flex h-14 items-center border-b border-rovida-soft-gray px-4 lg:h-[60px] lg:px-6 justify-between">
        {!isCollapsed && (
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="text-lg text-rovida-gold">{t('welcome')}</span>
          </Link>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "p-2 rounded-md hover:bg-rovida-soft-gray text-rovida-near-black",
            isCollapsed ? "mx-auto" : ""
          )}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar relative" ref={sidebarContentRef}>
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-2">
          {renderNavItems(navItems)}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;