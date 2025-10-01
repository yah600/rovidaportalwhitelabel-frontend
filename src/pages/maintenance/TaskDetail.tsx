import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, User, Clock, DollarSign, Paperclip } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

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
  const { t } = useTranslation();

  const task = mockTask; // Using mockTask for now, would fetch by id

  if (!task) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-rovida-slate-green-gray">{t('task_not_found')}</p>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: t('maintenance'), href: '/maintenance' },
    { label: t('tasks'), href: '/maintenance/tasks' },
    { label: `${t('task')} ${task.id}`, href: `/maintenance/tasks/${task.id}` },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{task.title}</h1>
      <p className="text-rovida-slate-green-gray">{t('details_maintenance_task')} {id}.</p>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="card-rovida">
          <CardHeader>
            <CardTitle className="text-rovida-navy">{t('task_information')}</CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">{t('key_details_task')}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-2 text-rovida-near-black">
              <div className="font-medium">{t('id')}:</div>
              <div>{task.id}</div>
              <div className="font-medium">{t('status')}:</div>
              <div>{task.status}</div>
              <div className="font-medium">{t('priority')}:</div>
              <div>{task.priority}</div>
              <div className="font-medium">{t('assigned_to')}:</div>
              <div>{task.assignedTo}</div>
              <div className="font-medium">{t('due_date')}:</div>
              <div>{format(task.dueDate, 'MMM dd, yyyy')}</div>
              <div className="font-medium">{t('estimated_cost')}:</div>
              <div className="font-roboto-mono text-rovida-near-black">${task.cost.toFixed(2)}</div>
              <div className="font-medium">{t('created_at')}:</div>
              <div>{format(task.createdAt, 'MMM dd, yyyy HH:mm')}</div>
              <div className="font-medium">{t('last_updated')}:</div>
              <div>{format(task.updatedAt, 'MMM dd, yyyy HH:mm')}</div>
            </div>
            <Separator className="bg-rovida-soft-gray" />
            <div>
              <h4 className="font-medium mb-2 text-rovida-navy">{t('description')}:</h4>
              <p className="text-rovida-slate-green-gray">{task.description}</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card className="card-rovida">
            <CardHeader>
              <CardTitle className="text-rovida-navy">{t('checklist')}</CardTitle>
              <CardDescription className="text-rovida-slate-green-gray">{t('steps_to_complete_task')}</CardDescription>
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
                    <span>{item.item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="card-rovida">
            <CardHeader>
              <CardTitle className="text-rovida-navy">{t('attachments')}</CardTitle>
              <CardDescription className="text-rovida-slate-green-gray">{t('supporting_docs_task')}</CardDescription>
            </CardHeader>
            <CardContent>
              {task.attachments.length > 0 ? (
                <div className="grid gap-3">
                  {task.attachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center gap-3 p-2 border border-rovida-soft-gray rounded-md bg-white/60">
                      <Paperclip className="h-5 w-5 text-rovida-gold" />
                      <div>
                        <a href={attachment.url} target="_blank" rel="noopener noreferrer" className="font-medium link-rovida">
                          {attachment.name}
                        </a>
                        <p className="text-xs text-rovida-slate-green-gray">
                          {t('uploaded_by_on', { user: attachment.uploadedBy, date: format(attachment.uploadedAt, 'MMM dd, yyyy') })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-rovida-slate-green-gray">{t('no_attachments')}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceTaskDetail;