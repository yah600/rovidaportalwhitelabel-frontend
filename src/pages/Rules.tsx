import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Gavel, PlusCircle, Ticket } from 'lucide-react'; // Imported Ticket icon
import { Button } from '@/components/ui/button';
import { mockRules } from '@/data/mock-rules';
import RulesTable from '@/components/rules/RulesTable';
import { toast } from 'sonner'; // Import toast for actions
import { useAuth } from '@/hooks/useAuth'; // Import useAuth
import { Link } from 'react-router-dom'; // Import Link

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

      <div className="grid gap-4 md:grid-cols-2">
        {/* Rules Catalog Card */}
        {canRead('Rules') ? (
          <Card className="card-rovida">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg text-rovida-navy">{t('rule catalog', { ns: 'rules' })}</CardTitle>
              <Gavel className="h-6 w-6 text-rovida-gold" />
            </CardHeader>
            <CardContent>
              <CardDescription className="text-rovida-slate-green-gray mb-4">
                {t('view edit building rules', { ns: 'rules' })}
              </CardDescription>
              <Link to="/rules/catalog" className="link-rovida flex items-center gap-1">
                {t('view rules', { ns: 'rules' })} <PlusCircle className="ml-1 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        ) : (
          <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida p-8">
            <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
              <Gavel className="h-12 w-12 text-rovida-gold" />
              <p>{t('no permission view rules', { ns: 'common' })}</p>
            </div>
          </Card>
        )}

        {/* Violation Tickets Card */}
        {canRead('Rules - Violations') ? (
          <Card className="card-rovida">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg text-rovida-navy">{t('violation tickets', { ns: 'rules' })}</CardTitle>
              <Ticket className="h-6 w-6 text-rovida-gold" />
            </CardHeader>
            <CardContent>
              <CardDescription className="text-rovida-slate-green-gray mb-4">
                {t('track manage rule violations', { ns: 'rules' })}
              </CardDescription>
              <Link to="/rules/violations" className="link-rovida flex items-center gap-1">
                {t('view tickets', { ns: 'rules' })} <PlusCircle className="ml-1 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        ) : (
          <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida p-8">
            <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
              <Ticket className="h-12 w-12 text-rovida-gold" />
              <p>{t('no permission view violation tickets', { ns: 'common' })}</p>
            </div>
          </Card>
        )}
      </div>

      {/* Display RulesTable if on /rules/catalog */}
      {location.pathname === '/rules/catalog' && canRead('Rules') && hasRules && (
        <div className="card-rovida p-4 mt-4">
          <RulesTable rules={mockRules} />
        </div>
      )}
      {location.pathname === '/rules/catalog' && canRead('Rules') && !hasRules && (
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
      )}
    </div>
  );
};

export default Rules;