import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileText } from 'lucide-react'; // Imported FileText
import { Link } from 'react-router-dom';
import { mockDocuments } from '@/mocks';
import DocumentsTable from '@/components/documents/DocumentsTable';
import { Card } from '@/components/ui/card'; // Import Card for the empty state
import { toast } from 'sonner'; // Import toast for actions
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

const DocumentsRegistry = () => {
  const { t } = useTranslation(['documents', 'common']); // Ensure 'documents' and 'common' namespaces are loaded
  const { canRead, canCreate } = useAuth();

  const breadcrumbItems = [
    { label: t('documents', { ns: 'documents' }), href: '/documents' },
    { label: t('registry', { ns: 'documents' }), href: '/documents/registry' },
  ];

  const hasDocuments = mockDocuments.length > 0;

  const handleUploadDocument = () => {
    toast.info(t('upload document action', { ns: 'documents' })); // Placeholder action with toast
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('documents', { ns: 'documents' })} {t('registry', { ns: 'documents' })}</h1>
        {canCreate('Documents') && (
          <Button className="btn-primary" onClick={handleUploadDocument}>
            <PlusCircle className="mr-2 h-4 w-4" /> {t('upload document', { ns: 'documents' })}
          </Button>
        )}
      </header>

      {canRead('Documents') ? (
        hasDocuments ? (
          <div className="card-rovida p-4"> {/* Wrapped content in card-rovida */}
            <DocumentsTable documents={mockDocuments} />
          </div>
        ) : (
          <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight text-rovida-near-black">
                {t('no documents found', { ns: 'documents' })}
              </h3>
              <p className="text-sm text-rovida-slate-green-gray">
                {t('start by uploading new document', { ns: 'documents' })}
              </p>
              {canCreate('Documents') && (
                <Button className="mt-4 btn-primary" onClick={handleUploadDocument}>
                  <PlusCircle className="mr-2 h-4 w-4" /> {t('upload document', { ns: 'documents' })}
                </Button>
              )}
            </div>
          </Card>
        )
      ) : (
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida">
          <div className="flex flex-col items-center gap-1 text-center">
            <FileText className="h-12 w-12 text-rovida-gold" />
            <p>{t('no permission view documents', { ns: 'common' })}</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default DocumentsRegistry;