import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { PlusCircle, ClipboardList } from 'lucide-react'; // Imported ClipboardList
import { Link } from 'react-router-dom';
import { mockIssues, Issue } from '@/data/mock-issues';
import IssuesTable from '@/components/issues/IssuesTable';
import GooeyNav from '@/components/GooeyNav';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; // Import Card components for empty state
import { toast } from 'sonner'; // Import toast for actions
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

const Issues = () => {
  const { t } = useTranslation(['issues', 'common']); // Specify namespaces
  const [filterStatus, setFilterStatus] = React.useState<Issue['status'] | 'All'>('All');
  const { canRead, canCreate } = useAuth();

  const handleFilterChange = (item: { label: string; href: string }, index: number) => {
    setFilterStatus(item.label as Issue['status'] | 'All');
    toast.info(t('filter issues by status', { ns: 'issues', status: item.label })); // Placeholder action with toast
  };

  const filteredIssues = filterStatus === 'All'
    ? mockIssues
    : mockIssues.filter(issue => issue.status === filterStatus);

  const hasIssues = mockIssues.length > 0;

  const navItems = [
    { label: t('all', { ns: 'common' }), href: '#' },
    { label: t('open', { ns: 'common' }), href: '#' },
    { label: t('in progress', { ns: 'common' }), href: '#' },
    { label: t('pending', { ns: 'issues' }), href: '#' },
    { label: t('closed', { ns: 'common' }), href: '#' },
  ];

  const breadcrumbItems = [
    { label: t('issues', { ns: 'issues' }), href: '/issues' },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('issues', { ns: 'issues' })}</h1>
        {canCreate('Issues') && (
          <Link to="/issues/new">
            <Button className="btn-primary">
              <PlusCircle className="mr-2 h-4 w-4" /> {t('create new incident', { ns: 'issues' })}
            </Button>
          </Link>
        )}
      </header>
      <p className="text-rovida-slate-green-gray">{t('your most recent incidents', { ns: 'dashboard' })}</p> {/* Reusing dashboard description */}

      {canRead('Issues') ? (
        hasIssues ? (
          <div className="card-rovida p-4">
            <div className="flex justify-center mb-4">
              <GooeyNav items={navItems} onItemClick={handleFilterChange} />
            </div>
            <IssuesTable issues={filteredIssues} />
          </div>
        ) : (
          <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight text-rovida-near-black">
                {t('no tickets', { ns: 'issues' })}
              </h3>
              <p className="text-sm text-rovida-slate-green-gray">
                {t('you can start by creating new incident', { ns: 'issues' })}
              </p>
              {canCreate('Issues') && (
                <Link to="/issues/new">
                  <Button className="mt-4 btn-primary">
                    <PlusCircle className="mr-2 h-4 w-4" /> {t('create first ticket', { ns: 'issues' })}
                  </Button>
                </Link>
              )}
            </div>
          </Card>
        )
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

export default Issues;