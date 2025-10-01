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
import { PlusCircle, Receipt, Wrench, MessageSquare } from 'lucide-react'; // Import icons for GlassIcons
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Dashboard = () => {
  const { t } = useTranslation();
  const userName = "John Doe"; // Placeholder for dynamic user name
  const currentDate = format(new Date(), 'PPP'); // Formats date like "Oct 27, 2023"
  const navigate = useNavigate();

  // Placeholder for active emergency status
  const hasActiveEmergency = true; // This would come from an API call

  // Placeholder for loading states
  const isLoadingKPIs = false;

  // Calculate dynamic KPI values
  const openIssuesCount = mockIssues.filter(issue => issue.status === 'Open' || issue.status === 'In Progress' || issue.status === 'Pending').length;
  const overdueBillsCount = mockBills.filter(bill => bill.status === 'Overdue').length;
  const dueTasksCount = mockTasks.filter(task => task.status !== 'Completed' && task.dueDate <= new Date()).length;
  const openVotesCount = mockVotes.filter(vote => vote.status === 'Open').length;

  // Quick actions are now handled globally in AppShell
  // const quickActions = [
  //   { icon: <PlusCircle />, color: 'rovida-gold', label: 'New Issue', onClick: () => navigate('/issues/new') },
  //   { icon: <Receipt />, color: 'rovida-navy', label: 'View Bills', onClick: () => navigate('/finance/bills') },
  //   { icon: <Wrench />, color: 'rovida-slate-green-gray', label: 'Work Orders', onClick: () => navigate('/maintenance/work-orders') },
  //   { icon: <MessageSquare />, color: 'rovida-success', label: 'Announce', onClick: () => navigate('/comms/send') },
  // ];

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
        {isLoadingKPIs ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="card-rovida">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  <Skeleton className="h-4 w-[100px]" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <Skeleton className="h-8 w-[80px]" />
                </div>
                <p className="text-xs text-rovida-slate-green-gray">
                  <Skeleton className="h-3 w-[150px] mt-1" />
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <AnimatedContent delay={0.1}>
              <GlassSurface width="100%" height="auto" borderRadius={10} blur={15} backgroundOpacity={0.1} className="p-4">
                <Card className="w-full h-full bg-transparent border-none shadow-none">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-rovida-navy">{t('open_issues')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Counter value={openIssuesCount} fontSize={24} places={[100, 10, 1]} textColor="#111418" fontWeight={700} gradientFrom="rgba(255,255,255,0.5)" gradientTo="rgba(255,255,255,0)" />
                    <p className="text-xs text-rovida-slate-green-gray">+10% from last month</p> {/* Placeholder trend */}
                  </CardContent>
                </Card>
              </GlassSurface>
            </AnimatedContent>
            <AnimatedContent delay={0.2}>
              <GlassSurface width="100%" height="auto" borderRadius={10} blur={15} backgroundOpacity={0.1} className="p-4">
                <Card className="w-full h-full bg-transparent border-none shadow-none">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-rovida-navy">{t('overdue_bills')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Counter value={overdueBillsCount} fontSize={24} places={[100, 10, 1]} textColor="#111418" fontWeight={700} gradientFrom="rgba(255,255,255,0.5)" gradientTo="rgba(255,255,255,0)" />
                    <p className="text-xs text-rovida-slate-green-gray">-5% from last month</p> {/* Placeholder trend */}
                  </CardContent>
                </Card>
              </GlassSurface>
            </AnimatedContent>
            <AnimatedContent delay={0.3}>
              <GlassSurface width="100%" height="auto" borderRadius={10} blur={15} backgroundOpacity={0.1} className="p-4">
                <Card className="w-full h-full bg-transparent border-none shadow-none">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-rovida-navy">{t('due_tasks')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Counter value={dueTasksCount} fontSize={24} places={[100, 10, 1]} textColor="#111418" fontWeight={700} gradientFrom="rgba(255,255,255,0.5)" gradientTo="rgba(255,255,255,0)" />
                    <p className="text-xs text-rovida-slate-green-gray">+20% from last month</p> {/* Placeholder trend */}
                  </CardContent>
                </Card>
              </GlassSurface>
            </AnimatedContent>
            <AnimatedContent delay={0.4}>
              <GlassSurface width="100%" height="auto" borderRadius={10} blur={15} backgroundOpacity={0.1} className="p-4">
                <Card className="w-full h-full bg-transparent border-none shadow-none">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-rovida-navy">{t('open_votes')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Counter value={openVotesCount} fontSize={24} places={[100, 10, 1]} textColor="#111418" fontWeight={700} gradientFrom="rgba(255,255,255,0.5)" gradientTo="rgba(255,255,255,0)" />
                    <p className="text-xs text-rovida-slate-green-gray">No change</p> {/* Placeholder trend */}
                  </CardContent>
                </Card>
              </GlassSurface>
            </AnimatedContent>
          </>
        )}
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

      {/* Quick Actions are now global */}
      {/* <div className="mt-4">
        <h2 className="text-xl font-semibold mb-4 text-rovida-navy">Quick Actions</h2>
        <GlassIcons items={quickActions} className="justify-start" />
      </div> */}
    </div>
  );
};

export default Dashboard;