import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import DocumentsOverview from "./pages/documents/Overview";
import DocumentsRegistry from "./pages/documents/Registry";
import DocumentsInbox from "./pages/documents/Inbox";
import DocumentDetail from "./pages/documents/DocumentDetail";
import Comms from "./pages/Comms";
import CommsAnnouncements from "./pages/comms/Announcements";
import CommsSend from "./pages/comms/Send";
import CommsTemplates from "./pages/comms/Templates";
import Integrations from "./pages/Integrations";
import IntegrationDetail from "./pages/integrations/IntegrationDetail";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import SettingsOrganization from "./pages/settings/Organization";
import SettingsBuildings from "./pages/settings/Buildings";
import SettingsUnits from "./pages/settings/Units";
import SettingsRoles from "./pages/settings/Roles";
import SettingsSecurity from "./pages/settings/Security";
import SettingsNotifications from "./pages/settings/Notifications";
import SettingsAudit from "./pages/settings/Audit";
import SettingsFeedback from "./pages/settings/Feedback";
import Profile from "./pages/Profile";
import About from "./pages/About";
import CardNavDemo from "./pages/CardNavDemo";
import OnboardingPage from "./pages/OnboardingPage";

// New Pages
import Rules from "./pages/Rules";
import Insurance from "./pages/Insurance";
import ArchitecturalRequests from "./pages/ArchitecturalRequests";
import PurchaseOrders from "./pages/finance/PurchaseOrders";
import Amenities from "./pages/Amenities";
import SettingsLeases from "./pages/settings/Leases";
import SettingsPortfolio from "./pages/settings/Portfolio";
import SettingsVisitorLogs from "./pages/settings/VisitorLogs";
import SettingsUsers from "./pages/settings/Users"; // Added missing import
import SettingsLayout from "./components/layout/SettingsLayout";

// Auth Pages
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Authentication Routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/forgot" element={<ForgotPassword />} />
          <Route path="/auth/reset" element={<ResetPassword />} />
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* Protected Routes wrapped by AppShell */}
          <Route element={<AppShell />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/issues" element={<Issues />} />
            <Route path="/issues/kanban" element={<Kanban />} />
            <Route path="/issues/new" element={<NewIssue />} />
            <Route path="/issues/:id" element={<IssueDetail />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/maintenance/calendar" element={<MaintenanceCalendar />} />
            <Route path="/maintenance/assets" element={<MaintenanceAssets />} />
            <Route path="/maintenance/work-orders" element={<MaintenanceWorkOrders />} />
            <Route path="/maintenance/tasks" element={<MaintenanceTasks />} />
            <Route path="/maintenance/tasks/:id" element={<MaintenanceTaskDetail />} />
            <Route path="/maintenance/agenda" element={<MaintenanceAgenda />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/finance/bills" element={<FinanceBills />} />
            <Route path="/finance/bills/:id" element={<FinanceBillDetail />} />
            <Route path="/finance/payments" element={<FinancePayments />} />
            <Route path="/finance/reports" element={<FinanceReports />} />
            <Route path="/finance/purchase-orders" element={<PurchaseOrders />} />
            <Route path="/board" element={<Board />} />
            <Route path="/board/meetings" element={<BoardMeetings />} />
            <Route path="/board/meetings/:id" element={<BoardMeetingDetail />} />
            <Route path="/board/votes" element={<BoardVotes />} />
            <Route path="/board/votes/:id" element={<BoardVoteDetail />} />
            <Route path="/board/architectural-requests" element={<ArchitecturalRequests />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/amenities" element={<Amenities />} />
            {/* Documents Routes */}
            <Route path="/documents" element={<DocumentsOverview />} />
            <Route path="/documents/registry" element={<DocumentsRegistry />} />
            <Route path="/documents/inbox" element={<DocumentsInbox />} />
            <Route path="/documents/:id" element={<DocumentDetail />} />
            <Route path="/comms" element={<Comms />} />
            <Route path="/comms/announcements" element={<CommsAnnouncements />} />
            <Route path="/comms/send" element={<CommsSend />} />
            <Route path="/comms/templates" element={<CommsTemplates />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/integrations/:slug" element={<IntegrationDetail />} />
            <Route path="/analytics" element={<Analytics />} />
            {/* Settings Routes with Layout */}
            <Route path="/settings" element={<SettingsLayout />}>
              <Route index element={<Settings />} />
              <Route path="org" element={<SettingsOrganization />} />
              <Route path="portfolio" element={<SettingsPortfolio />} />
              <Route path="buildings" element={<SettingsBuildings />} />
              <Route path="units" element={<SettingsUnits />} />
              <Route path="leases" element={<SettingsLeases />} />
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

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;