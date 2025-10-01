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
        <p className="text-muted-foreground">Meeting not found.</p>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: t('board'), href: '/board' },
    { label: 'Meetings', href: '/board/meetings' },
    { label: `Meeting ${meeting.id}`, href: `/board/meetings/${meeting.id}` },
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
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white/80 backdrop-blur-xl border-rovida-soft-gray text-rovida-near-black">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-rovida-soft-gray" />
              <DropdownMenuItem className="hover:bg-rovida-soft-gray">
                <Edit className="mr-2 h-4 w-4" /> Edit Meeting
              </DropdownMenuItem>
              {meeting.status === 'Scheduled' && (
                <DropdownMenuItem className="hover:bg-rovida-soft-gray">
                  <CalendarDays className="mr-2 h-4 w-4" /> Reschedule
                </DropdownMenuItem>
              )}
              {meeting.status !== 'Completed' && (
                <DropdownMenuItem className="hover:bg-rovida-soft-gray">
                  <ListChecks className="mr-2 h-4 w-4" /> Mark as Completed
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="text-destructive hover:bg-rovida-soft-gray">
                <Trash2 className="mr-2 h-4 w-4" /> Cancel Meeting
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Meeting Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="font-medium">ID:</div>
            <div>{meeting.id}</div>
            <div className="font-medium">Date:</div>
            <div>{format(meeting.date, 'MMM dd, yyyy')}</div>
            <div className="font-medium">Time:</div>
            <div>{meeting.time}</div>
            <div className="font-medium">Location:</div>
            <div>{meeting.location}</div>
          </div>
          <Separator />
          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2"><Users className="h-4 w-4" /> Attendees:</h4>
            <ul className="list-disc list-inside text-muted-foreground">
              {meeting.attendees.map((attendee, index) => (
                <li key={index}>{attendee}</li>
              ))}
            </ul>
          </div>
          <Separator />
          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2"><ListChecks className="h-4 w-4" /> Agenda:</h4>
            <ul className="list-disc list-inside text-muted-foreground">
              {meeting.agenda.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          {meeting.minutes && (
            <>
              <Separator />
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2"><FileText className="h-4 w-4" /> Minutes:</h4>
                <p className="text-muted-foreground">{meeting.minutes}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BoardMeetingDetail;