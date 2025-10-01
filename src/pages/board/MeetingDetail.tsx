import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';

const BoardMeetingDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('board'), href: '/board' },
    { label: 'Meetings', href: '/board/meetings' },
    { label: `Meeting ${id}`, href: `/board/meetings/${id}` },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl">{t('board')} Meeting Detail: {id}</h1>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <p className="text-muted-foreground">Details for meeting {id} coming soon!</p>
      </div>
    </div>
  );
};

export default BoardMeetingDetail;