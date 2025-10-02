import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Handshake, Vote, ArrowRight } from 'lucide-react';
import { mockMeetings } from '@/data/mock-meetings';
import { mockVotes } from '@/data/mock-votes';
import { format } from 'date-fns';

const Board = () => {
  const { t } = useTranslation(['board', 'common']); // Ensure 'board' and 'common' namespaces are loaded

  const breadcrumbItems = [
    { label: t('board', { ns: 'board' }), href: '/board' },
  ];

  // Calculate summary data
  const upcomingMeetings = mockMeetings.filter(meeting => meeting.status === 'Scheduled' && meeting.date >= new Date()).length;
  const totalMeetings = mockMeetings.length;
  const openVotes = mockVotes.filter(vote => vote.status === 'Open').length;
  const totalVotes = mockVotes.length;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('board', { ns: 'board' })} {t('overview', { ns: 'common' })}</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Meetings Card */}
        <Card className="card-rovida">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-rovida-navy">{t('meetings', { ns: 'board' })}</CardTitle>
            <Handshake className="h-4 w-4 text-rovida-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rovida-near-black">{upcomingMeetings} {t('upcoming', { ns: 'board' })}</div>
            <p className="text-xs text-rovida-slate-green-gray">{t('total', { ns: 'common' })}: {totalMeetings}</p>
            <Link to="/board/meetings" className="mt-2 inline-flex items-center text-sm link-rovida">
              {t('view all', { ns: 'common' })} <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        {/* Votes Card */}
        <Card className="card-rovida">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-rovida-navy">{t('votes', { ns: 'board' })}</CardTitle>
            <Vote className="h-4 w-4 text-rovida-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rovida-near-black">{openVotes} {t('open', { ns: 'common' })}</div>
            <p className="text-xs text-rovida-slate-green-gray">{t('total', { ns: 'common' })}: {totalVotes}</p>
            <Link to="/board/votes" className="mt-2 inline-flex items-center text-sm link-rovida">
              {t('view all', { ns: 'common' })} <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
        <p className="text-rovida-slate-green-gray">{t('detailed board analytics soon', { ns: 'board' })}</p>
      </Card>
    </div>
  );
};

export default Board;