import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LayoutGrid, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockPortfolioProperties } from '@/data/mock-portfolio';
import PortfolioTable from '@/components/settings/PortfolioTable';
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

const SettingsPortfolio = () => {
  const { t } = useTranslation(['finance', 'common', 'settings']); // Ensure 'finance', 'common', 'settings' namespaces are loaded
  const { canRead, canCreate } = useAuth();

  const hasProperties = mockPortfolioProperties.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('portfolio management', { ns: 'settings' })}</h1>
        {canCreate('Portfolio Management') && (
          <Button className="btn-primary">
            <PlusCircle className="mr-2 h-4 w-4" /> {t('add new property', { ns: 'settings' })}
          </Button>
        )}
      </header>
      <p className="text-rovida-slate-green-gray">{t('manage all properties portfolio', { ns: 'settings' })}</p>

      {canRead('Portfolio Management') ? (
        hasProperties ? (
          <div className="card-rovida p-4"> {/* Wrapped content in card-rovida */}
            <PortfolioTable properties={mockPortfolioProperties} />
          </div>
        ) : (
          <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
            <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
              <LayoutGrid className="h-12 w-12 text-rovida-gold" />
              <p>{t('portfolio managed here', { ns: 'settings' })}</p>
              {canCreate('Portfolio Management') && (
                <Button variant="outline" className="mt-4 btn-secondary">
                  <PlusCircle className="mr-2 h-4 w-4" /> {t('add first property', { ns: 'settings' })}
                </Button>
              )}
            </div>
          </Card>
        )
      ) : (
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <LayoutGrid className="h-12 w-12 text-rovida-gold" />
            <p>{t('no permission view portfolio', { ns: 'common' })}</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SettingsPortfolio;