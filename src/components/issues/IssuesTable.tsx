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
        return 'bg-rovida-error text-white'; // Using Rovida error
      case 'High':
        return 'bg-rovida-warning text-white'; // Using Rovida warning
      case 'Medium':
        return 'bg-rovida-gold text-white'; // Using Rovida gold
      case 'Low':
        return 'bg-rovida-success text-white'; // Using Rovida success
      default:
        return 'bg-rovida-soft-gray text-rovida-near-black';
    }
  };

  return (
    <div className="rounded-md border border-rovida-soft-gray">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-rovida-navy">ID</TableHead>
            <TableHead className="text-rovida-navy">Title</TableHead>
            <TableHead className="text-rovida-navy">Unit</TableHead>
            <TableHead className="text-rovida-navy">Type</TableHead>
            <TableHead className="text-rovida-navy">Status</TableHead>
            <TableHead className="text-rovida-navy">Priority</TableHead>
            <TableHead className="text-rovida-navy">Created At</TableHead>
            <TableHead className="text-right text-rovida-navy">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell className="font-medium">
                <Link to={`/issues/${issue.id}`} className="text-rovida-navy hover:underline">
                  {issue.id}
                </Link>
              </TableCell>
              <TableCell className="text-rovida-near-black">{issue.title}</TableCell>
              <TableCell className="text-rovida-near-black">{issue.unit}</TableCell>
              <TableCell className="text-rovida-near-black">{issue.type}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(issue.status)}>{issue.status}</Badge>
              </TableCell>
              <TableCell>
                <Badge className={getPriorityColor(issue.priority)}>{issue.priority}</Badge>
              </TableCell>
              <TableCell className="text-rovida-slate-green-gray">{format(issue.createdAt, 'MMM dd, yyyy')}</TableCell>
              <TableCell className="text-right">
                <Link to={`/issues/${issue.id}`} className="text-sm text-rovida-slate-green-gray hover:underline">
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