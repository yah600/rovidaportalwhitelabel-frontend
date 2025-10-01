import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Issues = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-1 flex-col gap-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">{t('issues')}</h1>
        <Link to="/issues/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> {t('create_first_ticket')}
          </Button>
        </Link>
      </header>

      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            {t('no_tickets')}
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start by creating a new incident.
          </p>
          <Link to="/issues/new">
            <Button className="mt-4">
              <PlusCircle className="mr-2 h-4 w-4" /> {t('create_first_ticket')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Issues;