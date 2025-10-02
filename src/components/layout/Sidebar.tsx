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
  Gavel,
  Shield,
  LayoutTemplate,
  ShoppingCart,
  CalendarCheck,
  FileSignature,
  LayoutGrid,
  UserCheck,
} from 'lucide-react';
import { ShieldCheck } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface NavItem {
  titleKey: string; // Changed from 'title' to 'titleKey'
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
    { titleKey: 'dashboard', href: '/dashboard', icon: LayoutDashboard, moduleName: 'Dashboard' },
    {
      titleKey: 'issues',
      href: '/issues',
      icon: ClipboardList,
      moduleName: 'Issues',
      subItems: [
        { titleKey: 'issues', href: '/issues', icon: ClipboardList, moduleName: 'Issues' },
        { titleKey: 'kanban', href: '/issues/kanban', icon: Kanban, moduleName: 'Issues' },
        { titleKey: 'new_issue', href: '/issues/new', icon: PlusCircle, moduleName: 'Issues' },
      ],
    },
    { titleKey: 'emergency', href: '/emergency', icon: AlertTriangle, moduleName: 'Emergency Center' },
    {
      titleKey: 'maintenance',
      href: '/maintenance',
      icon: Wrench,
      moduleName: 'Maintenance',
      subItems: [
        { titleKey: 'calendar', href: '/maintenance/calendar', icon: CalendarDays, moduleName: 'Maintenance' },
        { titleKey: 'assets', href: '/maintenance/assets', icon: Building, moduleName: 'Maintenance' },
        { titleKey: 'work_orders', href: '/maintenance/work-orders', icon: Wrench, moduleName: 'Maintenance' },
        { titleKey: 'tasks', href: '/maintenance/tasks', icon: ClipboardList, moduleName: 'Maintenance' },
        { titleKey: 'agenda_xlsx_import', href: '/maintenance/agenda', icon: FileStack, moduleName: 'Maintenance Agenda XLSX' },
      ],
    },
    {
      titleKey: 'finance',
      href: '/finance',
      icon: DollarSign,
      moduleName: 'Finance',
      subItems: [
        { titleKey: 'bills', href: '/finance/bills', icon: Receipt, moduleName: 'Finance - Bills/Recurring/Deposits' },
        { titleKey: 'payments', href: '/finance/payments', icon: DollarSign, moduleName: 'Finance - Bills/Recurring/Deposits' },
        { titleKey: 'purchase_orders', href: '/finance/purchase-orders', icon: ShoppingCart, moduleName: 'Finance' },
        { titleKey: 'reports', href: '/finance/reports', icon: BarChart2, moduleName: 'Finance - Reports' },
      ],
    },
    {
      titleKey: 'board',
      href: '/board',
      icon: Users,
      moduleName: 'Board',
      subItems: [
        { titleKey: 'meetings', href: '/board/meetings', icon: Handshake, moduleName: 'Board - Meetings/Votes' },
        { titleKey: 'votes', href: '/board/votes', icon: Vote, moduleName: 'Board - Meetings/Votes' },
        { titleKey: 'architectural_requests', href: '/board/architectural-requests', icon: LayoutTemplate, moduleName: 'Architectural Requests' },
      ],
    },
    { titleKey: 'rules_and_violations', href: '/rules', icon: Gavel, moduleName: 'Rules' },
    { titleKey: 'insurance_and_claims', href: '/insurance', icon: Shield, moduleName: 'Insurance' },
    { titleKey: 'amenity_management', href: '/amenities', icon: CalendarCheck, moduleName: 'Amenities' },
    {
      titleKey: 'tenancy',
      href: '/tenancy',
      icon: FileSignature,
      moduleName: 'Tenancy',
      subItems: [
        { titleKey: 'leases', href: '/tenancy/leases', icon: FileSignature, moduleName: 'Tenancy' },
      ],
    },
    {
      titleKey: 'documents',
      href: '/documents',
      icon: FileText,
      moduleName: 'Documents',
      subItems: [
        { titleKey: 'overview', href: '/documents', icon: Info, moduleName: 'Documents' },
        { titleKey: 'inbox', href: '/documents/inbox', icon: Mail, moduleName: 'Documents' },
        { titleKey: 'registry', href: '/documents/registry', icon: FileText, moduleName: 'Documents' },
      ],
    },
    {
      titleKey: 'communications',
      href: '/comms',
      icon: MessageSquare,
      moduleName: 'Communications',
      subItems: [
        { titleKey: 'announcements', href: '/comms/announcements', icon: Megaphone, moduleName: 'Communications' },
        { titleKey: 'send_communication', href: '/comms/send', icon: MessageSquare, moduleName: 'Communications' },
        { titleKey: 'templates', href: '/comms/templates', icon: FileText, moduleName: 'Communications' },
      ],
    },
    { titleKey: 'integrations', href: '/integrations', icon: Plug, moduleName: 'Integrations' },
    { titleKey: 'analytics', href: '/analytics', icon: BarChart2, moduleName: 'Analytics' },
    {
      titleKey: 'settings',
      href: '/settings',
      icon: Settings,
      moduleName: 'Settings',
      subItems: [
        { titleKey: 'organization', href: '/settings/org', icon: Settings, moduleName: 'Settings' },
        { titleKey: 'portfolio_management', href: '/settings/portfolio', icon: LayoutGrid, moduleName: 'Portfolio Management' },
        { titleKey: 'buildings', href: '/settings/buildings', icon: Building, moduleName: 'Settings' },
        { titleKey: 'units', href: '/settings/units', icon: Scale, moduleName: 'Settings' },
        { titleKey: 'users', href: '/settings/users', icon: Users, moduleName: 'Settings' },
        { titleKey: 'roles', href: '/settings/roles', icon: Users, moduleName: 'Settings' },
        { titleKey: 'security', href: '/settings/security', icon: ShieldCheck, moduleName: 'Settings' },
        { titleKey: 'visitor_logs', href: '/settings/visitor-logs', icon: UserCheck, moduleName: 'Visitor Logs' },
        { titleKey: 'notifications', href: '/settings/notifications', icon: Bell, moduleName: 'Settings' },
        { titleKey: 'audit_log', href: '/settings/audit', icon: FileText, moduleName: 'Settings' },
        { titleKey: 'feedback', href: '/settings/feedback', icon: MessageSquareText, moduleName: 'Settings' },
      ],
    },
    { titleKey: 'profile', href: '/profile', icon: User, moduleName: 'Profile' },
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
              {!isCollapsed && t(item.titleKey)}
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
                    {t(subItem.titleKey)}
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
            <span className="text-lg text-rovida-gold">{t('welcome_to_gestion_rovida')}</span>
          </Link>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "p-2 rounded-md hover:bg-rovida-soft-gray text-rovida-near-black",
            isCollapsed ? "mx-auto" : ""
          )}
          aria-label={isCollapsed ? t('expand_sidebar') : t('collapse_sidebar')}
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