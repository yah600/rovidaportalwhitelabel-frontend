import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import KanbanColumn from '@/components/issues/KanbanColumn';
import { mockIssues, Issue } from '@/data/mock-issues';

const Kanban = () => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { label: t('issues'), href: '/issues' },
    { label: 'Kanban', href: '/issues/kanban' },
  ];

  // Define Kanban columns and their corresponding issue statuses
  const columns = [
    { title: 'Open', status: 'Open' as Issue['status'] },
    { title: 'In Progress', status: 'In Progress' as Issue['status'] },
    { title: 'Pending', status: 'Pending' as Issue['status'] },
    { title: 'Closed', status: 'Closed' as Issue['status'] },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-rovida-navy">{t('issues')} Kanban Board</h1>
      <p className="text-rovida-slate-green-gray">Visualize and manage your incidents.</p>

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
  );
};

export default Kanban;