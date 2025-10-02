import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Shield, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockInsurancePolicies } from '@/data/mock-insurance';
import PoliciesTable from '@/components/insurance/PoliciesTable';
import { toast } from 'sonner'; // Import toast for actions
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

const Insurance = () => {
  const { t } = useTranslation(['insurance', 'common']); // Ensure 'insurance' and 'common' namespaces are loaded
  const { canRead, canCreate } = useAuth();

  const breadcrumbItems = [
    { label: t('home', { ns: 'common' }), href: '/' },
    { label: t('insurance and claims', { ns: 'insurance' }), href: '/insurance' },
  ];

  const hasPolicies = mockInsurancePolicies.length > 0;

  const handleAddPolicy = () => {
    toast.info(t('add new policy action', { ns: 'insurance' })); // Placeholder action with toast
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('insurance and claims', { ns: 'insurance' })}</h1>
        {canCreate('Insurance') && (
          <Button className="btn-primary" onClick={handleAddPolicy}>
            <PlusCircle className="mr-2 h-4 w-4" /> {t('add new policy', { ns: 'insurance' })}
          </Button>
        )}
      </header>
      <p className="text-rovida-slate-green-gray">{t('manage insurance policies claims', { ns: 'insurance' })}</p>

      {canRead('Insurance') ? (
        hasPolicies ? (
          <div className="card-rovida p-4"> {/* Wrapped content in card-rovida */}
            <PoliciesTable policies={mockInsurancePolicies} />
          </div>
        ) : (
          <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
            <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
              <Shield className="h-12 w-12 text-rovida-gold" />
              <p>{t('insurance claims managed here', { ns: 'insurance' })}</p>
              {canCreate('Insurance') && (
                <Button variant="outline" className="mt-4 btn-secondary" onClick={handleAddPolicy}>
                  <PlusCircle className="mr-2 h-4 w-4" /> {t('add first policy', { ns: 'insurance' })}
                </Button>
              )}
            </div>
          </Card>
        )
      ) : (
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <Shield className="h-12 w-12 text-rovida-gold" />
            <p>{t('no permission view insurance', { ns: 'common' })}</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Insurance;