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

const IntegrationDetail = () => {
  const { slug } = useParams();
  const { t } = useTranslation();

  const integration: Integration | undefined = mockIntegrations.find((int) => int.slug === slug);

  if (!integration) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-rovida-slate-green-gray">{t('integration not found')}</p>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: t('integrations'), href: '/integrations' },
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

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{integration.name}</h1>
        <div className="flex items-center gap-2">
          <Badge variant={getStatusBadgeVariant(integration.status)}>{t(integration.status.toLowerCase().replace(/ /g, ''))}</Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">{t('actions')}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white/80 backdrop-blur-xl border-rovida-soft-gray text-rovida-near-black">
              <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-rovida-soft-gray" />
              <DropdownMenuItem className="hover:bg-rovida-soft-gray">
                <Edit className="mr-2 h-4 w-4" /> {t('edit integration')}
              </DropdownMenuItem>
              {integration.status === 'Active' ? (
                <DropdownMenuItem className="text-destructive hover:bg-rovida-soft-gray">
                  <PowerOff className="mr-2 h-4 w-4" /> {t('deactivate')}
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem className="hover:bg-rovida-soft-gray">
                  <Power className="mr-2 h-4 w-4" /> {t('activate')}
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="text-destructive hover:bg-rovida-soft-gray">
                <Trash2 className="mr-2 h-4 w-4" /> {t('remove integration')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Card className="card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('integration details')}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2 text-rovida-near-black">
            <div className="font-medium">{t('id')}:</div>
            <div>{integration.id}</div>
            <div className="font-medium">{t('type')}:</div>
            <div>{integration.type}</div>
            <div className="font-medium">{t('status')}:</div>
            <div>{integration.status}</div>
            {integration.connectedAt && (
              <>
                <div className="font-medium">{t('connected at')}:</div>
                <div>{format(integration.connectedAt, 'MMM dd, yyyy HH:mm')}</div>
              </>
            )}
          </div>
          <Separator className="bg-rovida-soft-gray" />
          <div>
            <h4 className="font-medium mb-2 text-rovida-navy">{t('description')}:</h4>
            <p className="text-rovida-slate-green-gray">{integration.description}</p>
          </div>
          {integration.status === 'Pending Setup' && (
            <>
              <Separator className="bg-rovida-soft-gray" />
              <div>
                <h4 className="font-medium mb-2 text-rovida-navy">{t('setup instructions')}:</h4>
                <p className="text-rovida-slate-green-gray">
                  {t('to activate integration follow steps')}
                  <ol className="list-decimal list-inside mt-2">
                    <li>{t('go to dashboard')} {integration.name} {t('dashboard')}.</li>
                    <li>{t('generate api key')}</li>
                    <li>{t('enter api key below')}</li>
                    <li>{t('click save activate')}</li>
                  </ol>
                </p>
                <Button className="mt-4 btn-primary">{t('complete setup')}</Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationDetail;