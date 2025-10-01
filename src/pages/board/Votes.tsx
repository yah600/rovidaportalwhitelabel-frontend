import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';

const BoardVotes = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('board'), href: '/board' },
    { label: 'Votes', href: '/board/votes' },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl">{t('board')} Votes</h1>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <p className="text-muted-foreground">Board votes will be managed here.</p>
      </div>
    </div>
  );
};

export default BoardVotes;