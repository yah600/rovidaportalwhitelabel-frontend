import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ClipboardList, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { mockTasks } from '@/data/mock-tasks'; // Import mockTasks
import TasksTable from '@/components/maintenance/TasksTable'; // Import TasksTable

const MaintenanceTasks = () => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { label: t('maintenance'), href: '/maintenance' },
    { label: t('tasks'), href: '/maintenance/tasks' },
  ];

  const hasTasks = mockTasks.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('maintenance')} {t('tasks')}</h1>
        <Button className="btn-primary">
          <PlusCircle className="mr-2 h-4 w-4" /> {t('create_new_task')}
        </Button>
      </header>
      <p className="text-rovida-slate-green-gray">{t('manage_individual_maintenance_tasks')}</p>

      {hasTasks ? (
        <TasksTable tasks={mockTasks} />
      ) : (
        <Card className="flex-1 card-rovida">
          <CardHeader>
            <CardTitle className="text-rovida-navy">{t('task_list')}</CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">{t('overview_all_maintenance_tasks')}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
              <ClipboardList className="h-12 w-12 text-rovida-gold" />
              <p>{t('maintenance_tasks_listed_here')}</p>
              <Button variant="outline" className="mt-4 btn-secondary">
                <PlusCircle className="mr-2 h-4 w-4" /> {t('create_first_task')}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MaintenanceTasks;