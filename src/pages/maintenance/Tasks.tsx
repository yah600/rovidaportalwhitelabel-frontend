import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockTasks } from '@/data/mock-tasks';
import TasksTable from '@/components/maintenance/TasksTable';

const MaintenanceTasks = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('maintenance'), href: '/maintenance' },
    { label: 'Tasks', href: '/maintenance/tasks' },
  ];

  const hasTasks = mockTasks.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">{t('maintenance')} Tasks</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Create Task
        </Button>
      </header>

      {hasTasks ? (
        <TasksTable tasks={mockTasks} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              No tasks found.
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start by creating a new task.
            </p>
            <Button className="mt-4">
              <PlusCircle className="mr-2 h-4 w-4" /> Create Task
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenanceTasks;