import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Issues from "./pages/Issues";
import Kanban from "./pages/issues/Kanban";
import NewIssue from "./pages/issues/NewIssue";
import IssueDetail from "./pages/issues/IssueDetail";
import Emergency from "./pages/Emergency";
import Maintenance from "./pages/Maintenance";
import MaintenanceCalendar from "./pages/maintenance/Calendar";
import MaintenanceAssets from "./pages/maintenance/Assets";
import MaintenanceWorkOrders from "./pages/maintenance/WorkOrders";
import MaintenanceTasks from "./pages/maintenance/Tasks";
import MaintenanceTaskDetail from "./pages/maintenance/TaskDetail";
import MaintenanceAgenda from "./pages/maintenance/Agenda";
import Finance from "./pages/Finance";
import FinanceBills from "./pages/finance/Bills";
import FinanceBillDetail from "./pages/finance/BillDetail";
import FinancePayments from "./pages/finance/Payments";
import FinanceReports from "./pages/finance/Reports";
import Board from "./pages/Board";
import BoardMeetings from "./pages/board/Meetings";
import BoardMeetingDetail from "./pages/board/MeetingDetail";
import BoardVotes from "./pages/board/Votes";
import BoardVoteDetail from "./pages/board/VoteDetail";
import Documents from "./pages/Documents"; // New Documents overview page
import DocumentsRegistry from "./pages/documents/Registry"; // Renamed Documents table page
import DocumentsInbox from "./pages/documents/Inbox";
import DocumentDetail from "./pages/documents/DocumentDetail";
import Comms from "./pages/Comms";
import CommsAnnouncements from "./pages/comms/Announcements";
import AnnouncementDetail from "./pages/comms/AnnouncementDetail";
import CommsSend from "./pages/comms/Send";
import CommsTemplates from "./pages/comms/Templates";
import Integrations from "./pages/Integrations";
import IntegrationDetail from "./pages/integrations/IntegrationDetail";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import SettingsOrganization from "./pages/settings/Organization";
import SettingsBuildings from "./pages/settings/Buildings";
import SettingsUnits from "./pages/settings/Units";
import SettingsUsers from "./pages/settings/Users";
import SettingsRoles from "./pages/settings/Roles";
import SettingsSecurity from "./pages/settings/Security";
import SettingsNotifications from "./pages/settings/Notifications";
import SettingsAudit from "./pages/settings/Audit";
import SettingsFeedback from "./pages/settings/Feedback";
import Profile from "./pages/Profile";
import LoginPage from "./pages/auth/LoginPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Authentication Routes - these do not use the AppShell layout */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/forgot" element={<ForgotPasswordPage />} />
          <Route path="/auth/reset" element={<ResetPasswordPage />} />

          {/* Main application routes wrapped by AppShell layout */}
          <Route path="/" element={<AppShell />}>
            <Route index element={<Index />} /> {/* Renders Index at / */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="issues" element={<Issues />} />
            <Route path="issues/kanban" element={<Kanban />} />
            <Route path="issues/new" element={<NewIssue />} />
            <Route path="issues/:id" element={<IssueDetail />} />
            <Route path="emergency" element={<Emergency />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="maintenance/calendar" element={<MaintenanceCalendar />} />
            <Route path="maintenance/assets" element={<MaintenanceAssets />} />
            <Route path="maintenance/work-orders" element={<MaintenanceWorkOrders />} />
            <Route path="maintenance/tasks" element={<MaintenanceTasks />} />
            <Route path="maintenance/tasks/:id" element={<MaintenanceTaskDetail />} />
            <Route path="maintenance/agenda" element={<MaintenanceAgenda />} />
            <Route path="finance" element={<Finance />} />
            <Route path="finance/bills" element={<FinanceBills />} />
            <Route path="finance/bills/:id" element={<FinanceBillDetail />} />
            <Route path="finance/payments" element={<FinancePayments />} />
            <Route path="finance/reports" element={<FinanceReports />} />
            <Route path="board" element={<Board />} /> {/* Added a base route for Board */}
            <Route path="board/meetings" element={<BoardMeetings />} />
            <Route path="board/meetings/:id" element={<BoardMeetingDetail />} />
            <Route path="board/votes" element={<BoardVotes />} />
            <Route path="board/votes/:id" element={<BoardVoteDetail />} />
            <Route path="documents" element={<Documents />} /> {/* New Documents overview */}
            <Route path="documents/inbox" element={<DocumentsInbox />} />
            <Route path="documents/registry" element={<DocumentsRegistry />} /> {/* Renamed Documents table */}
            <Route path="documents/:id" element={<DocumentDetail />} />
            <Route path="comms" element={<Comms />} /> {/* Added a base route for Comms */}
            <Route path="comms/announcements" element={<CommsAnnouncements />} />
            <Route path="comms/announcements/:id" element={<AnnouncementDetail />} />
            <Route path="comms/send" element={<CommsSend />} />
            <Route path="comms/templates" element={<CommsTemplates />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="integrations/:slug" element={<IntegrationDetail />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} /> {/* Added a base route for Settings */}
            <Route path="settings/org" element={<SettingsOrganization />} />
            <Route path="settings/buildings" element={<SettingsBuildings />} />
            <Route path="settings/units" element={<SettingsUnits />} />
            <Route path="settings/users" element={<SettingsUsers />} />
            <Route path="settings/roles" element={<SettingsRoles />} />
            <Route path="settings/security" element={<SettingsSecurity />} />
            <Route path="settings/notifications" element={<SettingsNotifications />} />
            <Route path="settings/audit" element={<SettingsAudit />} />
            <Route path="settings/feedback" element={<SettingsFeedback />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Catch-all route for any unmatched paths */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;