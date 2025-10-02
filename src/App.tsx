import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import { Toaster } from '@/components/ui/sonner';

// Import Pages
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/AuthPage';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import OnboardingPage from './pages/OnboardingPage';
import Profile from './pages/Profile';
import About from './pages/About';
import CardNavDemo from './pages/CardNavDemo';
import Issues from './pages/Issues';
import Kanban from './pages/issues/Kanban';
import NewIssue from './pages/issues/NewIssue';
import IssueDetail from './pages/issues/IssueDetail';
import Emergency from './pages/Emergency';
import Maintenance from './pages/Maintenance';
import MaintenanceCalendar from './pages/maintenance/Calendar';
import MaintenanceAssets from './pages/maintenance/Assets';
import MaintenanceWorkOrders from './pages/maintenance/WorkOrders';
import MaintenanceWorkOrderDetail from './pages/maintenance/WorkOrderDetail'; // New placeholder page
import MaintenanceTasks from './pages/maintenance/Tasks';
import MaintenanceTaskDetail from './pages/maintenance/TaskDetail';
import MaintenanceAgenda from './pages/maintenance/Agenda';
import Finance from './pages/Finance';
import FinanceBills from './pages/finance/Bills';
import FinanceBillDetail from './pages/finance/BillDetail';
import FinancePayments from './pages/finance/Payments';
import PurchaseOrders from './pages/finance/PurchaseOrders';
import FinanceReports from './pages/finance/Reports';
import Board from './pages/Board';
import BoardMeetings from './pages/board/Meetings';
import BoardMeetingDetail from './pages/board/MeetingDetail';
import BoardVotes from './pages/board/Votes';
import BoardVoteDetail from './pages/board/VoteDetail';
import ArchitecturalRequests from './pages/ArchitecturalRequests';
import Rules from './pages/Rules';
import Insurance from './pages/Insurance';
import Amenities from './pages/Amenities';
import Tenancy from './pages/Tenancy';
import Leases from './pages/tenancy/Leases';
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
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        {/* Public Routes */}
        <Route path="/auth" element={<AuthPage />}>
          <Route path="login" element={<Login />} />
          <Route path="forgot" element={<ForgotPassword />} />
          <Route path="reset" element={<ResetPassword />} />
          <Route index element={<Navigate to="login" replace />} />
        </Route>
        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* Protected Routes (within AppShell) */}
        <Route element={<AppShell />}>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/cardnav-demo" element={<CardNavDemo />} />

          {/* Issues */}
          <Route path="/issues" element={<Issues />} />
          <Route path="/issues/kanban" element={<Kanban />} />
          <Route path="/issues/new" element={<NewIssue />} />
          <Route path="/issues/:id" element={<IssueDetail />} />

          {/* Emergency */}
          <Route path="/emergency" element={<Emergency />} />

          {/* Maintenance */}
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/maintenance/calendar" element={<MaintenanceCalendar />} />
          <Route path="/maintenance/assets" element={<MaintenanceAssets />} />
          <Route path="/maintenance/work-orders" element={<MaintenanceWorkOrders />} />
          <Route path="/maintenance/work-orders/:id" element={<MaintenanceWorkOrderDetail />} />
          <Route path="/maintenance/tasks" element={<MaintenanceTasks />} />
          <Route path="/maintenance/tasks/:id" element={<MaintenanceTaskDetail />} />
          <Route path="/maintenance/agenda" element={<MaintenanceAgenda />} />

          {/* Finance */}
          <Route path="/finance" element={<Finance />} />
          <Route path="/finance/bills" element={<FinanceBills />} />
          <Route path="/finance/bills/:id" element={<FinanceBillDetail />} />
          <Route path="/finance/payments" element={<FinancePayments />} />
          <Route path="/finance/purchase-orders" element={<PurchaseOrders />} />
          <Route path="/finance/reports" element={<FinanceReports />} />

          {/* Board */}
          <Route path="/board" element={<Board />} />
          <Route path="/board/meetings" element={<BoardMeetings />} />
          <Route path="/board/meetings/:id" element={<BoardMeetingDetail />} />
          <Route path="/board/votes" element={<BoardVotes />} />
          <Route path="/board/votes/:id" element={<BoardVoteDetail />} />
          <Route path="/board/architectural-requests" element={<ArchitecturalRequests />} />

          {/* Rules & Insurance & Amenities */}
          <Route path="/rules" element={<Rules />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/amenities" element={<Amenities />} />

          {/* Tenancy */}
          <Route path="/tenancy" element={<Tenancy />} />
          <Route path="/tenancy/leases" element={<Leases />} />

          {/* Documents */}
          <Route path="/documents" element={<DocumentsOverview />} />
          <Route path="/documents/inbox" element={<DocumentsInbox />} />
          <Route path="/documents/registry" element={<DocumentsRegistry />} />
          <Route path="/documents/:id" element={<DocumentDetail />} />

          {/* Communications */}
          <Route path="/comms" element={<Comms />} />
          <Route path="/comms/announcements" element={<CommsAnnouncements />} />
          <Route path="/comms/announcements/:id" element={<AnnouncementDetail />} />
          <Route path="/comms/send" element={<CommsSend />} />
          <Route path="/comms/templates" element={<CommsTemplates />} />

          {/* Integrations */}
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/integrations/:slug" element={<IntegrationDetail />} />

          {/* Analytics */}
          <Route path="/analytics" element={<Analytics />} />

          {/* Settings */}
          <Route path="/settings" element={<SettingsLayout />}>
            <Route index element={<Navigate to="org" replace />} />
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

          {/* Catch-all for undefined routes */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;