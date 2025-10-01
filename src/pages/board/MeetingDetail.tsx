import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash2, CalendarDays, Users, ListChecks, FileText } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockMeetings, Meeting } from '@/data/mock-meetings';
import { format } from 'date-fns';

const BoardMeetingDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const meeting: Meeting | undefined = mockMeetings.find((m) => m.id === id);

  if (!meeting) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-rovida-slate-green-gray">{t('meeting_not_found')}</p>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: t('board'), href: '/board' },
    { label: t('meetings'), href: '/board/meetings' },
    { label: `${t('meeting')} ${meeting.id}`, href: `/board/meetings/${meeting.id}` },
  ];

  const getStatusBadgeVariant = (status: Meeting['status']) => {
    switch (status) {
      case 'Scheduled':
        return 'default';
      case 'Completed':
        return 'outline';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{meeting.title}</h1>
        <div className="flex items-center gap-2">
          <Badge variant={getStatusBadgeVariant(meeting.status)}>{meeting.status}</Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">{t('actions')}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white/80 backdrop-blur-xl border-rovida-soft-gray text-rovida-near-black">
              <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-rovida-soft-gray" />
              <DropdownMenuItem className="hover:bg-rovida-soft-gray">
                <Edit className="mr-2 h-4 w-4" /> {t('edit_meeting')}
              </DropdownMenuItem>
              {meeting.status === 'Scheduled' && (
                <DropdownMenuItem className="hover:bg-rovida-soft-gray">
                  <CalendarDays className="mr-2 h-4 w-4" /> {t('reschedule')}
                </DropdownMenuItem>
              )}
              {meeting.status !== 'Completed' && (
                <DropdownMenuItem className="hover:bg-rovida-soft-gray">
                  <ListChecks className="mr-2 h-4 w-4" /> {t('mark_as_completed')}
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="text-destructive hover:bg-rovida-soft-gray">
                <Trash2 className="mr-2 h-4 w-4" /> {t('cancel_meeting')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Card className="card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('meeting_details')}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2 text-rovida-near-black">
            <div className="font-medium">{t('id')}:</div>
            <div>{meeting.id}</div>
            <div className="font-medium">{t('date')}:</div>
            <div>{format(meeting.date, 'MMM dd, yyyy')}</div>
            <div className="font-medium">{t('time')}:</div>
            <div>{meeting.time}</div>
            <div className="font-medium">{t('location')}:</div>
            <div>{meeting.location}</div>
          </div>
          <Separator className="bg-rovida-soft-gray" />
          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2 text-rovida-navy"><Users className="h-4 w-4 text-rovida-gold" /> {t('attendees')}:</h4>
            <ul className="list-disc list-inside text-rovida-slate-green-gray">
              {meeting.attendees.map((attendee, index) => (
                <li key={index}>{attendee}</li>
              ))}
            </ul>
          </div>
          <Separator className="bg-rovida-soft-gray" />
          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2 text-rovida-navy"><ListChecks className="h-4 w-4 text-rovida-gold" /> {t('agenda')}:</h4>
            <ul className="list-disc list-inside text-rovida-slate-green-gray">
              {meeting.agenda.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          {meeting.minutes && (
            <>
              <Separator className="bg-rovida-soft-gray" />
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2 text-rovida-navy"><FileText className="h-4 w-4 text-rovida-gold" /> {t('minutes')}:</h4>
                <p className="text-rovida-slate-green-gray">{meeting.minutes}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BoardMeetingDetail;