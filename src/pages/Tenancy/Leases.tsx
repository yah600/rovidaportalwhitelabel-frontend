import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileSignature, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockLeases } from '@/data/mock-leases';
import LeasesTable from '@/components/tenancy/LeasesTable';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { useAuth } from '@/shared/rbac/useAuth'; // Import useAuth

const Leases = () => {
  const { t } = useTranslation(['tenancy', 'common']); // Ensure 'tenancy' and 'common' namespaces are loaded
  const { canRead, canCreate } = useAuth();

  const breadcrumbItems = [
    { label: t('home', { ns: 'common' }), href: '/' },
    { label: t('tenancy', { ns: 'tenancy' }), href: '/tenancy' },
    { label: t('leases', { ns: 'tenancy' }), href: '/tenancy/leases' },
  ];

  const hasLeases = mockLeases.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('leases', { ns: 'tenancy' })}</h1>
        {canCreate('Tenancy - Leases') && (
          <Button className="btn-primary">
            <PlusCircle className="mr-2 h-4 w-4" /> {t('add new lease', { ns: 'tenancy' })}
          </Button>
        )}
      </header>
      <p className="text-rovida-slate-green-gray">{t('manage tenant information leases', { ns: 'tenancy' })}</p>

      {canRead('Tenancy - Leases') ? (
        hasLeases ? (
          <div className="card-rovida p-4"> {/* Wrapped content in card-rovida */}
            <LeasesTable leases={mockLeases} />
          </div>
        ) : (
          <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
            <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
              <FileSignature className="h-12 w-12 text-rovida-gold" />
              <p>{t('leases managed here', { ns: 'tenancy' })}</p>
              {canCreate('Tenancy - Leases') && (
                <Button variant="outline" className="mt-4 btn-secondary">
                  <PlusCircle className="mr-2 h-4 w-4" /> {t('add first lease', { ns: 'tenancy' })}
                </Button>
              )}
            </div>
          </Card>
        )
      ) : (
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <FileSignature className="h-12 w-12 text-rovida-gold" />
            <p>{t('no permission view leases', { ns: 'common' })}</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Leases;