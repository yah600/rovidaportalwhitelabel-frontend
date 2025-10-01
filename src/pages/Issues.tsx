import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockIssues } from '@/data/mock-issues';
import IssuesTable from '@/components/issues/IssuesTable';

const Issues = () => {
  const { t } = useTranslation();
  const hasIssues = mockIssues.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-rovida-navy">{t('issues')}</h1>
        <Link to="/issues/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> {t('create_first_ticket')}
          </Button>
        </Link>
      </header>

      {hasIssues ? (
        <IssuesTable issues={mockIssues} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight text-rovida-near-black">
              {t('no_tickets')}
            </h3>
            <p className="text-sm text-rovida-slate-green-gray">
              You can start by creating a new incident.
            </p>
            <Link to="/issues/new">
              <Button className="mt-4">
                <PlusCircle className="mr-2 h-4 w-4" /> {t('create_first_ticket')}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Issues;