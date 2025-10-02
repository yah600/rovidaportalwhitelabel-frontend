import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, XCircle, Clock, MessageSquareText } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { toast } from 'sonner'; // Import toast for actions
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

// Mock data for active alerts and timeline
const mockActiveAlerts = [
  {
    id: 'EMG001',
    title: 'Water Leak - Unit 203',
    level: 'Critical',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    description: 'Severe water leak detected in Unit 203. Potential flooding.',
    status: 'Active',
  },
  {
    id: 'EMG002',
    title: 'Fire Alarm - Main Lobby',
    level: 'Critical',
    timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    description: 'Fire alarm triggered in main lobby. Investigation ongoing.',
    status: 'Active',
  },
];

const mockEmergencyTimeline = [
  {
    id: 'T001',
    timestamp: new Date(Date.now() - 65 * 60 * 1000),
    user: 'System',
    details: 'Fire alarm triggered in Main Lobby.',
    type: 'alert',
  },
  {
    id: 'T002',
    timestamp: new Date(Date.now() - 55 * 60 * 1000),
    user: 'Super Admin',
    details: 'Alert EMG002 acknowledged. Emergency services dispatched.',
    type: 'status_change',
  },
  {
    id: 'T003',
    timestamp: new Date(Date.now() - 35 * 60 * 1000),
    user: 'Emergency Agent',
    details: 'Water leak detected in Unit 203. Alert EMG001 created.',
    type: 'alert',
  },
  {
    id: 'T004',
    timestamp: new Date(Date.now() - 20 * 60 * 1000),
    user: 'Emergency Agent',
    details: 'On-site assessment for EMG001 initiated. Main water shut off.',
    type: 'comment',
  },
];

const Emergency = () => {
  const { t } = useTranslation(['emergency', 'common']); // Ensure 'emergency' and 'common' namespaces are loaded
  const { canApprove, canPerformSpecial } = useAuth();

  const breadcrumbItems = [
    { label: t('emergency', { ns: 'emergency' }), href: '/emergency' },
  ];

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="h-4 w-4 text-rovida-error" />;
      case 'status_change':
        return <CheckCircle className="h-4 w-4 text-rovida-success" />;
      case 'comment':
        return <MessageSquareText className="h-4 w-4 text-rovida-navy" />;
      default:
        return <Clock className="h-4 w-4 text-rovida-slate-green-gray" />;
    }
  };

  const handleAcknowledge = (alertId: string) => {
    toast.success(t('acknowledge alert action', { ns: 'emergency', id: alertId })); // Placeholder action with toast
  };

  const handleEscalate = (alertId: string) => {
    toast.error(t('escalate alert action', { ns: 'emergency', id: alertId })); // Placeholder action with toast
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('emergency', { ns: 'emergency' })} {t('emergency management', { ns: 'emergency' })}</h1>
      <p className="text-rovida-slate-green-gray">{t('monitor manage incidents realtime', { ns: 'emergency' })}</p>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="card-rovida">
          <CardHeader>
            <CardTitle className="text-rovida-error flex items-center gap-2">
              <AlertTriangle className="h-6 w-6" /> {t('active critical alerts', { ns: 'emergency' })}
            </CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">{t('immediate action required', { ns: 'emergency' })}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockActiveAlerts.length > 0 ? (
              mockActiveAlerts.map((alert) => (
                <div key={alert.id} className="border border-rovida-error rounded-lg p-4 bg-rovida-error/10">
                  <h3 className="font-semibold text-rovida-near-black">{alert.title}</h3>
                  <p className="text-sm text-rovida-slate-green-gray">{alert.description}</p>
                  <p className="text-xs text-rovida-slate-green-gray mt-1">
                    {t('detected', { ns: 'emergency' })}: {format(alert.timestamp, 'MMM dd, yyyy HH:mm')}
                  </p>
                  <div className="mt-3 flex gap-2">
                    {canApprove('Emergency Center') && (
                      <Button variant="destructive" className="btn-primary bg-rovida-error border border-white" onClick={() => handleAcknowledge(alert.id)}>{t('acknowledge', { ns: 'emergency' })}</Button>
                    )}
                    {canPerformSpecial('Emergency Center') && ( // Assuming escalate is a 'special' action
                      <Button variant="outline" className="btn-secondary border-rovida-error text-rovida-error hover:bg-rovida-error/10" onClick={() => handleEscalate(alert.id)}>{t('escalate', { ns: 'emergency' })}</Button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-rovida-slate-green-gray">{t('no active critical alerts', { ns: 'emergency' })}</p>
            )}
          </CardContent>
        </Card>

        <Card className="card-rovida">
          <CardHeader>
            <CardTitle className="text-rovida-navy">{t('live emergency timeline', { ns: 'emergency' })}</CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">{t('realtime updates emergency events', { ns: 'emergency' })}</CardDescription>
          </CardHeader>
          <CardContent>
            {mockEmergencyTimeline.length > 0 ? (
              <ol className="relative border-l border-rovida-soft-gray ml-4">
                {mockEmergencyTimeline.map((event) => (
                  <li key={event.id} className="mb-6 ml-6">
                    <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-8 ring-white dark:bg-rovida-near-black dark:ring-rovida-near-black">
                      {getTimelineIcon(event.type)}
                    </span>
                    <h3 className="flex items-center mb-1 text-lg font-semibold text-rovida-near-black">
                      {event.user}
                      <time className="block ml-2 text-sm font-normal leading-none text-rovida-slate-green-gray">
                        {format(event.timestamp, 'MMM dd, yyyy HH:mm')}
                      </time>
                    </h3>
                    <p className="mb-4 text-base font-normal text-rovida-slate-green-gray">{event.details}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-rovida-slate-green-gray">{t('no emergency events timeline', { ns: 'emergency' })}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Emergency;