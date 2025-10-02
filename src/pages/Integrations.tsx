import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockIntegrations } from '@/data/mock-integrations';
import IntegrationCard from '@/components/integrations/IntegrationCard';
import { Card } from '@/components/ui/card'; // Import Card for the empty state

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
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('integrations')}</h1>
        <Button className="btn-primary">
          <PlusCircle className="mr-2 h-4 w-4" /> {t('add new integration')}
        </Button>
      </header>

      {hasIntegrations ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockIntegrations.map((integration) => (
            <IntegrationCard key={integration.id} integration={integration} />
          ))}
        </div>
      ) : (
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight text-rovida-near-black">
              {t('no integrations found')}
            </h3>
            <p className="text-sm text-rovida-slate-green-gray">
              {t('start by adding new integration')}
            </p>
            <Button className="mt-4 btn-primary">
              <PlusCircle className="mr-2 h-4 w-4" /> {t('add new integration')}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Integrations;