import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Gavel } from 'lucide-react';
import { mockViolationTickets } from '@/data/mock-violations';
import ViolationTicketsTable from '@/components/rules/ViolationTicketsTable';
import { useAuth } from '@/shared/rbac/useAuth';
import { toast } from 'sonner';

const ViolationTickets = () => {
  const { t } = useTranslation(['rules', 'common']);
  const { canRead, canCreate } = useAuth();

  const breadcrumbItems = [
    { label: t('rules and violations', { ns: 'rules' }), href: '/rules' },
    { label: t('violation tickets', { ns: 'rules' }), href: '/rules/violations' },
  ];

  const hasTickets = mockViolationTickets.length > 0;

  const handleCreateNewTicket = () => {
    toast.info(t('create new violation ticket action', { ns: 'rules' }));
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('violation tickets', { ns: 'rules' })}</h1>
        {canCreate('Rules - Violations') && (
          <Button className="btn-primary" onClick={handleCreateNewTicket}>
            <PlusCircle className="mr-2 h-4 w-4" /> {t('create new ticket', { ns: 'rules' })}
          </Button>
        )}
      </header>
      <p className="text-rovida-slate-green-gray">{t('track manage rule violations', { ns: 'rules' })}</p>

      {canRead('Rules - Violations') ? (
        hasTickets ? (
          <div className="card-rovida p-4">
            <ViolationTicketsTable tickets={mockViolationTickets} />
          </div>
        ) : (
          <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
            <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
              <Gavel className="h-12 w-12 text-rovida-gold" />
              <p>{t('no violation tickets found', { ns: 'rules' })}</p>
              {canCreate('Rules - Violations') && (
                <Button variant="outline" className="mt-4 btn-secondary" onClick={handleCreateNewTicket}>
                  <PlusCircle className="mr-2 h-4 w-4" /> {t('create first ticket', { ns: 'rules' })}
                </Button>
              )}
            </div>
          </Card>
        )
      ) : (
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <Gavel className="h-12 w-12 text-rovida-gold" />
            <p>{t('no permission view violation tickets', { ns: 'common' })}</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ViolationTickets;