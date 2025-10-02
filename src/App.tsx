import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import ErrorBoundary from './components/ErrorBoundary';
import AppShell from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';
import Issues from './pages/Issues';
import IssueDetail from './pages/Issues/IssueDetail';
import NewIssue from './pages/Issues/NewIssue';
import Kanban from './pages/Issues/Kanban';
import Emergency from './pages/Emergency';
import Maintenance from './pages/Maintenance';
import MaintenanceCalendar from './pages/Maintenance/Calendar';
import MaintenanceAssets from './pages/Maintenance/Assets';
import NewAsset from './pages/Maintenance/NewAsset';
import MaintenanceWorkOrders from './pages/Maintenance/WorkOrders';
import MaintenanceWorkOrderDetail from './pages/Maintenance/WorkOrderDetail';
import MaintenanceTasks from './pages/Maintenance/Tasks';
import MaintenanceTaskDetail from './pages/Maintenance/TaskDetail';
import MaintenanceAgenda from './pages/Maintenance/Agenda';
import Finance from './pages/Finance';
import FinanceBills from './pages/Finance/Bills';
import FinanceBillDetail from './pages/Finance/BillDetail';
import FinancePayments from './pages/Finance/Payments';
import FinancePurchaseOrders from './pages/Finance/PurchaseOrders';
import FinanceReports from './pages/Finance/Reports';
import FinanceLateFeesNSF from './pages/Finance/LateFeesNSF';
import FinanceBankReconciliation from './pages/Finance/BankReconciliation';
import Board from './pages/Board';
import BoardMeetings from './pages/Board/Meetings';
import BoardMeetingDetail from './pages/Board/MeetingDetail';
import BoardVotes from './pages/Board/Votes';
import BoardVoteDetail from './pages/Board/VoteDetail';
import ArchitecturalRequests from './pages/ArchitecturalRequests';
import ArchitecturalRequestDetail from './pages/Board/ArchitecturalRequestDetail';
import NewArchitecturalRequest from './pages/Board/NewArchitecturalRequest';
import Rules from './pages/Rules';
import RuleDetail from './pages/Rules/RuleDetail';
import ViolationTickets from './pages/Rules/ViolationTickets';
import ViolationTicketDetail from './pages/Rules/ViolationTicketDetail';
import Insurance from './pages/Insurance';
import InsurancePolicyDetail from './pages/Insurance/PolicyDetail';
import Amenities from './pages/Amenities';
import Tenancy from './pages/Tenancy';
import Leases from './pages/Tenancy/Leases';
import UnitStatements from './pages/Tenancy/UnitStatements'; // New import
import UnitStatementDetail from './pages/Tenancy/UnitStatementDetail';
import DocumentsOverview from './pages/Documents/Overview';
import DocumentsInbox from './pages/Documents/Inbox';
import DocumentsRegistry from './pages/Documents/Registry';
import DocumentDetail from './pages/Documents/DocumentDetail';
import Comms from './pages/Comms';
import CommsAnnouncements from './pages/Comms/Announcements';
import AnnouncementDetail from './pages/Comms/AnnouncementDetail';
import CommsSend from './pages/Comms/Send';
import CommsTemplates from './pages/Comms/Templates';
import Integrations from './pages/Integrations';
import IntegrationDetail from './pages/Integrations/IntegrationDetail';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import SettingsLayout from './components/layout/SettingsLayout';
import SettingsOrganization from './pages/Settings/Organization';
import SettingsPortfolio from './pages/Settings/Portfolio';
import SettingsBuildings from './pages/Settings/Buildings';
import SettingsUnits from './pages/Settings/Units';
import SettingsUsers from './pages/Settings/Users';
import SettingsRoles from './pages/Settings/Roles';
import SettingsSecurity from './pages/Settings/Security';
import SettingsVisitorLogs from './pages/Settings/VisitorLogs';
import SettingsNotifications from './pages/Settings/Notifications';
import SettingsAudit from './pages/Settings/Audit';
import SettingsFeedback from './pages/Settings/Feedback';
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
            <Route path="/maintenance/assets/new" element={<NewAsset />} />
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
            <Route path="/board/architectural-requests/new" element={<NewArchitecturalRequest />} />
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
            <Route path="/tenancy/statements" element={<UnitStatements />} /> {/* New route */}
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