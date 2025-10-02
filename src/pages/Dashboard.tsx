import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import EmergencyBanner from '@/components/EmergencyBanner';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import RecentIssues from '@/components/dashboard/RecentIssues';
import UpcomingEvents from '@/components/dashboard/UpcomingEvents';
import RecentDocuments from '@/components/dashboard/RecentDocuments';
import { mockIssues, Issue } from '@/data/mock-issues';
import { mockBills, Bill } from '@/data/mock-bills';
import { mockTasks, Task } from '@/data/mock-tasks';
import { mockVotes, Vote } from '@/data/mock-votes';
import SplitText from '@/components/SplitText';
import AnimatedContent from '@/components/AnimatedContent';
import GlassSurface from '@/components/GlassSurface';
import Counter from '@/components/Counter';
import { useUser } from '@/context/UserContext';
import { useAuth } from '@/hooks/useAuth';

const Dashboard = () => {
  const { t } = useTranslation(['dashboard', 'common', 'emergency', 'issues', 'finance', 'maintenance', 'board', 'documents']); // Specify namespaces
  const { currentUser } = useUser();
  const { canRead } = useAuth();
  const userName = currentUser?.name || t("guest", { ns: 'common' });
  const currentDate = format(new Date(), 'PPP');

  const [isLoadingKPIs, setIsLoadingKPIs] = React.useState(true);
  const [showFullWelcome, setShowFullWelcome] = useState(true); // New state for welcome text

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoadingKPIs(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // New useEffect for the welcome text transition
  useEffect(() => {
    const welcomeTimer = setTimeout(() => {
      setShowFullWelcome(false);
    }, 12000); // 12 seconds for the transition
    return () => clearTimeout(welcomeTimer);
  }, []);

  const dynamicWelcomeText = showFullWelcome
    ? t('welcome', { ns: 'common' }) // Use the new translation key for "Welcome"
    : 'Rovida'; // Hardcoded "Rovida" as requested

  // Helper to filter data based on user's scope
  const filterByScope = <T extends { unit?: string; buildingId?: string; id?: string; assignee?: string; reporter?: string; vendor?: string }>(
    data: T[],
    moduleName: string
  ): T[] => {
    if (!currentUser || currentUser.roles.length === 0) {
      return [];
    }

    // Platform Owner, Client Super-Administrator, Condo Administrator see all
    if (currentUser.roles.some(role => role.scope.isSuper || role.name === 'Client Super-Administrator' || role.name === 'Condo Administrator')) {
      return data;
    }

    const userBuildingIds = currentUser.roles.flatMap(role => role.scope.buildingIds || []);
    const userUnitIds = currentUser.roles.flatMap(role => role.scope.unitIds || []);
    const userVendorId = currentUser.roles.find(role => role.scope.vendorId)?.scope.vendorId;

    return data.filter(item => {
      // Filter for Owners/Tenants by unit
      if ((currentUser.roles.some(r => r.name === 'Owner' || r.name === 'Tenant')) && item.unit) {
        const itemUnitNumber = item.unit.replace('Unit ', 'UNIT');
        if (userUnitIds.includes(itemUnitNumber)) return true;
      }

      // Filter for Property Managers, Board Members, Building Maintenance Technician by building
      if ((currentUser.roles.some(r => r.name === 'Property Manager' || r.name === 'Board Member' || r.name === 'Building Maintenance Technician' || r.name === 'Emergency Agent' || r.name === 'Concierge / Front Desk / Security')) && item.unit) {
        // This is a simplified mapping. In a real app, units would have explicit building IDs.
        const buildingIdFromUnit = item.unit.startsWith('Unit 1') || item.unit.startsWith('Unit 2') ? 'BLD001' : (item.unit.startsWith('Unit 3') ? 'BLD002' : null);
        if (buildingIdFromUnit && userBuildingIds.includes(buildingIdFromUnit)) return true;
      }
      
      // Filter for Vendors by assignedTo or vendorId (if item has a vendor field)
      if (currentUser.roles.some(r => r.name === 'Vendor / Service Provider')) {
        if (item.assignee === currentUser.name) return true; // For tasks/issues assigned to them
        if (item.vendor === userVendorId) return true; // For bills/POs from their vendor
      }

      // Accountant sees all financial data
      if (currentUser.roles.some(r => r.name === 'Accountant') && moduleName.startsWith('Finance')) {
        return true;
      }

      // Read-Only Auditor sees all data
      if (currentUser.roles.some(r => r.name === 'Read-Only Auditor')) {
        return true;
      }

      // If no specific scope matches, and not a super admin, filter out
      return false;
    });
  };

  // Filter mock data based on user's role and scope
  const filteredIssues = canRead('Issues') ? filterByScope(mockIssues, 'Issues') : [];
  const filteredBills = canRead('Finance - Bills/Recurring/Deposits') ? filterByScope(mockBills, 'Finance - Bills/Recurring/Deposits') : [];
  const filteredTasks = canRead('Maintenance') ? filterByScope(mockTasks, 'Maintenance') : [];
  const filteredVotes = canRead('Board - Meetings/Votes') ? filterByScope(mockVotes, 'Board - Meetings/Votes') : [];

  // Calculate dynamic KPI values based on filtered data
  const openIssuesCount = filteredIssues.filter(issue => issue.status === 'Open' || issue.status === 'In Progress' || issue.status === 'Pending').length;
  const overdueBillsCount = filteredBills.filter(bill => bill.status === 'Overdue').length;
  const dueTasksCount = filteredTasks.filter(task => task.status !== 'Completed' && task.dueDate <= new Date()).length;
  const openVotesCount = filteredVotes.filter(vote => vote.status === 'Open').length;

  const kpiCards = [
    { title: t('open issues', { ns: 'dashboard' }), value: openIssuesCount, trend: t('trend issues', { ns: 'dashboard' }), module: 'Issues' },
    { title: t('overdue bills', { ns: 'dashboard' }), value: overdueBillsCount, trend: t('trend bills', { ns: 'dashboard' }), module: 'Finance - Bills/Recurring/Deposits' },
    { title: t('due tasks', { ns: 'dashboard' }), value: dueTasksCount, trend: t('trend tasks', { ns: 'dashboard' }), module: 'Maintenance' },
    { title: t('open votes', { ns: 'dashboard' }), value: openVotesCount, trend: t('trend votes', { ns: 'dashboard' }), module: 'Board - Meetings/Votes' },
  ];

  const hasActiveEmergency = canRead('Emergency Center') && mockIssues.some(issue => issue.priority === 'Critical' && issue.status !== 'Closed'); // Check for critical open issues as emergency

  return (
    <div className="flex flex-1 flex-col gap-4">
      <header className="flex items-center justify-between flex-wrap gap-2">
        <SplitText
          text={dynamicWelcomeText} // Use the dynamic text here
          tag="h1"
          className="text-2xl font-semibold md:text-3xl text-page-title"
          delay={50}
          duration={0.8}
          ease="power3.out"
          splitType="words"
          from={{ opacity: 0, y: 20 }}
          to={{ opacity: 1, y: 0 }}
        />
        <p className="text-rovida-slate-green-gray text-sm">{currentDate}</p>
      </header>

      {hasActiveEmergency && canRead('Emergency Center') && (
        <EmergencyBanner
          isActive={hasActiveEmergency}
          message={t('critical alert', { ns: 'dashboard' })}
          ctaText={t('view emergency', { ns: 'common' })}
          ctaLink="/emergency"
        />
      )}

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {kpiCards.map((kpi, i) => (
          canRead(kpi.module) && (
            <AnimatedContent key={i} delay={0.1 * (i + 1)}>
              <GlassSurface width="100%" height="auto" borderRadius={10} blur={15} backgroundOpacity={0.1} className="p-4">
                <Card className="w-full h-full bg-transparent border-none shadow-none flex flex-col justify-between">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-rovida-navy">{kpi.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col justify-end h-full pt-0">
                    {isLoadingKPIs ? (
                      <>
                        <Skeleton className="h-8 w-[80px] mb-2" />
                        <Skeleton className="h-3 w-[150px]" />
                      </>
                    ) : (
                      <>
                        <Counter value={kpi.value} fontSize={24} places={[100, 10, 1]} textColor="#111418" fontWeight={700} gradientFrom="rgba(255,255,255,0.5)" gradientTo="rgba(255,255,255,0)" />
                        <p className="text-xs text-rovida-slate-green-gray mt-1">{kpi.trend}</p>
                      </>
                    )}
                  </CardContent>
                </Card>
              </GlassSurface>
            </AnimatedContent>
          )
        ))}
      </div>

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {canRead('Issues') && (
          <AnimatedContent delay={0.5}>
            <RecentIssues />
          </AnimatedContent>
        )}
        {canRead('Board - Meetings/Votes') && (
          <AnimatedContent delay={0.6}>
            <UpcomingEvents />
          </AnimatedContent>
        )}
        {canRead('Documents') && (
          <AnimatedContent delay={0.7}>
            <RecentDocuments />
          </AnimatedContent>
        )}
      </div>
    </div>
  );
};

export default Dashboard;