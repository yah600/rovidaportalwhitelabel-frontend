import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, User, Clock, DollarSign, Paperclip } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { toast } from 'sonner'; // Import toast for actions

// Mock data for a single task
const mockTask = {
  id: 'TASK001',
  title: 'HVAC Filter Replacement - Unit 101',
  description: 'Replace air filters in the HVAC system of Unit 101 as part of preventive maintenance.',
  status: 'In Progress',
  priority: 'Medium',
  assignedTo: 'Alice Johnson',
  dueDate: new Date(2024, 1, 15), // Feb 15, 2024
  createdAt: new Date(2024, 0, 10), // Jan 10, 2024
  updatedAt: new Date(2024, 0, 25), // Jan 25, 2024
  cost: 75.00,
  attachments: [
    { id: 'ATT001', name: 'HVAC_Filter_Specs.pdf', url: '#', uploadedBy: 'Admin', uploadedAt: new Date(2024, 0, 12) },
  ],
  checklist: [
    { id: 'CL001', item: 'Access HVAC unit', completed: true },
    { id: 'CL002', item: 'Remove old filters', completed: true },
    { id: 'CL003', item: 'Install new filters', completed: false },
    { id: 'CL004', item: 'Test system operation', completed: false },
  ],
};

const MaintenanceTaskDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation(['maintenance', 'common']); // Specify namespaces

  const task = mockTask; // Using mockTask for now, would fetch by id

  if (!task) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-rovida-slate-green-gray">{t('task not found', { ns: 'maintenance' })}</p>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: t('maintenance', { ns: 'maintenance' }), href: '/maintenance' },
    { label: t('tasks', { ns: 'maintenance' }), href: '/maintenance/tasks' },
    { label: `${t('task', { ns: 'maintenance' })} ${task.id}`, href: `/maintenance/tasks/${task.id}` },
  ];

  const handleViewAttachment = (attachmentName: string) => {
    toast.info(t('view attachment action', { ns: 'maintenance', name: attachmentName })); // Placeholder action with toast
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{task.title}</h1>
      <p className="text-rovida-slate-green-gray">{t('details maintenance task', { ns: 'maintenance' })} {id}.</p>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="card-rovida">
          <CardHeader>
            <CardTitle className="text-rovida-navy">{t('task information', { ns: 'maintenance' })}</CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">{t('key details task', { ns: 'maintenance' })}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-2 text-rovida-near-black">
              <div className="font-medium">{t('id', { ns: 'common' })}:</div>
              <div>{task.id}</div>
              <div className="font-medium">{t('status', { ns: 'common' })}:</div>
              <div>{task.status}</div>
              <div className="font-medium">{t('priority', { ns: 'common' })}:</div>
              <div>{task.priority}</div>
              <div className="font-medium">{t('assigned to', { ns: 'common' })}:</div>
              <div>{task.assignedTo}</div>
              <div className="font-medium">{t('due date', { ns: 'common' })}:</div>
              <div>{format(task.dueDate, 'MMM dd, yyyy')}</div>
              <div className="font-medium">{t('estimated cost', { ns: 'maintenance' })}:</div>
              <div className="font-roboto-mono text-rovida-near-black">${task.cost.toFixed(2)}</div>
              <div className="font-medium">{t('created at', { ns: 'common' })}:</div>
              <div>{format(task.createdAt, 'MMM dd, yyyy HH:mm')}</div>
              <div className="font-medium">{t('last updated', { ns: 'common' })}:</div>
              <div>{format(task.updatedAt, 'MMM dd, yyyy HH:mm')}</div>
            </div>
            <Separator className="bg-rovida-soft-gray" />
            <div>
              <h4 className="font-medium mb-2 text-rovida-navy">{t('description', { ns: 'common' })}:</h4>
              <p className="text-rovida-slate-green-gray">{task.description}</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card className="card-rovida">
            <CardHeader>
              <CardTitle className="text-rovida-navy">{t('checklist', { ns: 'maintenance' })}</CardTitle>
              <CardDescription className="text-rovida-slate-green-gray">{t('steps to complete task', { ns: 'maintenance' })}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {task.checklist.map((item) => (
                  <li key={item.id} className="flex items-center gap-2 text-rovida-near-black">
                    {item.completed ? (
                      <CheckCircle className="h-4 w-4 text-rovida-success" />
                    ) : (
                      <Clock className="h-4 w-4 text-rovida-slate-green-gray" />
                    )}
                    <span>{t(item.item.toLowerCase().replace(/ /g, ''), { ns: 'maintenance' })}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="card-rovida">
            <CardHeader>
              <CardTitle className="text-rovida-navy">{t('attachments', { ns: 'issues' })}</CardTitle>
              <CardDescription className="text-rovida-slate-green-gray">{t('supporting docs task', { ns: 'maintenance' })}</CardDescription>
            </CardHeader>
            <CardContent>
              {task.attachments.length > 0 ? (
                <div className="grid gap-3">
                  {task.attachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center gap-3 p-2 border border-rovida-soft-gray rounded-md bg-white/60">
                      <Paperclip className="h-5 w-5 text-rovida-gold" />
                      <div>
                        <button onClick={() => handleViewAttachment(attachment.name)} className="font-medium link-rovida text-left">
                          {attachment.name}
                        </button>
                        <p className="text-xs text-rovida-slate-green-gray">
                          {t('uploaded by on', { ns: 'maintenance', user: attachment.uploadedBy, date: format(attachment.uploadedAt, 'MMM dd, yyyy') })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-rovida-slate-green-gray">{t('no attachments', { ns: 'issues' })}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceTaskDetail;