import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockTasks, Task } from '@/data/mock-tasks';
import { format } from 'date-fns';

const MaintenanceTaskDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const task: Task | undefined = mockTasks.find((task) => task.id === id);

  if (!task) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-muted-foreground">Task not found.</p>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: t('maintenance'), href: '/maintenance' },
    { label: 'Tasks', href: '/maintenance/tasks' },
    { label: `Task ${task.id}`, href: `/maintenance/tasks/${task.id}` },
  ];

  const getStatusBadgeVariant = (status: Task['status']) => {
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

  const getPriorityBadgeColor = (priority: Task['priority']) => {
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
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <h1 className="text-2xl font-semibold md:text-3xl">{task.title}</h1>
        <div className="flex items-center gap-2">
          <Badge variant={getStatusBadgeVariant(task.status)}>{task.status}</Badge>
          <Badge className={getPriorityBadgeColor(task.priority)}>{task.priority}</Badge>
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
                <Edit className="mr-2 h-4 w-4" /> Edit Task
              </DropdownMenuItem>
              <DropdownMenuItem>Change Status</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Task Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="font-medium">ID:</div>
            <div>{task.id}</div>
            <div className="font-medium">Assigned To:</div>
            <div>{task.assignedTo}</div>
            <div className="font-medium">Due Date:</div>
            <div>{format(task.dueDate, 'MMM dd, yyyy')}</div>
            <div className="font-medium">Created At:</div>
            <div>{format(task.createdAt, 'MMM dd, yyyy HH:mm')}</div>
          </div>
          <Separator />
          <div>
            <h4 className="font-medium mb-2">Description:</h4>
            <p className="text-muted-foreground">{task.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceTaskDetail;