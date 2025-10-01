import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import EmergencyBanner from '@/components/EmergencyBanner';
import { Skeleton } from '@/components/ui/skeleton'; // For loading states
import { format } from 'date-fns';
import RecentIssues from '@/components/dashboard/RecentIssues';
import UpcomingEvents from '@/components/dashboard/UpcomingEvents';
import RecentDocuments from '@/components/dashboard/RecentDocuments';
import { mockIssues } from '@/data/mock-issues'; // Import mock issues
import { mockBills } from '@/data/mock-bills'; // Import mock bills
import { mockTasks } from '@/data/mock-tasks'; // Import mock tasks
import { mockVotes } from '@/data/mock-votes'; // Import mock votes
import SplitText from '@/components/SplitText'; // Import SplitText
import AnimatedContent from '@/components/AnimatedContent'; // Import AnimatedContent
import GlassSurface from '@/components/GlassSurface'; // Import GlassSurface
import Counter from '@/components/Counter'; // Import Counter
// Removed unused icons for GlassIcons

const Dashboard = () => {
  const { t } = useTranslation();
  const userName = "John Doe"; // Placeholder for dynamic user name
  const currentDate = format(new Date(), 'PPP'); // Formats date like "Oct 27, 2023"
  // Removed useNavigate as quick actions are global

  // Placeholder for active emergency status
  const hasActiveEmergency = true; // This would come from an API call

  // Placeholder for loading states
  const [isLoadingKPIs, setIsLoadingKPIs] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoadingKPIs(false), 1000); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  // Calculate dynamic KPI values
  const openIssuesCount = mockIssues.filter(issue => issue.status === 'Open' || issue.status === 'In Progress' || issue.status === 'Pending').length;
  const overdueBillsCount = mockBills.filter(bill => bill.status === 'Overdue').length;
  const dueTasksCount = mockTasks.filter(task => task.status !== 'Completed' && task.dueDate <= new Date()).length;
  const openVotesCount = mockVotes.filter(vote => vote.status === 'Open').length;

  const kpiCards = [
    { title: t('open_issues'), value: openIssuesCount, trend: '+10% from last month' },
    { title: t('overdue_bills'), value: overdueBillsCount, trend: '-5% from last month' },
    { title: t('due_tasks'), value: dueTasksCount, trend: '+20% from last month' },
    { title: t('open_votes'), value: openVotesCount, trend: 'No change' },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <header className="flex items-center justify-between flex-wrap gap-2">
        <SplitText
          text={t('hello_user', { name: userName })}
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

      {hasActiveEmergency && (
        <EmergencyBanner
          isActive={hasActiveEmergency}
          message={t('critical_alert')}
          ctaText="View Emergency"
          ctaLink="/emergency"
        />
      )}

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {kpiCards.map((kpi, i) => (
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
        ))}
      </div>

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <AnimatedContent delay={0.5}>
          <RecentIssues />
        </AnimatedContent>
        <AnimatedContent delay={0.6}>
          <UpcomingEvents />
        </AnimatedContent>
        <AnimatedContent delay={0.7}>
          <RecentDocuments />
        </AnimatedContent>
      </div>
    </div>
  );
};

export default Dashboard;