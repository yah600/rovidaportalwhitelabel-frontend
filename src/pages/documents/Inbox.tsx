import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import InboxTable from '@/components/documents/InboxTable';
import { mockInboxDocuments } from '@/data/mock-inbox-documents';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DocumentsInbox = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('documents'), href: '/documents' },
    { label: 'Inbox', href: '/documents/inbox' },
  ];

  const hasInboxDocuments = mockInboxDocuments.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">{t('documents')} Inbox</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Upload to Inbox
        </Button>
      </header>

      {hasInboxDocuments ? (
        <InboxTable documents={mockInboxDocuments} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              No new documents in your inbox.
            </h3>
            <p className="text-sm text-muted-foreground">
              Incoming documents will appear here.
            </p>
            <Button className="mt-4">
              <PlusCircle className="mr-2 h-4 w-4" /> Upload to Inbox
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsInbox;