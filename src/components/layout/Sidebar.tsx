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
  Menu, // Import Menu icon for toggling
} from 'lucide-react';
// Removed GradualBlur import

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  roles?: string[];
  subItems?: NavItem[];
}

const Sidebar = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const sidebarContentRef = React.useRef<HTMLDivElement>(null);

  const [openSubMenus, setOpenSubMenus] = React.useState<Record<string, boolean>>({});
  const [isCollapsed, setIsCollapsed] = React.useState(false); // State for sidebar collapse

  const currentUserRole = 'Property Manager';

  const navItems: NavItem[] = [
    { title: t('dashboard'), href: '/dashboard', icon: LayoutDashboard },
    {
      title: t('issues'),
      href: '/issues',
      icon: ClipboardList,
      subItems: [
        { title: t('issues'), href: '/issues', icon: ClipboardList },
        { title: 'Kanban', href: '/issues/kanban', icon: Kanban },
        { title: 'New Incident', href: '/issues/new', icon: ClipboardList },
      ],
    },
    { title: t('emergency'), href: '/emergency', icon: AlertTriangle },
    {
      title: t('maintenance'),
      href: '/maintenance',
      icon: Wrench,
      subItems: [
        { title: 'Calendar', href: '/maintenance/calendar', icon: CalendarDays },
        { title: 'Assets', href: '/maintenance/assets', icon: Building },
        { title: 'Work Orders', href: '/maintenance/work-orders', icon: Wrench },
        { title: 'Tasks', href: '/maintenance/tasks', icon: ClipboardList },
        { title: 'Agenda (XLSX)', href: '/maintenance/agenda', icon: FileStack },
      ],
    },
    {
      title: t('finance'),
      href: '/finance',
      icon: DollarSign,
      subItems: [
        { title: 'Bills', href: '/finance/bills', icon: Receipt },
        { title: 'Payments', href: '/finance/payments', icon: DollarSign },
        { title: 'Reports', href: '/finance/reports', icon: BarChart2 },
      ],
    },
    {
      title: t('board'),
      href: '/board',
      icon: Users,
      subItems: [
        { title: 'Meetings', href: '/board/meetings', icon: Handshake },
        { title: 'Votes', href: '/board/votes', icon: Vote },
      ],
    },
    {
      title: t('documents'),
      href: '/documents',
      icon: FileText,
      subItems: [
        { title: 'Inbox', href: '/documents/inbox', icon: Mail },
        { title: 'Registry', href: '/documents/registry', icon: FileText },
      ],
    },
    {
      title: t('communications'),
      href: '/comms',
      icon: MessageSquare,
      subItems: [
        { title: 'Announcements', href: '/comms/announcements', icon: Megaphone },
        { title: 'Send', href: '/comms/send', icon: MessageSquare },
        { title: 'Templates', href: '/comms/templates', icon: FileText },
      ],
    },
    { title: t('integrations'), href: '/integrations', icon: Plug },
    { title: t('analytics'), href: '/analytics', icon: BarChart2 },
    {
      title: t('settings'),
      href: '/settings',
      icon: Settings,
      subItems: [
        { title: 'Organization', href: '/settings/org', icon: Settings },
        { title: 'Buildings', href: '/settings/buildings', icon: Building },
        { title: 'Units', href: '/settings/units', icon: Scale },
        { title: 'Users', href: '/settings/users', icon: Users },
        { title: 'Roles', href: '/settings/roles', icon: Users },
        { title: 'Security', href: '/settings/security', icon: Settings },
        { title: 'Notifications', href: '/settings/notifications', icon: Bell },
        { title: 'Audit Log', href: '/settings/audit', icon: FileText },
        { title: 'Feedback', href: '/settings/feedback', icon: MessageSquareText },
      ],
    },
    { title: t('profile'), href: '/profile', icon: User },
    { title: 'About Us', href: '/about', icon: Info },
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

  const renderNavItems = (items: NavItem[]) => {
    return items.map((item) => {
      const canView = !item.roles || item.roles.includes(currentUserRole);

      if (!canView) return null;

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
              {item.subItems.map(subItem => (
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
              ))}
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
        isCollapsed ? "w-[60px] lg:w-[70px]" : "w-[220px] lg:w-[280px]",
        className
      )}
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
        {/* Removed GradualBlur */}
      </div>
    </div>
  );
};

export default Sidebar;