import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockUnitStatements } from '@/mocks';
import UnitStatementsTable from '@/components/tenancy/UnitStatementsTable';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

const UnitStatements = () => {
  const { t } = useTranslation(['tenancy', 'common']);
  const { canRead, canCreate } = useAuth();

  const breadcrumbItems = [
    { label: t('tenancy', { ns: 'tenancy' }), href: '/tenancy' },
    { label: t('unit statements', { ns: 'tenancy' }), href: '/tenancy/statements' },
  ];

  const hasStatements = mockUnitStatements.length > 0;

  const handleGenerateStatement = () => {
    toast.info(t('generate new statement action', { ns: 'tenancy' }));
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('unit statements', { ns: 'tenancy' })}</h1>
        {canCreate('Tenancy - Unit Statements') && (
          <Button className="btn-primary" onClick={handleGenerateStatement}>
            <PlusCircle className="mr-2 h-4 w-4" /> {t('generate new statement', { ns: 'tenancy' })}
          </Button>
        )}
      </header>
      <p className="text-rovida-slate-green-gray">{t('manage unit statements', { ns: 'tenancy' })}</p>

      {canRead('Tenancy - Unit Statements') ? (
        hasStatements ? (
          <div className="card-rovida p-4">
            <UnitStatementsTable statements={mockUnitStatements} />
          </div>
        ) : (
          <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
            <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
              <FileText className="h-12 w-12 text-rovida-gold" />
              <p>{t('no unit statements found', { ns: 'tenancy' })}</p>
              {canCreate('Tenancy - Unit Statements') && (
                <Button variant="outline" className="mt-4 btn-secondary" onClick={handleGenerateStatement}>
                  <PlusCircle className="mr-2 h-4 w-4" /> {t('generate first statement', { ns: 'tenancy' })}
                </Button>
              )}
            </div>
          </Card>
        )
      ) : (
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <FileText className="h-12 w-12 text-rovida-gold" />
            <p>{t('no permission view unit statements', { ns: 'common' })}</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default UnitStatements;