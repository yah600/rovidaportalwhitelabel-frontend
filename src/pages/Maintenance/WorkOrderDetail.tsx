import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash2, CheckCircle, XCircle, Clock, User, CalendarDays } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockWorkOrders, WorkOrder } from '@/data/mock-work-orders';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

const MaintenanceWorkOrderDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation(['maintenance', 'common']);
  const { canUpdate, canDelete } = useAuth();

  const workOrder: WorkOrder | undefined = mockWorkOrders.find((wo) => wo.id === id);

  if (!workOrder) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-rovida-slate-green-gray">{t('work order not found', { ns: 'maintenance' })}</p>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: t('maintenance', { ns: 'maintenance' }), href: '/maintenance' },
    { label: t('work orders', { ns: 'maintenance' }), href: '/maintenance/work-orders' },
    { label: `${t('work order', { ns: 'maintenance' })} ${workOrder.id}`, href: `/maintenance/work-orders/${workOrder.id}` },
  ];

  const getStatusBadgeVariant = (status: WorkOrder['status']) => {
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
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getPriorityBadgeColor = (priority: WorkOrder['priority']) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-rovida-error text-white';
      case 'High':
        return 'bg-rovida-warning text-white';
      case 'Medium':
        return 'bg-rovida-gold text-white';
      case 'Low':
        return 'bg-rovida-success text-white';
      default:
        return 'bg-rovida-soft-gray text-rovida-near-black';
    }
  };

  const handleEditWorkOrder = () => {
    toast.info(t('edit work order action', { ns: 'maintenance', id: workOrder.id }));
  };

  const handleUpdateStatus = () => {
    toast.info(t('update status action', { ns: 'maintenance', id: workOrder.id }));
  };

  const handleDeleteWorkOrder = () => {
    toast.error(t('delete work order action', { ns: 'maintenance', id: workOrder.id }));
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{workOrder.title}</h1>
        <div className="flex items-center gap-2">
          <Badge variant={getStatusBadgeVariant(workOrder.status)}>{t(workOrder.status.toLowerCase(), { ns: 'maintenance' })}</Badge>
          <Badge className={getPriorityBadgeColor(workOrder.priority)}>{t(workOrder.priority.toLowerCase(), { ns: 'common' })}</Badge>
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
              {canUpdate('Maintenance') && (
                <DropdownMenuItem className="hover:bg-rovida-soft-gray" onClick={handleEditWorkOrder}>
                  <Edit className="mr-2 h-4 w-4" /> {t('edit work order', { ns: 'maintenance' })}
                </DropdownMenuItem>
              )}
              {canUpdate('Maintenance') && (
                <DropdownMenuItem className="hover:bg-rovida-soft-gray" onClick={handleUpdateStatus}>
                  <CheckCircle className="mr-2 h-4 w-4" /> {t('update status', { ns: 'maintenance' })}
                </DropdownMenuItem>
              )}
              {canDelete('Maintenance') && (
                <>
                  <DropdownMenuSeparator className="bg-rovida-soft-gray" />
                  <DropdownMenuItem className="text-rovida-error hover:bg-rovida-soft-gray" onClick={handleDeleteWorkOrder}>
                    <Trash2 className="mr-2 h-4 w-4" /> {t('delete work order', { ns: 'maintenance' })}
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Card className="card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('work order details', { ns: 'maintenance' })}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2 text-rovida-near-black">
            <div className="font-medium">{t('id', { ns: 'common' })}:</div>
            <div>{workOrder.id}</div>
            <div className="font-medium">{t('unit', { ns: 'common' })}:</div>
            <div>{workOrder.unit}</div>
            <div className="font-medium">{t('assigned to', { ns: 'common' })}:</div>
            <div>{workOrder.assignedTo}</div>
            <div className="font-medium">{t('created at', { ns: 'common' })}:</div>
            <div>{format(workOrder.createdAt, 'MMM dd, yyyy HH:mm')}</div>
            <div className="font-medium">{t('due date', { ns: 'common' })}:</div>
            <div>{format(workOrder.dueDate, 'MMM dd, yyyy')}</div>
            {workOrder.completedAt && (
              <>
                <div className="font-medium">{t('completed at', { ns: 'maintenance' })}:</div>
                <div>{format(workOrder.completedAt, 'MMM dd, yyyy HH:mm')}</div>
              </>
            )}
          </div>
          <Separator className="bg-rovida-soft-gray" />
          <div>
            <h4 className="font-medium mb-2 text-rovida-navy">{t('description', { ns: 'common' })}:</h4>
            <p className="text-rovida-slate-green-gray">{workOrder.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceWorkOrderDetail;