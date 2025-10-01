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
import { Vote } from '@/data/mock-votes';
import { format } from 'date-fns';

interface VotesTableProps {
  votes: Vote[];
}

const VotesTable = ({ votes }: VotesTableProps) => {
  const { t } = useTranslation();

  const getStatusVariant = (status: Vote['status']) => {
    switch (status) {
      case 'Open':
        return 'default';
      case 'Closed':
        return 'outline';
      case 'Pending':
        return 'secondary';
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
            <TableHead>Status</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {votes.map((vote) => (
            <TableRow key={vote.id}>
              <TableCell className="font-medium">
                <Link to={`/board/votes/${vote.id}`} className="text-primary hover:underline">
                  {vote.id}
                </Link>
              </TableCell>
              <TableCell>{vote.title}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(vote.status)}>{vote.status}</Badge>
              </TableCell>
              <TableCell>{format(vote.dueDate, 'MMM dd, yyyy')}</TableCell>
              <TableCell className="text-right">
                <Link to={`/board/votes/${vote.id}`} className="text-sm text-muted-foreground hover:underline">
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

export default VotesTable;