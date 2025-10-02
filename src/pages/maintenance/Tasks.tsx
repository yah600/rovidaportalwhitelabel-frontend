import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ClipboardList, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { mockTasks } from '@/data/mock-tasks'; // Import mockTasks
import TasksTable from '@/components/maintenance/TasksTable'; // Import TasksTable
import { toast } from 'sonner'; // Import toast for actions
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

const MaintenanceTasks = () => {
  const { t } = useTranslation(['maintenance', 'common']); // Specify namespaces

  const breadcrumbItems = [
    { label: t('maintenance', { ns: 'maintenance' }), href: '/maintenance' },
    { label: t('tasks', { ns: 'maintenance' }), href: '/maintenance/tasks' },
  ];

  const hasTasks = mockTasks.length > 0;
  const { canRead, canCreate } = useAuth();

  const handleCreateNewTask = () => {
    toast.info(t('create new task action', { ns: 'maintenance' })); // Placeholder action with toast
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('maintenance', { ns: 'maintenance' })} {t('tasks', { ns: 'maintenance' })}</h1>
        {canCreate('Maintenance') && (
          <Button className="btn-primary" onClick={handleCreateNewTask}>
            <PlusCircle className="mr-2 h-4 w-4" /> {t('create new task', { ns: 'maintenance' })}
          </Button>
        )}
      </header>
      <p className="text-rovida-slate-green-gray">{t('manage individual maintenance tasks', { ns: 'maintenance' })}</p>

      {canRead('Maintenance') ? (
        hasTasks ? (
          <div className="card-rovida p-4"> {/* Wrapped content in card-rovida */}
            <TasksTable tasks={mockTasks} />
          </div>
        ) : (
          <Card className="flex-1 card-rovida">
            <CardHeader>
              <CardTitle className="text-rovida-navy">{t('task list', { ns: 'maintenance' })}</CardTitle>
              <CardDescription className="text-rovida-slate-green-gray">{t('overview all maintenance tasks', { ns: 'maintenance' })}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
                <ClipboardList className="h-12 w-12 text-rovida-gold" />
                <p className="text-lg font-medium text-rovida-near-black">{t('maintenance tasks listed here', { ns: 'maintenance' })}</p>
                <p className="text-sm text-center">{t('manage individual maintenance tasks, assignees, and monitor their progress. Create your first task to get started.', { ns: 'maintenance' })}</p>
                {canCreate('Maintenance') && (
                  <Button variant="outline" className="mt-4 btn-secondary" onClick={handleCreateNewTask}>
                    <PlusCircle className="mr-2 h-4 w-4" /> {t('create first task', { ns: 'maintenance' })}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )
      ) : (
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <ClipboardList className="h-12 w-12 text-rovida-gold" />
            <p>{t('no permission view tasks', { ns: 'common' })}</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default MaintenanceTasks;