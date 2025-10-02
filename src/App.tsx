import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import ErrorBoundary from './components/ErrorBoundary';
import AppShell from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';
import Issues from './pages/Issues';
import IssueDetail from './pages/issues/IssueDetail';
import NewIssue from './pages/issues/NewIssue';
import Kanban from './pages/issues/Kanban';
import Emergency from './pages/Emergency';
import Maintenance from './pages/Maintenance';
import MaintenanceCalendar from './pages/maintenance/Calendar';
import MaintenanceAssets from './pages/maintenance/Assets';
import MaintenanceWorkOrders from './pages/maintenance/WorkOrders';
import MaintenanceWorkOrderDetail from './pages/maintenance/WorkOrderDetail';
import MaintenanceTasks from './pages/maintenance/Tasks';
import MaintenanceTaskDetail from './pages/maintenance/TaskDetail';
import MaintenanceAgenda from './pages/maintenance/Agenda';
import Finance from './pages/Finance';
import FinanceBills from './pages/finance/Bills';
import FinanceBillDetail from './pages/finance/BillDetail';
import FinancePayments from './pages/finance/Payments';
import FinancePurchaseOrders from './pages/finance/PurchaseOrders';
import FinanceReports from './pages/finance/Reports';
import FinanceLateFeesNSF from './pages/finance/LateFeesNSF';
import FinanceBankReconciliation from './pages/finance/BankReconciliation';
import Board from './pages/Board';
import BoardMeetings from './pages/board/Meetings';
import BoardMeetingDetail from './pages/board/MeetingDetail';
import BoardVotes from './pages/board/Votes';
import BoardVoteDetail from './pages/board/VoteDetail';
import ArchitecturalRequests from './pages/ArchitecturalRequests';
import ArchitecturalRequestDetail from './pages/board/ArchitecturalRequestDetail';
import NewArchitecturalRequest from './pages/board/NewArchitecturalRequest'; // New import
import Rules from './pages/Rules';
import RuleDetail from './pages/rules/RuleDetail';
import ViolationTickets from './pages/rules/ViolationTickets';
import ViolationTicketDetail from './pages/rules/ViolationTicketDetail';
import Insurance from './pages/Insurance';
import InsurancePolicyDetail from './pages/insurance/PolicyDetail';
import Amenities from './pages/Amenities';
import Tenancy from './pages/Tenancy';
import Leases from './pages/tenancy/Leases';
import UnitStatementDetail from './pages/tenancy/UnitStatementDetail';
import DocumentsOverview from './pages/documents/Overview';
import DocumentsInbox from './pages/documents/Inbox';
import DocumentsRegistry from './pages/documents/Registry';
import DocumentDetail from './pages/documents/DocumentDetail';
import Comms from './pages/Comms';
import CommsAnnouncements from './pages/comms/Announcements';
import AnnouncementDetail from './pages/comms/AnnouncementDetail';
import CommsSend from './pages/comms/Send';
import CommsTemplates from './pages/comms/Templates';
import Integrations from './pages/Integrations';
import IntegrationDetail from './pages/integrations/IntegrationDetail';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import SettingsLayout from './components/layout/SettingsLayout';
import SettingsOrganization from './pages/settings/Organization';
import SettingsPortfolio from './pages/settings/Portfolio';
import SettingsBuildings from './pages/settings/Buildings';
import SettingsUnits from './pages/settings/Units';
import SettingsUsers from './pages/settings/Users';
import SettingsRoles from './pages/settings/Roles';
import SettingsSecurity from './pages/settings/Security';
import SettingsVisitorLogs from './pages/settings/VisitorLogs';
import SettingsNotifications from './pages/settings/Notifications';
import SettingsAudit from './pages/settings/Audit';
import SettingsFeedback from './pages/settings/Feedback';
import Profile from './pages/Profile';
import About from './pages/About';
import CardNavDemo from './pages/CardNavDemo';
import OnboardingPage from './pages/OnboardingPage';
import AuthPage from './pages/AuthPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/Register';
import ForgotPasswordPage from './pages/auth/ForgotPassword';
import ResetPasswordPage from './pages/auth/ResetPassword';
import NotFound from './pages/NotFound';
import Index from './pages/Index';
import Automations from './pages/Automations';

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <ErrorBoundary>
        <Routes>
          {/* Authentication Routes */}
          <Route path="/auth" element={<AuthPage />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot" element={<ForgotPasswordPage />} />
            <Route path="reset" element={<ResetPasswordPage />} />
          </Route>

          {/* Onboarding Route */}
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* Main Application Routes (Protected by AppShell) */}
          <Route element={<AppShell />}>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/issues" element={<Issues />} />
            <Route path="/issues/new" element={<NewIssue />} />
            <Route path="/issues/kanban" element={<Kanban />} />
            <Route path="/issues/:id" element={<IssueDetail />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/maintenance/calendar" element={<MaintenanceCalendar />} />
            <Route path="/maintenance/assets" element={<MaintenanceAssets />} />
            <Route path="/maintenance/work-orders" element={<MaintenanceWorkOrders />} />
            <Route path="/maintenance/work-orders/:id" element={<MaintenanceWorkOrderDetail />} />
            <Route path="/maintenance/tasks" element={<MaintenanceTasks />} />
            <Route path="/maintenance/tasks/:id" element={<MaintenanceTaskDetail />} />
            <Route path="/maintenance/agenda" element={<MaintenanceAgenda />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/finance/bills" element={<FinanceBills />} />
            <Route path="/finance/bills/:id" element={<FinanceBillDetail />} />
            <Route path="/finance/payments" element={<FinancePayments />} />
            <Route path="/finance/purchase-orders" element={<FinancePurchaseOrders />} />
            <Route path="/finance/reports" element={<FinanceReports />} />
            <Route path="/finance/late-fees-nsf" element={<FinanceLateFeesNSF />} />
            <Route path="/finance/bank-reconciliation" element={<FinanceBankReconciliation />} />
            <Route path="/board" element={<Board />} />
            <Route path="/board/meetings" element={<BoardMeetings />} />
            <Route path="/board/meetings/:id" element={<BoardMeetingDetail />} />
            <Route path="/board/votes" element={<BoardVotes />} />
            <Route path="/board/votes/:id" element={<BoardVoteDetail />} />
            <Route path="/board/architectural-requests" element={<ArchitecturalRequests />} />
            <Route path="/board/architectural-requests/new" element={<NewArchitecturalRequest />} /> {/* New route */}
            <Route path="/board/architectural-requests/:id" element={<ArchitecturalRequestDetail />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/rules/catalog" element={<Rules />} />
            <Route path="/rules/:id" element={<RuleDetail />} />
            <Route path="/rules/violations" element={<ViolationTickets />} />
            <Route path="/rules/violations/:id" element={<ViolationTicketDetail />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/insurance/:id" element={<InsurancePolicyDetail />} />
            <Route path="/amenities" element={<Amenities />} />
            <Route path="/tenancy" element={<Tenancy />} />
            <Route path="/tenancy/leases" element={<Leases />} />
            <Route path="/tenancy/statements/:id" element={<UnitStatementDetail />} />
            <Route path="/documents" element={<DocumentsOverview />} />
            <Route path="/documents/inbox" element={<DocumentsInbox />} />
            <Route path="/documents/registry" element={<DocumentsRegistry />} />
            <Route path="/documents/:id" element={<DocumentDetail />} />
            <Route path="/comms" element={<Comms />} />
            <Route path="/comms/announcements" element={<CommsAnnouncements />} />
            <Route path="/comms/announcements/:id" element={<AnnouncementDetail />} />
            <Route path="/comms/send" element={<CommsSend />} />
            <Route path="/comms/templates" element={<CommsTemplates />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/integrations/:slug" element={<IntegrationDetail />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/automations" element={<Automations />} />
            <Route path="/settings" element={<SettingsLayout />}>
              <Route index element={<Settings />} />
              <Route path="org" element={<SettingsOrganization />} />
              <Route path="portfolio" element={<SettingsPortfolio />} />
              <Route path="buildings" element={<SettingsBuildings />} />
              <Route path="units" element={<SettingsUnits />} />
              <Route path="users" element={<SettingsUsers />} />
              <Route path="roles" element={<SettingsRoles />} />
              <Route path="security" element={<SettingsSecurity />} />
              <Route path="visitor-logs" element={<SettingsVisitorLogs />} />
              <Route path="notifications" element={<SettingsNotifications />} />
              <Route path="audit" element={<SettingsAudit />} />
              <Route path="feedback" element={<SettingsFeedback />} />
            </Route>
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/cardnav-demo" element={<CardNavDemo />} />
          </Route>

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;