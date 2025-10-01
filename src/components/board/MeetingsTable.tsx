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
import { Meeting } from '@/data/mock-meetings';
import { format } from 'date-fns';

interface MeetingsTableProps {
  meetings: Meeting[];
}

const MeetingsTable = ({ meetings }: MeetingsTableProps) => {
  const { t } = useTranslation();

  const getStatusVariant = (status: Meeting['status']) => {
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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {meetings.map((meeting) => (
            <TableRow key={meeting.id}>
              <TableCell className="font-medium">
                <Link to={`/board/meetings/${meeting.id}`} className="text-primary hover:underline">
                  {meeting.id}
                </Link>
              </TableCell>
              <TableCell>{meeting.title}</TableCell>
              <TableCell>{format(meeting.date, 'MMM dd, yyyy')}</TableCell>
              <TableCell>{meeting.time}</TableCell>
              <TableCell>{meeting.location}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(meeting.status)}>{meeting.status}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <Link to={`/board/meetings/${meeting.id}`} className="text-sm text-muted-foreground hover:underline">
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

export default MeetingsTable;