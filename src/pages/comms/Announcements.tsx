import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';

const CommsAnnouncements = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('communications'), href: '/comms' },
    { label: 'Announcements', href: '/comms/announcements' },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl">{t('communications')} Announcements</h1>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <p className="text-muted-foreground">Announcements will be managed here.</p>
      </div>
    </div>
  );
};

export default CommsAnnouncements;