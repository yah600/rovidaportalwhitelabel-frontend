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
import { WorkOrder } from '@/data/mock-work-orders';
import { format } from 'date-fns';

interface WorkOrdersTableProps {
  workOrders: WorkOrder[];
}

const WorkOrdersTable = ({ workOrders }: WorkOrdersTableProps) => {
  const { t } = useTranslation();

  const getStatusVariant = (status: WorkOrder['status']) => {
    switch (status) {
      case 'Open':
        return 'default';
      case 'In Progress':
        return 'secondary';
      case 'Completed':
        return 'outline';
      case 'Cancelled':
        return 'destructive';
      case 'Pending Parts':
        return 'secondary'; // Changed from 'warning' to 'secondary'
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: WorkOrder['priority']) => {
    switch (priority) {
      case 'Urgent':
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
            <TableHead>Assigned To</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">
                <Link to={`/maintenance/work-orders/${order.id}`} className="text-primary hover:underline">
                  {order.id}
                </Link>
              </TableCell>
              <TableCell>{order.title}</TableCell>
              <TableCell>{order.unit}</TableCell>
              <TableCell>{order.assignedTo}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
              </TableCell>
              <TableCell>
                <Badge className={getPriorityColor(order.priority)}>{order.priority}</Badge>
              </TableCell>
              <TableCell>{format(order.dueDate, 'MMM dd, yyyy')}</TableCell>
              <TableCell className="text-right">
                <Link to={`/maintenance/work-orders/${order.id}`} className="text-sm text-muted-foreground hover:underline">
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

export default WorkOrdersTable;