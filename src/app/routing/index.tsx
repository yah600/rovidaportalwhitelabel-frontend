import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppShell } from '../layouts/AppShell';
import { ProtectedRoute, ROLES } from '../../shared/rbac';
import TenancyPage from '../../pages/Tenancy';
import LeasesPage from '../../pages/Tenancy/Leases';
import UnitStatementsPage from '../../pages/Tenancy/UnitStatements';
import UnitStatementDetailPage from '../../pages/Tenancy/UnitStatementDetail';
import DocumentsPage from '../../pages/Documents';
import RegistryPage from '../../pages/Documents/Registry';
import InboxPage from '../../pages/Documents/Inbox';
import DocumentDetailPage from '../../pages/Documents/DocumentDetail';
import FinancePage from '../../pages/Finance';
import LedgerPage from '../../pages/Finance/Ledger';
import TrialBalancePage from '../../pages/Finance/TrialBalance';
import ProfitAndLossPage from '../../pages/Finance/ProfitAndLoss';
import BalanceSheetPage from '../../pages/Finance/BalanceSheet';
import MaintenancePage from '../../pages/Maintenance';
import CalendarPage from '../../pages/maintenance/Calendar';
import AssetsPage from '../../pages/maintenance/Assets';
import WorkOrdersPage from '../../pages/maintenance/WorkOrders';
import TasksPage from '../../pages/maintenance/Tasks';
import PurchaseOrdersPage from '../../pages/Finance/PurchaseOrders';
import CompliancePage from '../../pages/maintenance/Compliance';
import CommsPage from '../../pages/Comms';
import AnnouncementsPage from '../../pages/Comms/Announcements';
import AnnouncementDetailPage from '../../pages/Comms/AnnouncementDetail';
import SendPage from '../../pages/Comms/Send';
import TemplatesPage from '../../pages/Comms/Templates';
import RulesPage from '../../pages/Rules';
import RuleDetailPage from '../../pages/rules/RuleDetail';
import ViolationTicketsPage from '../../pages/rules/ViolationTickets';
import ViolationTicketDetailPage from '../../pages/rules/ViolationTicketDetail';
import AmenitiesPage from '../../pages/Amenities';
import ServiceTicketsPage from '../../pages/Amenities/ServiceTickets';
import AmenityBookingPage from '../../pages/Amenities/AmenityBooking';
import BoardPage from '../../pages/Board';
import MeetingsPage from '../../pages/board/Meetings';
import MeetingDetailPage from '../../pages/board/MeetingDetail';
import VotesPage from '../../pages/board/Votes';
import VoteDetailPage from '../../pages/board/VoteDetail';
import ArchitecturalRequestsPage from '../../pages/board/ArchitecturalRequests';
import ArchitecturalRequestDetailPage from '../../pages/board/ArchitecturalRequestDetail';
import NewArchitecturalRequestPage from '../../pages/board/NewArchitecturalRequest';
import IntegrationsPage from '../../pages/Integrations';
import IntegrationDetailPage from '../../pages/integrations/IntegrationDetail';
import InsurancePage from '../../pages/Insurance';
import PolicyDetailPage from '../../pages/insurance/PolicyDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell><div/></AppShell>,
    children: [
      {
        path: 'dashboard',
        element: <div>Dashboard</div>,
      },
      {
        path: 'tenancy',
        element: <TenancyPage />,
        children: [
          {
            path: 'leases',
            element: <LeasesPage />,
          },
          {
            path: 'statements',
            element: <UnitStatementsPage />,
          },
          {
            path: 'statements/:id',
            element: <UnitStatementDetailPage />,
          },
        ],
      },
      {
        path: 'documents',
        element: <DocumentsPage />,
        children: [
          {
            path: 'registry',
            element: <RegistryPage />,
          },
          {
            path: 'inbox',
            element: <InboxPage />,
          },
          {
            path: ':id',
            element: <DocumentDetailPage />,
          },
        ],
      },
      {
        path: 'finance',
        element: <FinancePage />,
        children: [
          {
            path: 'ledger',
            element: <LedgerPage />,
          },
          {
            path: 'trial-balance',
            element: <TrialBalancePage />,
          },
          {
            path: 'profit-and-loss',
            element: <ProfitAndLossPage />,
          },
          {
            path: 'balance-sheet',
            element: <BalanceSheetPage />,
          },
          {
            path: 'purchase-orders',
            element: <PurchaseOrdersPage />,
          },
        ],
      },
      {
        path: 'maintenance',
        element: <MaintenancePage />,
        children: [
          {
            path: 'calendar',
            element: <CalendarPage />,
          },
          {
            path: 'assets',
            element: <AssetsPage />,
          },
          {
            path: 'work-orders',
            element: <WorkOrdersPage />,
          },
          {
            path: 'tasks',
            element: <TasksPage />,
          },
          {
            path: 'compliance',
            element: <CompliancePage />,
          },
        ],
      },
      {
        path: 'comms',
        element: <CommsPage />,
        children: [
          {
            path: 'announcements',
            element: <AnnouncementsPage />,
          },
          {
            path: 'announcements/:id',
            element: <AnnouncementDetailPage />,
          },
          {
            path: 'send',
            element: <SendPage />,
          },
          {
            path: 'templates',
            element: <TemplatesPage />,
          },
        ],
      },
      {
        path: 'rules',
        element: <RulesPage />,
        children: [
          {
            path: ':id',
            element: <RuleDetailPage />,
          },
          {
            path: 'violations',
            element: <ViolationTicketsPage />,
          },
          {
            path: 'violations/:id',
            element: <ViolationTicketDetailPage />,
          },
        ],
      },
      {
        path: 'amenities',
        element: <AmenitiesPage />,
        children: [
          {
            path: 'service-tickets',
            element: <ServiceTicketsPage />,
          },
          {
            path: 'booking',
            element: <AmenityBookingPage />,
          },
        ],
      },
      {
        path: 'board',
        element: <BoardPage />,
        children: [
          {
            path: 'meetings',
            element: <MeetingsPage />,
          },
          {
            path: 'meetings/:id',
            element: <MeetingDetailPage />,
          },
          {
            path: 'votes',
            element: <VotesPage />,
          },
          {
            path: 'votes/:id',
            element: <VoteDetailPage />,
          },
          {
            path: 'architectural-requests',
            element: <ArchitecturalRequestsPage />,
          },
          {
            path: 'architectural-requests/new',
            element: <NewArchitecturalRequestPage />,
          },
          {
            path: 'architectural-requests/:id',
            element: <ArchitecturalRequestDetailPage />,
          },
        ],
      },
      {
        path: 'analytics',
        element: <AnalyticsPage />,
        children: [
          {
            path: 'kpis',
            element: <KPIsDashboardPage />,
          },
          {
            path: 'custom-reports',
            element: <CustomReportsPage />,
          },
        ],
      },
      {
        path: 'automations',
        element: <AutomationsPage />,
      },
      {
        path: 'integrations',
        element: <IntegrationsPage />,
        children: [
          {
            path: ':slug',
            element: <IntegrationDetailPage />,
          },
        ],
      },
      {
        path: 'insurance',
        element: <InsurancePage />,
        children: [
          {
            path: ':id',
            element: <PolicyDetailPage />,
          },
        ],
      },
      {
        path: 'settings',
        children: [
          {
            path: 'security',
            element: <SecurityPage />,
          },
          {
            path: 'visitor-logs',
            element: <VisitorLogsPage />,
          },
        ],
      },
      {
        element: <ProtectedRoute allowedRoles={[ROLES.SYSADMIN]} />,
        children: [
          {
            path: 'admin',
            element: <div>Admin Page</div>,
          },
        ],
      },
    ],
  },
  {
    path: '/404',
    element: <div>Not Found</div>,
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
