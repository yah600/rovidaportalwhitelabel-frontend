import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Wrench } from 'lucide-react';

const MaintenanceWorkOrderDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation(['maintenance', 'common']);

  const breadcrumbItems = [
    { label: t('maintenance', { ns: 'maintenance' }), href: '/maintenance' },
    { label: t('work orders', { ns: 'maintenance' }), href: '/maintenance/work-orders' },
    { label: `${t('work order', { ns: 'maintenance' })} ${id}`, href: `/maintenance/work-orders/${id}` },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('work order', { ns: 'maintenance' })} {id}</h1>
      <p className="text-rovida-slate-green-gray">{t('details for work order', { ns: 'maintenance' })} {id}.</p>

      <Card className="flex-1 card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('work order details', { ns: 'maintenance' })}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">{t('full details of this work order', { ns: 'maintenance' })}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <Wrench className="h-12 w-12 text-rovida-gold" />
            <p className="text-lg font-medium text-rovida-near-black">{t('work order detail view coming soon', { ns: 'maintenance' })}</p>
            <p className="text-sm text-center">{t('this page will display comprehensive information about the work order, including its status, assigned personnel, and a timeline of actions.', { ns: 'maintenance' })}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceWorkOrderDetail;