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
import { Issue } from '@/data/mock-issues';
import { format } from 'date-fns';

interface IssuesTableProps {
  issues: Issue[];
}

const IssuesTable = ({ issues }: IssuesTableProps) => {
  const { t } = useTranslation();

  const getStatusVariant = (status: Issue['status']) => {
    switch (status) {
      case 'Open':
        return 'default';
      case 'In Progress':
        return 'secondary';
      case 'Closed':
        return 'outline';
      case 'Pending':
        return 'destructive'; // Using destructive for pending to highlight
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: Issue['priority']) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-500 text-white';
      case 'High':
        return 'bg-orange-500 text-white';
      case 'Medium':
        return 'bg-yellow-500 text-black';
      case 'Low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell className="font-medium">
                <Link to={`/issues/${issue.id}`} className="text-primary hover:underline">
                  {issue.id}
                </Link>
              </TableCell>
              <TableCell>{issue.title}</TableCell>
              <TableCell>{issue.unit}</TableCell>
              <TableCell>{issue.type}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(issue.status)}>{issue.status}</Badge>
              </TableCell>
              <TableCell>
                <Badge className={getPriorityColor(issue.priority)}>{issue.priority}</Badge>
              </TableCell>
              <TableCell>{format(issue.createdAt, 'MMM dd, yyyy')}</TableCell>
              <TableCell className="text-right">
                <Link to={`/issues/${issue.id}`} className="text-sm text-muted-foreground hover:underline">
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

export default IssuesTable;