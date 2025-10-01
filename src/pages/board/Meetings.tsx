import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';

const BoardMeetings = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('board'), href: '/board' },
    { label: 'Meetings', href: '/board/meetings' },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl">{t('board')} Meetings</h1>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <p className="text-muted-foreground">Board meetings will be listed here.</p>
      </div>
    </div>
  );
};

export default BoardMeetings;