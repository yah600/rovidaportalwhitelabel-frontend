import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockIntegrations } from '@/data/mock-integrations';
import IntegrationCard from '@/components/integrations/IntegrationCard';

const Integrations = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('integrations'), href: '/integrations' },
  ];

  const hasIntegrations = mockIntegrations.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">{t('integrations')}</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Integration
        </Button>
      </header>

      {hasIntegrations ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockIntegrations.map((integration) => (
            <IntegrationCard key={integration.id} integration={integration} />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              No integrations found.
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start by adding a new integration.
            </p>
            <Button className="mt-4">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Integration
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Integrations;