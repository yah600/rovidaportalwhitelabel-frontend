import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Announcement } from '@/data/mock-announcements';
import { format } from 'date-fns';

interface AnnouncementsTableProps {
  announcements: Announcement[];
}

const AnnouncementsTable = ({ announcements }: AnnouncementsTableProps) => {
  const { t } = useTranslation();

  const getStatusVariant = (status: Announcement['status']) => {
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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Audience</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Published At</TableHead>
            <TableHead>Expires At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {announcements.map((announcement) => (
            <TableRow key={announcement.id}>
              <TableCell className="font-medium">
                <Link to={`/comms/announcements/${announcement.id}`} className="text-primary hover:underline">
                  {announcement.id}
                </Link>
              </TableCell>
              <TableCell>{announcement.title}</TableCell>
              <TableCell>{announcement.author}</TableCell>
              <TableCell>{announcement.targetAudience}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(announcement.status)}>{announcement.status}</Badge>
              </TableCell>
              <TableCell>{format(announcement.publishedAt, 'MMM dd, yyyy')}</TableCell>
              <TableCell>
                {announcement.expiresAt ? format(announcement.expiresAt, 'MMM dd, yyyy') : 'N/A'}
              </TableCell>
              <TableCell className="text-right">
                <Link to={`/comms/announcements/${announcement.id}`} className="text-sm text-muted-foreground hover:underline">
                  View
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AnnouncementsTable;