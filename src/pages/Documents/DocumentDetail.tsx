import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Download, FileText, FileSpreadsheet, FileImage, FileQuestion } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockDocuments, Document } from '@/data/mock-documents';
import { format } from 'date-fns';
import { toast } from 'sonner'; // Import toast for actions

const DocumentDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation(['documents', 'common']); // Ensure 'documents' and 'common' namespaces are loaded

  const document: Document | undefined = mockDocuments.find((doc) => doc.id === id);

  if (!document) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-rovida-slate-green-gray">{t('document not found', { ns: 'documents' })}</p>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: t('documents', { ns: 'documents' }), href: '/documents' },
    { label: t('registry', { ns: 'documents' }), href: '/documents/registry' },
    { label: `${t('document', { ns: 'documents' })} ${document.id}`, href: `/documents/${document.id}` },
  ];

  const getFileTypeIcon = (type: Document['type']) => {
    switch (type) {
      case 'PDF':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'Word':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'Excel':
        return <FileSpreadsheet className="h-5 w-5 text-green-500" />;
      case 'Image':
        return <FileImage className="h-5 w-5 text-purple-500" />;
      default:
        return <FileQuestion className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleEditDocument = () => {
    toast.info(t('edit document action', { ns: 'documents', id: document.id })); // Placeholder action with toast
  };

  const handleDownloadDocument = () => {
    toast.success(t('download document action', { ns: 'documents', title: document.title })); // Placeholder action with toast
    window.open(document.url, '_blank'); // Open the actual URL
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{document.title}</h1>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1 bg-rovida-soft-gray text-rovida-near-black">
            {getFileTypeIcon(document.type)} {document.type}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">{t('actions', { ns: 'common' })}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white/80 backdrop-blur-xl border-rovida-soft-gray text-rovida-near-black">
              <DropdownMenuLabel>{t('actions', { ns: 'common' })}</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-rovida-soft-gray" />
              <DropdownMenuItem className="hover:bg-rovida-soft-gray" onClick={handleEditDocument}>
                <Edit className="mr-2 h-4 w-4" /> {t('edit document', { ns: 'documents' })}
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <button onClick={handleDownloadDocument} className="flex items-center w-full text-left hover:bg-rovida-soft-gray">
                  <Download className="mr-2 h-4 w-4" /> {t('download', { ns: 'documents' })}
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Card className="card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('document details', { ns: 'documents' })}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2 text-rovida-near-black">
            <div className="font-medium">{t('id', { ns: 'common' })}:</div>
            <div>{document.id}</div>
            <div className="font-medium">{t('category', { ns: 'finance' })}:</div>
            <div>{document.category}</div>
            <div className="font-medium">{t('uploaded by', { ns: 'documents' })}:</div>
            <div>{document.uploadedBy}</div>
            <div className="font-medium">{t('uploaded at', { ns: 'documents' })}:</div>
            <div>{format(document.uploadedAt, 'MMM dd, yyyy HH:mm')}</div>
          </div>
          <Separator className="bg-rovida-soft-gray" />
          <div>
            <h4 className="font-medium mb-2 text-rovida-navy">{t('preview', { ns: 'documents' })}:</h4>
            <div className="w-full h-64 bg-rovida-soft-gray flex items-center justify-center rounded-md overflow-hidden">
              {/* Placeholder for document preview */}
              {document.type === 'Image' ? (
                <img src={document.url} alt="Document Preview" className="max-w-full max-h-full object-contain" />
              ) : (
                <img src="/public/placeholder.svg" alt="Document Preview" className="max-w-full max-h-full object-contain" />
              )}
            </div>
            <p className="text-sm text-rovida-slate-green-gray mt-2">
              {t('placeholder preview text', { ns: 'documents' })}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentDetail;