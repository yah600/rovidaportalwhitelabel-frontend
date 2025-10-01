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
import { Task } from '@/data/mock-tasks';
import { format } from 'date-fns';

interface TasksTableProps {
  tasks: Task[];
}

const TasksTable = ({ tasks }: TasksTableProps) => {
  const { t } = useTranslation();

  const getStatusVariant = (status: Task['status']) => {
    switch (status) {
      case 'To Do':
        return 'default';
      case 'In Progress':
        return 'secondary';
      case 'Completed':
        return 'outline';
      case 'Blocked':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500 text-white';
      case 'Medium':
        return 'bg-orange-500 text-white';
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
            <TableHead>Assigned To</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">
                <Link to={`/maintenance/tasks/${task.id}`} className="text-primary hover:underline">
                  {task.id}
                </Link>
              </TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.assignedTo}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(task.status)}>{task.status}</Badge>
              </TableCell>
              <TableCell>
                <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
              </TableCell>
              <TableCell>{format(task.dueDate, 'MMM dd, yyyy')}</TableCell>
              <TableCell className="text-right">
                <Link to={`/maintenance/tasks/${task.id}`} className="text-sm text-muted-foreground hover:underline">
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

export default TasksTable;