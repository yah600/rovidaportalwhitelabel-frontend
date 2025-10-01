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
        <p className="text-muted-foreground">Integration not found.</p>
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
        <h1 className="text-2xl font-semibold md:text-3xl">{integration.name}</h1>
        <div className="flex items-center gap-2">
          <Badge variant={getStatusBadgeVariant(integration.status)}>{integration.status}</Badge>
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
                <Edit className="mr-2 h-4 w-4" /> Edit Integration
              </DropdownMenuItem>
              {integration.status === 'Active' ? (
                <DropdownMenuItem className="text-destructive">
                  <PowerOff className="mr-2 h-4 w-4" /> Deactivate
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem>
                  <Power className="mr-2 h-4 w-4" /> Activate
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Remove Integration
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Integration Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="font-medium">ID:</div>
            <div>{integration.id}</div>
            <div className="font-medium">Type:</div>
            <div>{integration.type}</div>
            <div className="font-medium">Status:</div>
            <div>{integration.status}</div>
            {integration.connectedAt && (
              <>
                <div className="font-medium">Connected At:</div>
                <div>{format(integration.connectedAt, 'MMM dd, yyyy HH:mm')}</div>
              </>
            )}
          </div>
          <Separator />
          <div>
            <h4 className="font-medium mb-2">Description:</h4>
            <p className="text-muted-foreground">{integration.description}</p>
          </div>
          {integration.status === 'Pending Setup' && (
            <>
              <Separator />
              <div>
                <h4 className="font-medium mb-2">Setup Instructions:</h4>
                <p className="text-muted-foreground">
                  To activate this integration, please follow these steps:
                  <ol className="list-decimal list-inside mt-2">
                    <li>Go to the {integration.name} dashboard.</li>
                    <li>Generate an API key.</li>
                    <li>Enter the API key in the settings below.</li>
                    <li>Click "Save and Activate".</li>
                  </ol>
                </p>
                <Button className="mt-4">Complete Setup</Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationDetail;