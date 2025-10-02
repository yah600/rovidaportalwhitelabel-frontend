import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LayoutGrid, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockPortfolioProperties } from '@/data/mock-portfolio';
import PortfolioTable from '@/components/settings/PortfolioTable';

const SettingsPortfolio = () => {
  const { t } = useTranslation();

  const hasProperties = mockPortfolioProperties.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('portfolio management')}</h1>
        <Button className="btn-primary">
          <PlusCircle className="mr-2 h-4 w-4" /> {t('add new property')}
        </Button>
      </header>
      <p className="text-rovida-slate-green-gray">{t('manage all properties portfolio')}</p>

      {hasProperties ? (
        <PortfolioTable properties={mockPortfolioProperties} />
      ) : (
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <LayoutGrid className="h-12 w-12 text-rovida-gold" />
            <p>{t('portfolio managed here')}</p>
            <Button variant="outline" className="mt-4 btn-secondary">
              <PlusCircle className="mr-2 h-4 w-4" /> {t('add first property')}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SettingsPortfolio;