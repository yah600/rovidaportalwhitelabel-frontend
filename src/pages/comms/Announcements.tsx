import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockAnnouncements } from '@/data/mock-announcements';
import AnnouncementsTable from '@/components/comms/AnnouncementsTable';
import { toast } from 'sonner'; // Import toast for actions
import { Card } from '@/components/ui/card'; // Import Card for the empty state

const CommsAnnouncements = () => {
  const { t } = useTranslation(['communications', 'common']); // Ensure 'communications' and 'common' namespaces are loaded
  const breadcrumbItems = [
    { label: t('communications', { ns: 'communications' }), href: '/comms' },
    { label: t('announcements', { ns: 'communications' }), href: '/comms/announcements' },
  ];

  const hasAnnouncements = mockAnnouncements.length > 0;

  const handleCreateNewAnnouncement = () => {
    toast.info(t('create new announcement action', { ns: 'communications' })); // Placeholder action with toast
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('communications', { ns: 'communications' })} {t('announcements', { ns: 'communications' })}</h1>
        <Button className="btn-primary" onClick={handleCreateNewAnnouncement}>
          <PlusCircle className="mr-2 h-4 w-4" /> {t('create new announcement', { ns: 'communications' })}
        </Button>
      </header>

      {hasAnnouncements ? (
        <div className="card-rovida p-4"> {/* Wrapped content in card-rovida */}
          <AnnouncementsTable announcements={mockAnnouncements} />
        </div>
      ) : (
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight text-rovida-near-black">
              {t('no announcements found', { ns: 'communications' })}
            </h3>
            <p className="text-sm text-rovida-slate-green-gray">
              {t('start by creating new announcement', { ns: 'communications' })}
            </p>
            <Button className="mt-4 btn-primary" onClick={handleCreateNewAnnouncement}>
              <PlusCircle className="mr-2 h-4 w-4" /> {t('create new announcement', { ns: 'communications' })}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CommsAnnouncements;