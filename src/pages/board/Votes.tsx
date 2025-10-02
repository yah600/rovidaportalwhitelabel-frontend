import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockVotes } from '@/data/mock-votes';
import VotesTable from '@/components/board/VotesTable';

const BoardVotes = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('board'), href: '/board' },
    { label: t('votes'), href: '/board/votes' },
  ];

  const hasVotes = mockVotes.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('board')} {t('votes')}</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> {t('create new vote')}
        </Button>
      </header>

      {hasVotes ? (
        <VotesTable votes={mockVotes} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              {t('no votes found')}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t('start by creating new vote')}
            </p>
            <Button className="mt-4">
              <PlusCircle className="mr-2 h-4 w-4" /> {t('create new vote')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardVotes;