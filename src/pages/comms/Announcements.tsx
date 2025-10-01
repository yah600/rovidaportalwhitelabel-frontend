import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockAnnouncements } from '@/data/mock-announcements';
import AnnouncementsTable from '@/components/comms/AnnouncementsTable';

const CommsAnnouncements = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('communications'), href: '/comms' },
    { label: 'Announcements', href: '/comms/announcements' },
  ];

  const hasAnnouncements = mockAnnouncements.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">{t('communications')} Announcements</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Announcement
        </Button>
      </header>

      {hasAnnouncements ? (
        <AnnouncementsTable announcements={mockAnnouncements} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              No announcements found.
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start by creating a new announcement.
            </p>
            <Button className="mt-4">
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Announcement
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommsAnnouncements;