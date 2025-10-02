import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LayoutTemplate, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockArchitecturalRequests } from '@/data/mock-architectural-requests';
import RequestsTable from '@/components/architectural/RequestsTable';
import { toast } from 'sonner'; // Import toast for actions

const ArchitecturalRequests = () => {
  const { t } = useTranslation(['architectural_requests', 'common']); // Ensure 'architectural_requests' and 'common' namespaces are loaded

  const breadcrumbItems = [
    { label: t('home', { ns: 'common' }), href: '/' },
    { label: t('architectural requests', { ns: 'architectural_requests' }), href: '/architectural-requests' },
  ];

  const hasRequests = mockArchitecturalRequests.length > 0;

  const handleSubmitNewRequest = () => {
    toast.info(t('submit new request action', { ns: 'architectural_requests' })); // Placeholder action with toast
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('architectural requests', { ns: 'architectural_requests' })}</h1>
        <Button className="btn-primary" onClick={handleSubmitNewRequest}>
          <PlusCircle className="mr-2 h-4 w-4" /> {t('submit new request', { ns: 'architectural_requests' })}
        </Button>
      </header>
      <p className="text-rovida-slate-green-gray">{t('manage architectural change requests', { ns: 'architectural_requests' })}</p>

      {hasRequests ? (
        <RequestsTable requests={mockArchitecturalRequests} />
      ) : (
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <LayoutTemplate className="h-12 w-12 text-rovida-gold" />
            <p>{t('architectural requests managed here', { ns: 'architectural_requests' })}</p>
            <Button variant="outline" className="mt-4 btn-secondary" onClick={handleSubmitNewRequest}>
              <PlusCircle className="mr-2 h-4 w-4" /> {t('submit first request', { ns: 'architectural_requests' })}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ArchitecturalRequests;