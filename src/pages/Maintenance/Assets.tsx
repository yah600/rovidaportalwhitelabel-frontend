import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Building, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { mockAssets } from '@/data/mock-assets'; // Import mockAssets
import AssetsTable from '@/components/maintenance/AssetsTable'; // Import AssetsTable
import { toast } from 'sonner'; // Import toast for actions
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

const MaintenanceAssets = () => {
  const { t } = useTranslation(['maintenance', 'common']); // Specify namespaces

  const breadcrumbItems = [
    { label: t('maintenance', { ns: 'maintenance' }), href: '/maintenance' },
    { label: t('assets', { ns: 'maintenance' }), href: '/maintenance/assets' },
  ];

  const hasAssets = mockAssets.length > 0;
  const { canRead, canCreate } = useAuth();

  const handleAddNewAsset = () => {
    // This will now navigate to the new form page
    // toast.info(t('add new asset action', { ns: 'maintenance' })); // Placeholder action with toast
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('maintenance', { ns: 'maintenance' })} {t('assets', { ns: 'maintenance' })}</h1>
        {canCreate('Maintenance') && (
          <Link to="/maintenance/assets/new">
            <Button className="btn-primary" onClick={handleAddNewAsset}>
              <PlusCircle className="mr-2 h-4 w-4" /> {t('add new asset', { ns: 'maintenance' })}
            </Button>
          </Link>
        )}
      </header>
      <p className="text-rovida-slate-green-gray">{t('manage physical assets', { ns: 'maintenance' })}</p>

      {canRead('Maintenance') ? (
        hasAssets ? (
          <div className="card-rovida p-4"> {/* Wrapped content in card-rovida */}
            <AssetsTable assets={mockAssets} />
          </div>
        ) : (
          <Card className="flex-1 card-rovida">
            <CardHeader>
              <CardTitle className="text-rovida-navy">{t('asset list', { ns: 'maintenance' })}</CardTitle>
              <CardDescription className="text-rovida-slate-green-gray">{t('overview registered assets', { ns: 'maintenance' })}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
                <Building className="h-12 w-12 text-rovida-gold" />
                <p className="text-lg font-medium text-rovida-near-black">{t('asset management available here', { ns: 'maintenance' })}</p>
                <p className="text-sm text-center">{t('track all physical assets, their locations, and maintenance history. Add your first asset to get started.', { ns: 'maintenance' })}</p>
                {canCreate('Maintenance') && (
                  <Link to="/maintenance/assets/new">
                    <Button variant="outline" className="mt-4 btn-secondary" onClick={handleAddNewAsset}>
                      <PlusCircle className="mr-2 h-4 w-4" /> {t('add first asset', { ns: 'maintenance' })}
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        )
      ) : (
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <Building className="h-12 w-12 text-rovida-gold" />
            <p>{t('no permission view assets', { ns: 'common' })}</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default MaintenanceAssets;