import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Plug, Power, PowerOff, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockIntegrations, Integration } from '@/data/mock-integrations';
import { format } from 'date-fns';
import { toast } from 'sonner'; // Import toast for actions

const IntegrationDetail = () => {
  const { slug } = useParams();
  const { t } = useTranslation(['integrations', 'common']); // Ensure 'integrations' and 'common' namespaces are loaded

  const integration: Integration | undefined = mockIntegrations.find((int) => int.slug === slug);

  if (!integration) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-rovida-slate-green-gray">{t('integration not found', { ns: 'integrations' })}</p>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: t('integrations', { ns: 'integrations' }), href: '/integrations' },
    { label: integration.name, href: `/integrations/${integration.slug}` },
  ];

  const getStatusBadgeVariant = (status: Integration['status']) => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'Inactive':
        return 'destructive';
      case 'Pending Setup':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const handleEditIntegration = () => {
    toast.info(t('edit integration action', { ns: 'integrations', name: integration.name })); // Placeholder action with toast
  };

  const handleToggleIntegrationStatus = () => {
    const newStatus = integration.status === 'Active' ? 'deactivated' : 'activated';
    toast.success(t('toggle integration status action', { ns: 'integrations', name: integration.name, status: newStatus })); // Placeholder action with toast
  };

  const handleRemoveIntegration = () => {
    toast.error(t('remove integration action', { ns: 'integrations', name: integration.name })); // Placeholder action with toast
  };

  const handleCompleteSetup = () => {
    toast.info(t('complete setup action', { ns: 'integrations', name: integration.name })); // Placeholder action with toast
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{integration.name}</h1>
        <div className="flex items-center gap-2">
          <Badge variant={getStatusBadgeVariant(integration.status)}>{t(integration.status.toLowerCase(), { ns: 'integrations' })}</Badge>
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
              <DropdownMenuItem className="hover:bg-rovida-soft-gray" onClick={handleEditIntegration}>
                <Edit className="mr-2 h-4 w-4" /> {t('edit integration', { ns: 'integrations' })}
              </DropdownMenuItem>
              {integration.status === 'Active' ? (
                <DropdownMenuItem className="text-destructive hover:bg-rovida-soft-gray" onClick={handleToggleIntegrationStatus}>
                  <PowerOff className="mr-2 h-4 w-4" /> {t('deactivate', { ns: 'integrations' })}
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem className="hover:bg-rovida-soft-gray" onClick={handleToggleIntegrationStatus}>
                  <Power className="mr-2 h-4 w-4" /> {t('activate', { ns: 'integrations' })}
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="text-destructive hover:bg-rovida-soft-gray" onClick={handleRemoveIntegration}>
                <Trash2 className="mr-2 h-4 w-4" /> {t('remove integration', { ns: 'integrations' })}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Card className="card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('integration details', { ns: 'integrations' })}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2 text-rovida-near-black">
            <div className="font-medium">{t('id', { ns: 'common' })}:</div>
            <div>{integration.id}</div>
            <div className="font-medium">{t('type', { ns: 'common' })}:</div>
            <div>{integration.type}</div>
            <div className="font-medium">{t('status', { ns: 'common' })}:</div>
            <div>{integration.status}</div>
            {integration.connectedAt && (
              <>
                <div className="font-medium">{t('connected at', { ns: 'integrations' })}:</div>
                <div>{format(integration.connectedAt, 'MMM dd, yyyy HH:mm')}</div>
              </>
            )}
          </div>
          <Separator className="bg-rovida-soft-gray" />
          <div>
            <h4 className="font-medium mb-2 text-rovida-navy">{t('description', { ns: 'common' })}:</h4>
            <p className="text-rovida-slate-green-gray">{integration.description}</p>
          </div>
          {integration.status === 'Pending Setup' && (
            <>
              <Separator className="bg-rovida-soft-gray" />
              <div>
                <h4 className="font-medium mb-2 text-rovida-navy">{t('setup instructions', { ns: 'integrations' })}:</h4>
                <p className="text-rovida-slate-green-gray">
                  {t('to activate integration follow steps', { ns: 'integrations' })}
                  <ol className="list-decimal list-inside mt-2">
                    <li>{t('go to dashboard', { ns: 'integrations' })} {integration.name} {t('dashboard', { ns: 'common' })}.</li>
                    <li>{t('generate api key', { ns: 'integrations' })}</li>
                    <li>{t('enter api key below', { ns: 'integrations' })}</li>
                    <li>{t('click save activate', { ns: 'integrations' })}</li>
                  </ol>
                </p>
                <Button className="mt-4 btn-primary" onClick={handleCompleteSetup}>{t('complete setup', { ns: 'integrations' })}</Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationDetail;