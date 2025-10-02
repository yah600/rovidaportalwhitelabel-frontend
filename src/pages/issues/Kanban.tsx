import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import KanbanColumn from '@/components/issues/KanbanColumn';
import { mockIssues, Issue } from '@/data/mock-issues';

const Kanban = () => {
  const { t } = useTranslation(['issues', 'common']); // Specify namespaces

  const breadcrumbItems = [
    { label: t('issues', { ns: 'issues' }), href: '/issues' },
    { label: t('kanban', { ns: 'issues' }), href: '/issues/kanban' },
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

      <div className="card-rovida p-4 flex-1"> {/* Wrapped content in card-rovida */}
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
    </div>
  );
};

export default Kanban;