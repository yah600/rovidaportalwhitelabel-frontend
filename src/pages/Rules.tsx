import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Gavel, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockRules } from '@/data/mock-rules';
import RulesTable from '@/components/rules/RulesTable';
import { toast } from 'sonner'; // Import toast for actions
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

const Rules = () => {
  const { t } = useTranslation(['rules', 'common']); // Ensure 'rules' and 'common' namespaces are loaded
  const { canRead, canCreate } = useAuth();

  const breadcrumbItems = [
    { label: t('home', { ns: 'common' }), href: '/' },
    { label: t('rules and violations', { ns: 'rules' }), href: '/rules' },
  ];

  const hasRules = mockRules.length > 0;

  const handleAddRule = () => {
    toast.info(t('add new rule action', { ns: 'rules' })); // Placeholder action with toast
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('rules and violations', { ns: 'rules' })}</h1>
        {canCreate('Rules') && (
          <Button className="btn-primary" onClick={handleAddRule}>
            <PlusCircle className="mr-2 h-4 w-4" /> {t('add new rule', { ns: 'rules' })}
          </Button>
        )}
      </header>
      <p className="text-rovida-slate-green-gray">{t('manage building rules violations', { ns: 'rules' })}</p>

      {canRead('Rules') ? (
        hasRules ? (
          <div className="card-rovida p-4"> {/* Wrapped content in card-rovida */}
            <RulesTable rules={mockRules} />
          </div>
        ) : (
          <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
            <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
              <Gavel className="h-12 w-12 text-rovida-gold" />
              <p>{t('rules violations managed here', { ns: 'rules' })}</p>
              {canCreate('Rules') && (
                <Button variant="outline" className="mt-4 btn-secondary" onClick={handleAddRule}>
                  <PlusCircle className="mr-2 h-4 w-4" /> {t('add first rule', { ns: 'rules' })}
                </Button>
              )}
            </div>
          </Card>
        )
      ) : (
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <Gavel className="h-12 w-12 text-rovida-gold" />
            <p>{t('no permission view rules', { ns: 'common' })}</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Rules;