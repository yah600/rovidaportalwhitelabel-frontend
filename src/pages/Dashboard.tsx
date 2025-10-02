import React from 'react';
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

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoadingKPIs(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Helper to filter data based on user's scope
  const filterByScope = <T extends { unit?: string; buildingId?: string; id?: string }>(
    data: T[],
    moduleName: string
  ): T[] => {
    if (!currentUser || currentUser.roles.some(role => role.scope.isSuper || role.name === 'Client Super Administrator' || role.name === 'Condo Administrator')) {
      return data; // Super admins and condo admins see all
    }

    const userBuildingIds = currentUser.roles.flatMap(role => role.scope.buildingIds || []);
    const userUnitIds = currentUser.roles.flatMap(role => role.scope.unitIds || []);
    const userVendorId = currentUser.roles.find(role => role.scope.vendorId)?.scope.vendorId;

    return data.filter(item => {
      if (item.unit) {
        const unit = item.unit.replace('Unit ', 'UNIT'); // Convert 'Unit 101' to 'UNIT101' for comparison
        if (userUnitIds.includes(unit)) return true;
      }
      if (item.buildingId && userBuildingIds.includes(item.buildingId)) return true;
      // For vendors, filter by assigned work orders/issues (mock data doesn't have vendorId on issues/work orders directly, so this is a placeholder)
      if (moduleName === 'Maintenance' && userVendorId && (item as any).assignedTo === currentUser.name) return true; // Assuming assignedTo matches user name for mock
      if (moduleName === 'Issues' && userVendorId && (item as any).assignee === currentUser.name) return true; // Assuming assignee matches user name for mock

      // If no specific scope, and not a super admin, filter out
      // For roles like Accountant, Board Member, Auditor, they might see org-wide data
      // This logic needs to be more specific per module if needed.
      // For now, if no specific scope, they see all if they have read permission for the module.
      return canRead(moduleName);
    });
  };

  // Filter mock data based on user's role and scope
  const filteredIssues = filterByScope(mockIssues, 'Issues');
  const filteredBills = filterByScope(mockBills, 'Finance');
  const filteredTasks = filterByScope(mockTasks, 'Maintenance');
  const filteredVotes = filterByScope(mockVotes, 'Board');

  // Calculate dynamic KPI values based on filtered data
  const openIssuesCount = filteredIssues.filter(issue => issue.status === 'Open' || issue.status === 'In Progress' || issue.status === 'Pending').length;
  const overdueBillsCount = filteredBills.filter(bill => bill.status === 'Overdue').length;
  const dueTasksCount = filteredTasks.filter(task => task.status !== 'Completed' && task.dueDate <= new Date()).length;
  const openVotesCount = filteredVotes.filter(vote => vote.status === 'Open').length;

  const kpiCards = [
    { title: t('open issues', { ns: 'dashboard' }), value: openIssuesCount, trend: t('trend issues', { ns: 'dashboard' }), module: 'Issues' },
    { title: t('overdue bills', { ns: 'dashboard' }), value: overdueBillsCount, trend: t('trend bills', { ns: 'dashboard' }), module: 'Finance' },
    { title: t('due tasks', { ns: 'dashboard' }), value: dueTasksCount, trend: t('trend tasks', { ns: 'dashboard' }), module: 'Maintenance' },
    { title: t('open votes', { ns: 'dashboard' }), value: openVotesCount, trend: t('trend votes', { ns: 'dashboard' }), module: 'Board' },
  ];

  const hasActiveEmergency = canRead('Emergency Center') && true; // Placeholder for actual emergency status

  return (
    <div className="flex flex-1 flex-col gap-4">
      <header className="flex items-center justify-between flex-wrap gap-2">
        <SplitText
          text={t('hello user', { name: userName, ns: 'common' })}
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
        {canRead('Board') && (
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