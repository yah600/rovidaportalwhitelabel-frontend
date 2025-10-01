import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Building, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { mockAssets } from '@/data/mock-assets'; // Import mockAssets
import AssetsTable from '@/components/maintenance/AssetsTable'; // Import AssetsTable

const MaintenanceAssets = () => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { label: t('maintenance'), href: '/maintenance' },
    { label: t('assets'), href: '/maintenance/assets' },
  ];

  const hasAssets = mockAssets.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('maintenance')} {t('assets')}</h1>
        <Button className="btn-primary">
          <PlusCircle className="mr-2 h-4 w-4" /> {t('add_new_asset')}
        </Button>
      </header>
      <p className="text-rovida-slate-green-gray">{t('manage_physical_assets')}</p>

      {hasAssets ? (
        <AssetsTable assets={mockAssets} />
      ) : (
        <Card className="flex-1 card-rovida">
          <CardHeader>
            <CardTitle className="text-rovida-navy">{t('asset_list')}</CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">{t('overview_registered_assets')}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
              <Building className="h-12 w-12 text-rovida-gold" />
              <p>{t('asset_management_available_here')}</p>
              <Button variant="outline" className="mt-4 btn-secondary">
                <PlusCircle className="mr-2 h-4 w-4" /> {t('add_first_asset')}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MaintenanceAssets;