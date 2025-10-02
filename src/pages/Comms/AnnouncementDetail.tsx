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
import { mockAnnouncements, Announcement } from '@/mocks';
import { format } from 'date-fns';
import { toast } from 'sonner'; // Import toast for actions

const AnnouncementDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation(['communications', 'common']); // Ensure 'communications' and 'common' namespaces are loaded

  const announcement: Announcement | undefined = mockAnnouncements.find((ann) => ann.id === id);

  if (!announcement) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-rovida-slate-green-gray">{t('announcement not found', { ns: 'communications' })}</p>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: t('communications', { ns: 'communications' }), href: '/comms' },
    { label: t('announcements', { ns: 'communications' }), href: '/comms/announcements' },
    { label: `${t('announcement', { ns: 'communications' })} ${announcement.id}`, href: `/comms/announcements/${announcement.id}` },
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

  const handleEditAnnouncement = () => {
    toast.info(t('edit announcement action', { ns: 'communications', id: announcement.id })); // Placeholder action with toast
  };

  const handlePublishAnnouncement = () => {
    toast.success(t('publish announcement action', { ns: 'communications', id: announcement.id })); // Placeholder action with toast
  };

  const handleArchiveAnnouncement = () => {
    toast.info(t('archive announcement action', { ns: 'communications', id: announcement.id })); // Placeholder action with toast
  };

  const handleDeleteAnnouncement = () => {
    toast.error(t('delete announcement action', { ns: 'communications', id: announcement.id })); // Placeholder action with toast
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{announcement.title}</h1>
        <div className="flex items-center gap-2">
          <Badge variant={getStatusBadgeVariant(announcement.status)}>{t(announcement.status.toLowerCase(), { ns: 'communications' })}</Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">{t('actions', { ns: 'common' })}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white/80 backdrop-blur-xl border-rovida-soft-gray text-rovida-near-black">
              <DropdownMenuLabel>{t('actions', { ns: 'common' })}</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-rovida-soft-gray" />
              <DropdownMenuItem className="hover:bg-rovida-soft-gray" onClick={handleEditAnnouncement}>
                <Edit className="mr-2 h-4 w-4" /> {t('edit announcement', { ns: 'communications' })}
              </DropdownMenuItem>
              {announcement.status === 'Draft' && (
                <DropdownMenuItem className="hover:bg-rovida-soft-gray" onClick={handlePublishAnnouncement}>
                  <CalendarDays className="mr-2 h-4 w-4" /> {t('publish', { ns: 'communications' })}
                </DropdownMenuItem>
              )}
              {announcement.status === 'Published' && (
                <DropdownMenuItem className="hover:bg-rovida-soft-gray" onClick={handleArchiveAnnouncement}>
                  <CalendarDays className="mr-2 h-4 w-4" /> {t('archive', { ns: 'communications' })}
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="text-destructive hover:bg-rovida-soft-gray" onClick={handleDeleteAnnouncement}>
                <Trash2 className="mr-2 h-4 w-4" /> {t('delete announcement', { ns: 'communications' })}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Card className="card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('announcement details', { ns: 'communications' })}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2 text-rovida-near-black">
            <div className="font-medium">{t('id', { ns: 'common' })}:</div>
            <div>{announcement.id}</div>
            <div className="font-medium">{t('author', { ns: 'communications' })}:</div>
            <div>{announcement.author}</div>
            <div className="font-medium">{t('target audience', { ns: 'communications' })}:</div>
            <div>{announcement.targetAudience}</div>
            <div className="font-medium">{t('published at', { ns: 'communications' })}:</div>
            <div>{format(announcement.publishedAt, 'MMM dd, yyyy HH:mm')}</div>
            {announcement.expiresAt && (
              <>
                <div className="font-medium">{t('expires at', { ns: 'communications' })}:</div>
                <div>{format(announcement.expiresAt, 'MMM dd, yyyy HH:mm')}</div>
              </>
            )}
          </div>
          <Separator className="bg-rovida-soft-gray" />
          <div>
            <h4 className="font-medium mb-2 text-rovida-navy">{t('content', { ns: 'communications' })}:</h4>
            <p className="text-rovida-slate-green-gray">{announcement.content}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnouncementDetail;