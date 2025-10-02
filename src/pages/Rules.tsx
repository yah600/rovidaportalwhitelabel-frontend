import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Gavel, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockRules } from '@/data/mock-rules';
import RulesTable from '@/components/rules/RulesTable';

const Rules = () => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { label: t('home'), href: '/' },
    { label: t('rules_and_violations'), href: '/rules' },
  ];

  const hasRules = mockRules.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('rules_and_violations')}</h1>
        <Button className="btn-primary">
          <PlusCircle className="mr-2 h-4 w-4" /> {t('add_new_rule')}
        </Button>
      </header>
      <p className="text-rovida-slate-green-gray">{t('manage_building_rules_violations')}</p>

      {hasRules ? (
        <RulesTable rules={mockRules} />
      ) : (
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <Gavel className="h-12 w-12 text-rovida-gold" />
            <p>{t('rules_violations_managed_here')}</p>
            <Button variant="outline" className="mt-4 btn-secondary">
              <PlusCircle className="mr-2 h-4 w-4" /> {t('add_first_rule')}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Rules;