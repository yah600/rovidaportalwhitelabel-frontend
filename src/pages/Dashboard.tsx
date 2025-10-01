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

const Dashboard = () => {
  const { t } = useTranslation();
  const userName = "John Doe"; // Placeholder for dynamic user name
  const currentDate = format(new Date(), 'PPP'); // Formats date like "Oct 27, 2023"

  // Placeholder for active emergency status
  const hasActiveEmergency = true; // This would come from an API call

  // Placeholder for loading states
  const isLoadingKPIs = false;

  // Calculate dynamic KPI values
  const openIssuesCount = mockIssues.filter(issue => issue.status === 'Open' || issue.status === 'In Progress' || issue.status === 'Pending').length;
  const overdueBillsCount = mockBills.filter(bill => bill.status === 'Overdue').length;
  const dueTasksCount = mockTasks.filter(task => task.status !== 'Completed' && task.dueDate <= new Date()).length;
  const openVotesCount = mockVotes.filter(vote => vote.status === 'Open').length;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <header className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-2xl font-semibold md:text-3xl">{t('hello_user', { name: userName })}</h1>
        <p className="text-muted-foreground text-sm">{currentDate}</p>
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
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  <Skeleton className="h-4 w-[100px]" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <Skeleton className="h-8 w-[80px]" />
                </div>
                <p className="text-xs text-muted-foreground">
                  <Skeleton className="h-3 w-[150px] mt-1" />
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('open_issues')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{openIssuesCount}</div>
                <p className="text-xs text-muted-foreground">+10% from last month</p> {/* Placeholder trend */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('overdue_bills')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overdueBillsCount}</div>
                <p className="text-xs text-muted-foreground">-5% from last month</p> {/* Placeholder trend */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('due_tasks')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dueTasksCount}</div>
                <p className="text-xs text-muted-foreground">+20% from last month</p> {/* Placeholder trend */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('open_votes')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{openVotesCount}</div>
                <p className="text-xs text-muted-foreground">No change</p> {/* Placeholder trend */}
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <RecentIssues />
        <UpcomingEvents />
        <RecentDocuments />
      </div>
    </div>
  );
};

export default Dashboard;