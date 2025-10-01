import React from 'react';
import { useTranslation } from 'react-i18next';
import { MadeWithDyad } from '@/components/made-with-dyad';

const Dashboard = () => {
  const { t } = useTranslation();
  const userName = "John Doe"; // Placeholder

  return (
    <div className="flex flex-1 flex-col gap-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">{t('hello_user', { name: userName })}</h1>
        {/* Building selector will be in Topbar */}
      </header>

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {/* KPI Cards - Placeholder */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-sm font-medium">{t('open_issues')}</h3>
          <p className="text-2xl font-bold">5</p>
          <p className="text-xs text-muted-foreground">+10% from last month</p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-sm font-medium">{t('overdue_bills')}</h3>
          <p className="text-2xl font-bold">3</p>
          <p className="text-xs text-muted-foreground">-5% from last month</p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-sm font-medium">{t('due_tasks')}</h3>
          <p className="text-2xl font-bold">8</p>
          <p className="text-xs text-muted-foreground">+20% from last month</p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-sm font-medium">{t('open_votes')}</h3>
          <p className="text-2xl font-bold">2</p>
          <p className="text-xs text-muted-foreground">No change</p>
        </div>
      </div>

      {/* Emergency Banner - Placeholder */}
      <div className="bg-destructive text-destructive-foreground p-4 rounded-lg text-center font-bold">
        {t('critical_alert')}
      </div>

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {/* To-dos, Mini Calendar, Latest Documents - Placeholder */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 col-span-2 lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">To-dos</h3>
          <p className="text-muted-foreground">Your tasks will appear here.</p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 col-span-2 lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Mini Calendar</h3>
          <p className="text-muted-foreground">Calendar view coming soon.</p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 col-span-2 xl:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Latest Documents</h3>
          <p className="text-muted-foreground">Recent documents will be listed here.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;