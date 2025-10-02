import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import InboxTable from '@/components/documents/InboxTable';
import { mockInboxDocuments } from '@/data/mock-inbox-documents';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card'; // Import Card for the empty state
import { toast } from 'sonner'; // Import toast for actions

const DocumentsInbox = () => {
  const { t } = useTranslation(['documents', 'common']); // Ensure 'documents' and 'common' namespaces are loaded
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
        <Button className="btn-primary" onClick={handleUploadToInbox}>
          <PlusCircle className="mr-2 h-4 w-4" /> {t('upload to inbox', { ns: 'documents' })}
        </Button>
      </header>

      {hasInboxDocuments ? (
        <InboxTable documents={mockInboxDocuments} />
      ) : (
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight text-rovida-near-black">
              {t('no new documents in inbox', { ns: 'documents' })}
            </h3>
            <p className="text-sm text-rovida-slate-green-gray">
              {t('incoming documents appear here', { ns: 'documents' })}
            </p>
            <Button className="mt-4 btn-primary" onClick={handleUploadToInbox}>
              <PlusCircle className="mr-2 h-4 w-4" /> {t('upload to inbox', { ns: 'documents' })}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default DocumentsInbox;