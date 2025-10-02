import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Button } from '@/components/ui/button';
import { PlusCircle, Users } from 'lucide-react'; // Imported Users
import { Link } from 'react-router-dom';
import { mockMeetings } from '@/mocks';
import MeetingsTable from '@/components/board/MeetingsTable';
import { Card } from '@/components/ui/card'; // Import Card for the empty state
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

const BoardMeetings = () => {
  const { t } = useTranslation();
  const { canRead, canCreate } = useAuth();

  const breadcrumbItems = [
    { label: t('board'), href: '/board' },
    { label: t('meetings'), href: '/board/meetings' },
  ];

  const hasMeetings = mockMeetings.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('board')} {t('meetings')}</h1>
        {canCreate('Board - Meetings/Votes') && (
          <Button className="btn-primary">
            <PlusCircle className="mr-2 h-4 w-4" /> {t('schedule new meeting')}
          </Button>
        )}
      </header>

      {canRead('Board - Meetings/Votes') ? (
        hasMeetings ? (
          <div className="card-rovida p-4"> {/* Wrapped content in card-rovida */}
            <MeetingsTable meetings={mockMeetings} />
          </div>
        ) : (
          <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight text-rovida-near-black">
                {t('no meetings found')}
              </h3>
              <p className="text-sm text-rovida-slate-green-gray">
                {t('start by scheduling new meeting')}
              </p>
              {canCreate('Board - Meetings/Votes') && (
                <Button className="mt-4 btn-primary">
                  <PlusCircle className="mr-2 h-4 w-4" /> {t('schedule new meeting')}
                </Button>
              )}
            </div>
          </Card>
        )
      ) : (
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida">
          <div className="flex flex-col items-center gap-1 text-center">
            <Users className="h-12 w-12 text-rovida-gold" />
            <p>{t('no permission view meetings', { ns: 'common' })}</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default BoardMeetings;