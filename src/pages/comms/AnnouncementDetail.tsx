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
        <p className="text-muted-foreground">Announcement not found.</p>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: t('communications'), href: '/comms' },
    { label: 'Announcements', href: '/comms/announcements' },
    { label: `Announcement ${announcement.id}`, href: `/comms/announcements/${announcement.id}` },
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
        <h1 className="text-2xl font-semibold md:text-3xl">{announcement.title}</h1>
        <div className="flex items-center gap-2">
          <Badge variant={getStatusBadgeVariant(announcement.status)}>{announcement.status}</Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" /> Edit Announcement
              </DropdownMenuItem>
              {announcement.status === 'Draft' && (
                <DropdownMenuItem>
                  <CalendarDays className="mr-2 h-4 w-4" /> Publish
                </DropdownMenuItem>
              )}
              {announcement.status === 'Published' && (
                <DropdownMenuItem>
                  <CalendarDays className="mr-2 h-4 w-4" /> Archive
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Delete Announcement
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Announcement Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="font-medium">ID:</div>
            <div>{announcement.id}</div>
            <div className="font-medium">Author:</div>
            <div>{announcement.author}</div>
            <div className="font-medium">Target Audience:</div>
            <div>{announcement.targetAudience}</div>
            <div className="font-medium">Published At:</div>
            <div>{format(announcement.publishedAt, 'MMM dd, yyyy HH:mm')}</div>
            {announcement.expiresAt && (
              <>
                <div className="font-medium">Expires At:</div>
                <div>{format(announcement.expiresAt, 'MMM dd, yyyy HH:mm')}</div>
              </>
            )}
          </div>
          <Separator />
          <div>
            <h4 className="font-medium mb-2">Content:</h4>
            <p className="text-muted-foreground">{announcement.content}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnouncementDetail;