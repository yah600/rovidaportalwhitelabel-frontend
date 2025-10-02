import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import KanbanColumn from '@/components/issues/KanbanColumn';
import { mockIssues, Issue } from '@/data/mock-issues';
import { Card } from '@/components/ui/card'; // Import Card for permission denied state
import { ClipboardList } from 'lucide-react'; // Import icon for permission denied state
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

const Kanban = () => {
  const { t } = useTranslation(['issues', 'common']); // Specify namespaces
  const { canRead } = useAuth();

  const breadcrumbItems = [
    { label: t('issues', { ns: 'issues' }), href: '/issues' },
    { label: t('kanban board', { ns: 'issues' }), href: '/issues/kanban' },
  ];

  // Define Kanban columns and their corresponding issue statuses
  const columns = [
    { title: t('open', { ns: 'common' }), status: 'Open' as Issue['status'] },
    { title: t('in progress', { ns: 'common' }), status: 'In Progress' as Issue['status'] },
    { title: t('pending', { ns: 'issues' }), status: 'Pending' as Issue['status'] },
    { title: t('closed', { ns: 'common' }), status: 'Closed' as Issue['status'] },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('issues', { ns: 'issues' })} {t('kanban board', { ns: 'issues' })}</h1>
      <p className="text-rovida-slate-green-gray">{t('visualize manage incidents', { ns: 'issues' })}</p>

      {canRead('Issues') ? (
        <div className="card-rovida p-4 flex-1">
          <div className="flex flex-1 overflow-x-auto gap-4 pb-4">
            {columns.map((column) => (
              <KanbanColumn
                key={column.status}
                title={column.title}
                issues={mockIssues}
                statusFilter={column.status}
              />
            ))}
          </div>
        </div>
      ) : (
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <ClipboardList className="h-12 w-12 text-rovida-gold" />
            <p>{t('no permission view issues', { ns: 'common' })}</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Kanban;