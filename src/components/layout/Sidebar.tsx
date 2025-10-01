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
  PlusCircle,
  Gavel, // New icon for Rules
  Shield, // New icon for Insurance
  LayoutTemplate, // New icon for Architectural Requests
  ShoppingCart, // New icon for Purchase Orders
  CalendarCheck, // New icon for Amenities
  FileSignature, // New icon for Leases
  LayoutGrid, // New icon for Portfolio
  UserCheck, // New icon for Visitor Logs
} from 'lucide-react';
import { ShieldCheck } from 'lucide-react'; // Isolated import for ShieldCheck
import { useAuth } from '@/hooks/useAuth';

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  moduleName: string;
  subItems?: NavItem[];
}

const Sidebar = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { canRead } = useAuth();
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
        { title: t('kanban'), href: '/issues/kanban', icon: Kanban, moduleName: 'Issues' },
        { title: t('new_issue'), href: '/issues/new', icon: PlusCircle, moduleName: 'Issues' },
      ],
    },
    { title: t('emergency'), href: '/emergency', icon: AlertTriangle, moduleName: 'Emergency Center' },
    {
      title: t('maintenance'),
      href: '/maintenance',
      icon: Wrench,
      moduleName: 'Maintenance',
      subItems: [
        { title: t('calendar'), href: '/maintenance/calendar', icon: CalendarDays, moduleName: 'Maintenance' },
        { title: t('assets'), href: '/maintenance/assets', icon: Building, moduleName: 'Maintenance' },
        { title: t('work_orders'), href: '/maintenance/work-orders', icon: Wrench, moduleName: 'Maintenance' },
        { title: t('tasks'), href: '/maintenance/tasks', icon: ClipboardList, moduleName: 'Maintenance' },
        { title: t('agenda_xlsx_import'), href: '/maintenance/agenda', icon: FileStack, moduleName: 'Maintenance Agenda XLSX' },
      ],
    },
    {
      title: t('finance'),
      href: '/finance',
      icon: DollarSign,
      moduleName: 'Finance',
      subItems: [
        { title: t('bills'), href: '/finance/bills', icon: Receipt, moduleName: 'Finance - Bills/Recurring/Deposits' },
        { title: t('payments'), href: '/finance/payments', icon: DollarSign, moduleName: 'Finance - Bills/Recurring/Deposits' },
        { title: t('purchase_orders'), href: '/finance/purchase-orders', icon: ShoppingCart, moduleName: 'Finance' },
        { title: t('reports'), href: '/finance/reports', icon: BarChart2, moduleName: 'Finance - Reports' },
      ],
    },
    {
      title: t('board'),
      href: '/board',
      icon: Users,
      moduleName: 'Board',
      subItems: [
        { title: t('meetings'), href: '/board/meetings', icon: Handshake, moduleName: 'Board - Meetings/Votes' },
        { title: t('votes'), href: '/board/votes', icon: Vote, moduleName: 'Board - Meetings/Votes' },
        { title: t('architectural_requests'), href: '/board/architectural-requests', icon: LayoutTemplate, moduleName: 'Architectural Requests' },
      ],
    },
    { title: t('rules_and_violations'), href: '/rules', icon: Gavel, moduleName: 'Rules' },
    { title: t('insurance_and_claims'), href: '/insurance', icon: Shield, moduleName: 'Insurance' },
    { title: t('amenity_management'), href: '/amenities', icon: CalendarCheck, moduleName: 'Amenities' },
    {
      title: t('tenancy'), // New top-level module
      href: '/tenancy',
      icon: FileSignature,
      moduleName: 'Tenancy',
      subItems: [
        { title: t('leases'), href: '/tenancy/leases', icon: FileSignature, moduleName: 'Tenancy' },
      ],
    },
    {
      title: t('documents'),
      href: '/documents',
      icon: FileText,
      moduleName: 'Documents',
      subItems: [
        { title: t('overview'), href: '/documents', icon: Info, moduleName: 'Documents' },
        { title: t('inbox'), href: '/documents/inbox', icon: Mail, moduleName: 'Documents' },
        { title: t('registry'), href: '/documents/registry', icon: FileText, moduleName: 'Documents' },
      ],
    },
    {
      title: t('communications'),
      href: '/comms',
      icon: MessageSquare,
      moduleName: 'Communications',
      subItems: [
        { title: t('announcements'), href: '/comms/announcements', icon: Megaphone, moduleName: 'Communications' },
        { title: t('send_communication'), href: '/comms/send', icon: MessageSquare, moduleName: 'Communications' },
        { title: t('templates'), href: '/comms/templates', icon: FileText, moduleName: 'Communications' },
      ],
    },
    { title: t('integrations'), href: '/integrations', icon: Plug, moduleName: 'Integrations' },
    { title: t('analytics'), href: '/analytics', icon: BarChart2, moduleName: 'Analytics' },
    {
      title: t('settings'),
      href: '/settings',
      icon: Settings,
      moduleName: 'Settings',
      subItems: [
        { title: t('organization'), href: '/settings/org', icon: Settings, moduleName: 'Settings' },
        { title: t('portfolio_management'), href: '/settings/portfolio', icon: LayoutGrid, moduleName: 'Portfolio Management' },
        { title: t('buildings'), href: '/settings/buildings', icon: Building, moduleName: 'Settings' },
        { title: t('units'), href: '/settings/units', icon: Scale, moduleName: 'Settings' },
        { title: t('users'), href: '/settings/users', icon: Users, moduleName: 'Settings' },
        { title: t('roles'), href: '/settings/roles', icon: Users, moduleName: 'Settings' },
        { title: t('security'), href: '/settings/security', icon: ShieldCheck, moduleName: 'Settings' },
        { title: t('visitor_logs'), href: '/settings/visitor-logs', icon: UserCheck, moduleName: 'Visitor Logs' },
        { title: t('notifications'), href: '/settings/notifications', icon: Bell, moduleName: 'Settings' },
        { title: t('audit_log'), href: '/settings/audit', icon: FileText, moduleName: 'Settings' },
        { title: t('feedback'), href: '/settings/feedback', icon: MessageSquareText, moduleName: 'Settings' },
      ],
    },
    { title: t('profile'), href: '/profile', icon: User, moduleName: 'Profile' },
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

  // Use useLayoutEffect for DOM manipulations that affect layout
  React.useLayoutEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', isCollapsed ? '70px' : '280px');
  }, [isCollapsed]);

  const renderNavItems = (items: NavItem[]) => {
    return items.map((item) => {
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
      </div>
    </div>
  );
};

export default Sidebar;