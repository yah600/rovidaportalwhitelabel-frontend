import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Building, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const MaintenanceAssets = () => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { label: t('maintenance'), href: '/maintenance' },
    { label: 'Assets', href: '/maintenance/assets' },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-rovida-navy">{t('maintenance')} Assets</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Asset
        </Button>
      </header>
      <p className="text-rovida-slate-green-gray">Manage all physical assets within your properties.</p>

      <Card className="flex-1 bg-white/80 backdrop-blur-md border-rovida-soft-gray shadow-subtle">
        <CardHeader>
          <CardTitle className="text-rovida-navy">Asset List</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">Overview of all registered assets.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <Building className="h-12 w-12" />
            <p>Asset management will be available here.</p>
            <Button variant="outline" className="mt-4 btn-secondary">
              <PlusCircle className="mr-2 h-4 w-4" /> Add First Asset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceAssets;