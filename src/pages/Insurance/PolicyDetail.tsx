import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash2, Shield, FileText, CalendarDays } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockInsurancePolicies, InsurancePolicy } from '@/data/mock-insurance';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

const InsurancePolicyDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation(['insurance', 'common']);
  const { canUpdate, canDelete } = useAuth();

  const policy: InsurancePolicy | undefined = mockInsurancePolicies.find((p) => p.id === id);

  if (!policy) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-rovida-slate-green-gray">{t('policy not found', { ns: 'insurance' })}</p>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: t('insurance and claims', { ns: 'insurance' }), href: '/insurance' },
    { label: `${t('policy', { ns: 'insurance' })} ${policy.id}`, href: `/insurance/${policy.id}` },
  ];

  const getStatusBadgeVariant = (status: InsurancePolicy['status']) => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'Expired':
        return 'destructive';
      case 'Pending Renewal':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const handleEditPolicy = () => {
    toast.info(t('edit policy action', { ns: 'insurance', id: policy.id }));
  };

  const handleRenewPolicy = () => {
    toast.success(t('renew policy action', { ns: 'insurance', id: policy.id }));
  };

  const handleDeletePolicy = () => {
    toast.error(t('delete policy action', { ns: 'insurance', id: policy.id }));
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{policy.policyNumber}</h1>
        <div className="flex items-center gap-2">
          <Badge variant={getStatusBadgeVariant(policy.status)}>{t(policy.status.toLowerCase().replace(/ /g, '_'), { ns: 'insurance' })}</Badge>
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
              {canUpdate('Insurance') && (
                <DropdownMenuItem className="hover:bg-rovida-soft-gray" onClick={handleEditPolicy}>
                  <Edit className="mr-2 h-4 w-4" /> {t('edit policy', { ns: 'insurance' })}
                </DropdownMenuItem>
              )}
              {canUpdate('Insurance') && policy.status !== 'Active' && (
                <DropdownMenuItem className="hover:bg-rovida-soft-gray" onClick={handleRenewPolicy}>
                  <CalendarDays className="mr-2 h-4 w-4" /> {t('renew policy', { ns: 'insurance' })}
                </DropdownMenuItem>
              )}
              {canDelete('Insurance') && (
                <DropdownMenuItem className="text-destructive hover:bg-rovida-soft-gray" onClick={handleDeletePolicy}>
                  <Trash2 className="mr-2 h-4 w-4" /> {t('delete policy', { ns: 'insurance' })}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Card className="card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('policy details', { ns: 'insurance' })}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2 text-rovida-near-black">
            <div className="font-medium">{t('id', { ns: 'common' })}:</div>
            <div>{policy.id}</div>
            <div className="font-medium">{t('provider', { ns: 'insurance' })}:</div>
            <div>{policy.provider}</div>
            <div className="font-medium">{t('policy number', { ns: 'insurance' })}:</div>
            <div>{policy.policyNumber}</div>
            <div className="font-medium">{t('type', { ns: 'common' })}:</div>
            <div>{t(policy.type.toLowerCase(), { ns: 'insurance' })}</div>
            <div className="font-medium">{t('coverage amount', { ns: 'insurance' })}:</div>
            <div className="font-roboto-mono">${policy.coverageAmount.toLocaleString()}</div>
            <div className="font-medium">{t('deductible', { ns: 'insurance' })}:</div>
            <div className="font-roboto-mono">${policy.deductible.toLocaleString()}</div>
            <div className="font-medium">{t('start date', { ns: 'tenancy' })}:</div>
            <div>{format(policy.startDate, 'MMM dd, yyyy')}</div>
            <div className="font-medium">{t('end date', { ns: 'insurance' })}:</div>
            <div>{format(policy.endDate, 'MMM dd, yyyy')}</div>
            <div className="font-medium">{t('contact person', { ns: 'insurance' })}:</div>
            <div>{policy.contactPerson}</div>
            <div className="font-medium">{t('contact phone', { ns: 'insurance' })}:</div>
            <div>{policy.contactPhone}</div>
          </div>
          <Separator className="bg-rovida-soft-gray" />
          <div>
            <h4 className="font-medium mb-2 text-rovida-navy">{t('description', { ns: 'common' })}:</h4>
            <p className="text-rovida-slate-green-gray">{policy.type} {t('policy for', { ns: 'insurance' })} {policy.provider}.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsurancePolicyDetail;