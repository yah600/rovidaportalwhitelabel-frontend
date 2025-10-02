import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileSignature, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockLeases } from '@/data/mock-leases';
import LeasesTable from '@/components/tenancy/LeasesTable';
import BreadcrumbNav from '@/components/BreadcrumbNav';

const Leases = () => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { label: t('home'), href: '/' },
    { label: t('tenancy'), href: '/tenancy' },
    { label: t('leases'), href: '/tenancy/leases' },
  ];

  const hasLeases = mockLeases.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('leases')}</h1>
        <Button className="btn-primary">
          <PlusCircle className="mr-2 h-4 w-4" /> {t('add new lease')}
        </Button>
      </header>
      <p className="text-rovida-slate-green-gray">{t('manage tenant information leases')}</p>

      {hasLeases ? (
        <LeasesTable leases={mockLeases} />
      ) : (
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <FileSignature className="h-12 w-12 text-rovida-gold" />
            <p>{t('leases managed here')}</p>
            <Button variant="outline" className="mt-4 btn-secondary">
              <PlusCircle className="mr-2 h-4 w-4" /> {t('add first lease')}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Leases;