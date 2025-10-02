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
  Zap,
  Wallet,
  Percent,
  Banknote,
  Ticket,
} from 'lucide-react';
import { ShieldCheck } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import GlassSurface from '@/components/GlassSurface';

interface NavItem {
  titleKey: string;
  href: string;
  icon: React.ElementType;
  moduleName: string;
  subItems?: NavItem[];
}

const Sidebar = ({ className }: { className?: string }) => {
  const { t } = useTranslation(['common', 'dashboard', 'issues', 'emergency', 'maintenance', 'finance', 'board', 'rules', 'insurance', 'amenities', 'tenancy', 'documents', 'communications', 'integrations', 'analytics', 'settings', 'profile', 'architectural_requests', 'automations']); // Specify all relevant namespaces
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
        { titleKey: 'new issue', href: '/issues/new', icon: PlusCircle, moduleName: 'Issues' },
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
        { titleKey: 'work orders', href: '/maintenance/work-orders', icon: Wrench, moduleName: 'Maintenance' },
        { titleKey: 'tasks', href: '/maintenance/tasks', icon: ClipboardList, moduleName: 'Maintenance' },
        { titleKey: 'agenda xlsx import', href: '/maintenance/agenda', icon: FileStack, moduleName: 'Maintenance Agenda XLSX' },
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
        { titleKey: 'purchase orders', href: '/finance/purchase-orders', icon: ShoppingCart, moduleName: 'Finance' },
        { titleKey: 'reports', href: '/finance/reports', icon: BarChart2, moduleName: 'Finance - Reports' },
        { titleKey: 'late fees nsf interest rules', href: '/finance/late-fees-nsf', icon: Percent, moduleName: 'Finance - Late Fees/NSF/Reconciliation' },
        { titleKey: 'bank reconciliation', href: '/finance/bank-reconciliation', icon: Banknote, moduleName: 'Finance - Late Fees/NSF/Reconciliation' },
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
        { titleKey: 'architectural requests', href: '/board/architectural-requests', icon: LayoutTemplate, moduleName: 'Architectural Requests' },
      ],
    },
    {
      titleKey: 'rules and violations',
      href: '/rules',
      icon: Gavel,
      moduleName: 'Rules',
      subItems: [
        { titleKey: 'rule catalog', href: '/rules/catalog', icon: Gavel, moduleName: 'Rules' },
        { titleKey: 'violation tickets', href: '/rules/violations', icon: Ticket, moduleName: 'Rules - Violations' },
      ],
    },
    { titleKey: 'insurance and claims', href: '/insurance', icon: Shield, moduleName: 'Insurance' },
    { titleKey: 'amenity management', href: '/amenities', icon: CalendarCheck, moduleName: 'Amenities' },
    {
      titleKey: 'tenancy',
      href: '/tenancy',
      icon: FileSignature,
      moduleName: 'Tenancy',
      subItems: [
        { titleKey: 'leases', href: '/tenancy/leases', icon: FileSignature, moduleName: 'Tenancy - Leases' },
        { titleKey: 'unit statements', href: '/tenancy/statements', icon: Wallet, moduleName: 'Tenancy - Unit Statements' }, // New sub-item
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
        { titleKey: 'send communication', href: '/comms/send', icon: MessageSquare, moduleName: 'Communications' },
        { titleKey: 'templates', href: '/comms/templates', icon: FileText, moduleName: 'Communications' },
      ],
    },
    { titleKey: 'integrations', href: '/integrations', icon: Plug, moduleName: 'Integrations' },
    { titleKey: 'analytics', href: '/analytics', icon: BarChart2, moduleName: 'Analytics' },
    { titleKey: 'automations', href: '/automations', icon: Zap, moduleName: 'Automations' },
    {
      titleKey: 'settings',
      href: '/settings',
      icon: Settings,
      moduleName: 'Settings',
      subItems: [
        { titleKey: 'organization', href: '/settings/org', icon: Settings, moduleName: 'Settings' },
        { titleKey: 'portfolio management', href: '/settings/portfolio', icon: LayoutGrid, moduleName: 'Portfolio Management' },
        { titleKey: 'buildings', href: '/settings/buildings', icon: Building, moduleName: 'Settings' },
        { titleKey: 'units', href: '/settings/units', icon: Scale, moduleName: 'Settings' },
        { titleKey: 'users', href: '/settings/users', icon: Users, moduleName: 'Settings' },
        { titleKey: 'roles', href: '/settings/roles', icon: Users, moduleName: 'Settings' },
        { titleKey: 'security', href: '/settings/security', icon: ShieldCheck, moduleName: 'Settings' },
        { titleKey: 'visitor logs', href: '/settings/visitor-logs', icon: UserCheck, moduleName: 'Visitor Logs' },
        { titleKey: 'notifications', href: '/settings/notifications', icon: Bell, moduleName: 'Settings' },
        { titleKey: 'audit log', href: '/settings/audit', icon: FileText, moduleName: 'Settings' },
        { titleKey: 'feedback', href: '/settings/feedback', icon: MessageSquareText, moduleName: 'Feedback' },
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

      // Determine the namespace for the item's titleKey
      let namespace = 'common'; // Default to common
      if (item.href.startsWith('/dashboard')) namespace = 'dashboard';
      else if (item.href.startsWith('/issues')) namespace = 'issues';
      else if (item.href.startsWith('/emergency')) namespace = 'emergency';
      else if (item.href.startsWith('/maintenance')) namespace = 'maintenance';
      else if (item.href.startsWith('/finance')) namespace = 'finance';
      else if (item.href.startsWith('/board')) namespace = 'board';
      else if (item.href.startsWith('/rules')) namespace = 'rules';
      else if (item.href.startsWith('/insurance')) namespace = 'insurance';
      else if (item.href.startsWith('/amenities')) namespace = 'amenities';
      else if (item.href.startsWith('/tenancy')) namespace = 'tenancy';
      else if (item.href.startsWith('/documents')) namespace = 'documents';
      else if (item.href.startsWith('/comms')) namespace = 'communications';
      else if (item.href.startsWith('/integrations')) namespace = 'integrations';
      else if (item.href.startsWith('/analytics')) namespace = 'analytics';
      else if (item.href.startsWith('/automations')) namespace = 'automations';
      else if (item.href.startsWith('/settings')) namespace = 'settings';
      else if (item.href.startsWith('/profile')) namespace = 'profile';


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
              {!isCollapsed && t(item.titleKey, { ns: namespace })}
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
                // Determine the namespace for the subItem's titleKey
                let subNamespace = namespace; // Inherit from parent, or refine if needed
                if (subItem.href.startsWith('/issues/new')) subNamespace = 'issues';
                else if (subItem.href.startsWith('/maintenance/agenda')) subNamespace = 'maintenance';
                else if (subItem.href.startsWith('/finance/bills')) subNamespace = 'finance';
                else if (subItem.href.startsWith('/finance/payments')) subNamespace = 'finance';
                else if (subItem.href.startsWith('/finance/purchase-orders')) subNamespace = 'finance';
                else if (subItem.href.startsWith('/finance/reports')) subNamespace = 'finance';
                else if (subItem.href.startsWith('/finance/late-fees-nsf')) subNamespace = 'finance';
                else if (subItem.href.startsWith('/finance/bank-reconciliation')) subNamespace = 'finance';
                else if (subItem.href.startsWith('/board/meetings')) subNamespace = 'board';
                else if (subItem.href.startsWith('/board/votes')) subNamespace = 'board';
                else if (subItem.href.startsWith('/board/architectural-requests')) subNamespace = 'architectural_requests';
                else if (subItem.href.startsWith('/rules/catalog')) subNamespace = 'rules';
                else if (subItem.href.startsWith('/rules/violations')) subNamespace = 'rules';
                else if (subItem.href.startsWith('/tenancy/leases')) subNamespace = 'tenancy';
                else if (subItem.href.startsWith('/tenancy/statements')) subNamespace = 'tenancy'; // New sub-item namespace
                else if (subItem.href.startsWith('/documents/inbox')) subNamespace = 'documents';
                else if (subItem.href.startsWith('/documents/registry')) subNamespace = 'documents';
                else if (subItem.href.startsWith('/comms/announcements')) subNamespace = 'communications';
                else if (subItem.href.startsWith('/comms/send')) subNamespace = 'communications';
                else if (subItem.href.startsWith('/comms/templates')) subNamespace = 'communications';
                else if (subItem.href.startsWith('/settings/org')) subNamespace = 'settings';
                else if (subItem.href.startsWith('/settings/portfolio')) subNamespace = 'settings';
                else if (subItem.href.startsWith('/settings/buildings')) subNamespace = 'settings';
                else if (subItem.href.startsWith('/settings/units')) subNamespace = 'settings';
                else if (subItem.href.startsWith('/settings/users')) subNamespace = 'settings';
                else if (subItem.href.startsWith('/settings/roles')) subNamespace = 'settings';
                else if (subItem.href.startsWith('/settings/security')) subNamespace = 'settings';
                else if (subItem.href.startsWith('/settings/visitor-logs')) subNamespace = 'settings';
                else if (subItem.href.startsWith('/settings/notifications')) subNamespace = 'settings';
                else if (subItem.href.startsWith('/settings/audit')) subNamespace = 'settings';
                else if (subItem.href.startsWith('/settings/feedback')) subNamespace = 'feedback';


                return (
                  <Link
                    key={subItem.href}
                    to={subItem.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-rovida-near-black transition-all hover:bg-rovida-soft-gray hover:text-rovida-navy text-sm",
                      location.pathname === subItem.href && "bg-rovida-soft-gray text-rovida-navy"
                    )}
                  >
                    {t(subItem.titleKey, { ns: subNamespace })}
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
        "hidden border-r border-rovida-soft-gray md:flex flex-col transition-all duration-300 ease-in-out relative",
        className
      )}
    >
      <GlassSurface
        width="100%"
        height="100%"
        borderRadius={0}
        blur={20}
        backgroundOpacity={0.15}
        saturation={1.8}
        displace={0.5}
        distortionScale={-100}
        redOffset={5}
        greenOffset={10}
        blueOffset={15}
        className="absolute inset-0"
      >
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex h-14 items-center border-b border-rovida-soft-gray px-4 lg:h-[60px] lg:px-6 justify-between">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={cn(
                "p-2 rounded-md hover:bg-rovida-soft-gray text-rovida-near-black",
                isCollapsed ? "mx-auto" : ""
              )}
              aria-label={isCollapsed ? t('expand sidebar', { ns: 'common' }) : t('collapse sidebar', { ns: 'common' })}
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
      </GlassSurface>
    </div>
  );
};

export default Sidebar;