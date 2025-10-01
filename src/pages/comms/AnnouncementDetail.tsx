import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash2, CalendarDays, Users } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockAnnouncements, Announcement } from '@/data/mock-announcements';
import { format } from 'date-fns';

const AnnouncementDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const announcement: Announcement | undefined = mockAnnouncements.find((ann) => ann.id === id);

  if (!announcement) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-rovida-slate-green-gray">{t('announcement_not_found')}</p>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: t('communications'), href: '/comms' },
    { label: t('announcements'), href: '/comms/announcements' },
    { label: `${t('announcement')} ${announcement.id}`, href: `/comms/announcements/${announcement.id}` },
  ];

  const getStatusBadgeVariant = (status: Announcement['status']) => {
    switch (status) {
      case 'Published':
        return 'default';
      case 'Draft':
        return 'secondary';
      case 'Archived':
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{announcement.title}</h1>
        <div className="flex items-center gap-2">
          <Badge variant={getStatusBadgeVariant(announcement.status)}>{announcement.status}</Badge>
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
                <Edit className="mr-2 h-4 w-4" /> {t('edit_announcement')}
              </DropdownMenuItem>
              {announcement.status === 'Draft' && (
                <DropdownMenuItem className="hover:bg-rovida-soft-gray">
                  <CalendarDays className="mr-2 h-4 w-4" /> {t('publish')}
                </DropdownMenuItem>
              )}
              {announcement.status === 'Published' && (
                <DropdownMenuItem className="hover:bg-rovida-soft-gray">
                  <CalendarDays className="mr-2 h-4 w-4" /> {t('archive')}
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="text-destructive hover:bg-rovida-soft-gray">
                <Trash2 className="mr-2 h-4 w-4" /> {t('delete_announcement')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Card className="card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('announcement_details')}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2 text-rovida-near-black">
            <div className="font-medium">{t('id')}:</div>
            <div>{announcement.id}</div>
            <div className="font-medium">{t('author')}:</div>
            <div>{announcement.author}</div>
            <div className="font-medium">{t('target_audience')}:</div>
            <div>{announcement.targetAudience}</div>
            <div className="font-medium">{t('published_at')}:</div>
            <div>{format(announcement.publishedAt, 'MMM dd, yyyy HH:mm')}</div>
            {announcement.expiresAt && (
              <>
                <div className="font-medium">{t('expires_at')}:</div>
                <div>{format(announcement.expiresAt, 'MMM dd, yyyy HH:mm')}</div>
              </>
            )}
          </div>
          <Separator className="bg-rovida-soft-gray" />
          <div>
            <h4 className="font-medium mb-2 text-rovida-navy">{t('content')}:</h4>
            <p className="text-rovida-slate-green-gray">{announcement.content}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnouncementDetail;