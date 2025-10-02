import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import InboxTable from '@/components/documents/InboxTable';
import { mockInboxDocuments } from '@/mocks';
import { PlusCircle, Mail } from 'lucide-react'; // Imported Mail
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card'; // Import Card for the empty state
import { toast } from 'sonner'; // Import toast for actions
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

const DocumentsInbox = () => {
  const { t } = useTranslation(['documents', 'common']); // Ensure 'documents' and 'common' namespaces are loaded
  const { canRead, canCreate } = useAuth();

  const breadcrumbItems = [
    { label: t('documents', { ns: 'documents' }), href: '/documents' },
    { label: t('inbox', { ns: 'documents' }), href: '/documents/inbox' },
  ];

  const hasInboxDocuments = mockInboxDocuments.length > 0;

  const handleUploadToInbox = () => {
    toast.info(t('upload to inbox action', { ns: 'documents' })); // Placeholder action with toast
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('documents', { ns: 'documents' })} {t('inbox', { ns: 'documents' })}</h1>
        {canCreate('Documents') && (
          <Button className="btn-primary" onClick={handleUploadToInbox}>
            <PlusCircle className="mr-2 h-4 w-4" /> {t('upload to inbox', { ns: 'documents' })}
          </Button>
        )}
      </header>

      {canRead('Documents') ? (
        hasInboxDocuments ? (
          <div className="card-rovida p-4"> {/* Wrapped content in card-rovida */}
            <InboxTable documents={mockInboxDocuments} />
          </div>
        ) : (
          <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight text-rovida-near-black">
                {t('no new documents in inbox', { ns: 'documents' })}
              </h3>
              <p className="text-sm text-rovida-slate-green-gray">
                {t('incoming documents appear here', { ns: 'documents' })}
              </p>
              {canCreate('Documents') && (
                <Button className="mt-4 btn-primary" onClick={handleUploadToInbox}>
                  <PlusCircle className="mr-2 h-4 w-4" /> {t('upload to inbox', { ns: 'documents' })}
                </Button>
              )}
            </div>
          </Card>
        )
      ) : (
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida">
          <div className="flex flex-col items-center gap-1 text-center">
            <Mail className="h-12 w-12 text-rovida-gold" />
            <p>{t('no permission view inbox', { ns: 'common' })}</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default DocumentsInbox;