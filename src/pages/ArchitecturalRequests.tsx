import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LayoutTemplate, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockArchitecturalRequests } from '@/data/mock-architectural-requests';
import RequestsTable from '@/components/architectural/RequestsTable';
import { toast } from 'sonner'; // Import toast for actions
import { useAuth } from '@/hooks/useAuth'; // Import useAuth
import { Link } from 'react-router-dom'; // Import Link

const ArchitecturalRequests = () => {
  const { t } = useTranslation(['architectural_requests', 'common']); // Ensure 'architectural_requests' and 'common' namespaces are loaded
  const { canRead, canCreate } = useAuth();

  const breadcrumbItems = [
    { label: t('home', { ns: 'common' }), href: '/' },
    { label: t('architectural requests', { ns: 'architectural_requests' }), href: '/architectural-requests' },
  ];

  const hasRequests = mockArchitecturalRequests.length > 0;

  const handleSubmitNewRequest = () => {
    // This will now navigate to the new form page
    // toast.info(t('submit new request action', { ns: 'architectural_requests' })); // Placeholder action with toast
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('architectural requests', { ns: 'architectural_requests' })}</h1>
        {canCreate('Architectural Requests') && (
          <Link to="/board/architectural-requests/new">
            <Button className="btn-primary" onClick={handleSubmitNewRequest}>
              <PlusCircle className="mr-2 h-4 w-4" /> {t('submit new request', { ns: 'architectural_requests' })}
            </Button>
          </Link>
        )}
      </header>
      <p className="text-rovida-slate-green-gray">{t('manage architectural change requests', { ns: 'architectural_requests' })}</p>

      {canRead('Architectural Requests') ? (
        hasRequests ? (
          <div className="card-rovida p-4"> {/* Wrapped content in card-rovida */}
            <RequestsTable requests={mockArchitecturalRequests} />
          </div>
        ) : (
          <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
            <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
              <LayoutTemplate className="h-12 w-12 text-rovida-gold" />
              <p>{t('architectural requests managed here', { ns: 'architectural_requests' })}</p>
              {canCreate('Architectural Requests') && (
                <Link to="/board/architectural-requests/new">
                  <Button variant="outline" className="mt-4 btn-secondary" onClick={handleSubmitNewRequest}>
                    <PlusCircle className="mr-2 h-4 w-4" /> {t('submit first request', { ns: 'architectural_requests' })}
                  </Button>
                </Link>
              )}
            </div>
          </Card>
        )
      ) : (
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <LayoutTemplate className="h-12 w-12 text-rovida-gold" />
            <p>{t('no permission view architectural requests', { ns: 'common' })}</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ArchitecturalRequests;