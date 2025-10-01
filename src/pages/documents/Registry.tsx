import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockDocuments } from '@/data/mock-documents';
import DocumentsTable from '@/components/documents/DocumentsTable';

const Documents = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('documents'), href: '/documents' },
    { label: 'Registry', href: '/documents' },
  ];

  const hasDocuments = mockDocuments.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('documents')} Registry</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Upload Document
        </Button>
      </header>

      {hasDocuments ? (
        <DocumentsTable documents={mockDocuments} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              No documents found.
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start by uploading a new document.
            </p>
            <Button className="mt-4">
              <PlusCircle className="mr-2 h-4 w-4" /> Upload Document
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;