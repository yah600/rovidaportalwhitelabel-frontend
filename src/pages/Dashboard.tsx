import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import EmergencyBanner from '@/components/EmergencyBanner';
import { Skeleton } from '@/components/ui/skeleton'; // For loading states
import { format } from 'date-fns';
import RecentIssues from '@/components/dashboard/RecentIssues';
import UpcomingEvents from '@/components/dashboard/UpcomingEvents';
import RecentDocuments from '@/components/dashboard/RecentDocuments';

const Dashboard = () => {
  const { t } = useTranslation();
  const userName = "John Doe"; // Placeholder for dynamic user name
  const currentDate = format(new Date(), 'PPP'); // Formats date like "Oct 27, 2023"

  // Placeholder for active emergency status
  const hasActiveEmergency = true; // This would come from an API call

  // Placeholder for loading states
  const isLoadingKPIs = false;

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
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">+10% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('overdue_bills')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">-5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('due_tasks')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">+20% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('open_votes')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">No change</p>
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