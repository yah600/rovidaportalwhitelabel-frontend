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

const DocumentDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const document: Document | undefined = mockDocuments.find((doc) => doc.id === id);

  if (!document) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-rovida-slate-green-gray">{t('document_not_found')}</p>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: t('documents'), href: '/documents' },
    { label: t('registry'), href: '/documents/registry' },
    { label: `${t('document')} ${document.id}`, href: `/documents/${document.id}` },
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
                <span className="sr-only">{t('actions')}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white/80 backdrop-blur-xl border-rovida-soft-gray text-rovida-near-black">
              <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-rovida-soft-gray" />
              <DropdownMenuItem className="hover:bg-rovida-soft-gray">
                <Edit className="mr-2 h-4 w-4" /> {t('edit_document')}
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href={document.url} target="_blank" rel="noopener noreferrer" className="flex items-center hover:bg-rovida-soft-gray">
                  <Download className="mr-2 h-4 w-4" /> {t('download')}
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Card className="card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('document_details')}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2 text-rovida-near-black">
            <div className="font-medium">{t('id')}:</div>
            <div>{document.id}</div>
            <div className="font-medium">{t('category')}:</div>
            <div>{document.category}</div>
            <div className="font-medium">{t('uploaded_by')}:</div>
            <div>{document.uploadedBy}</div>
            <div className="font-medium">{t('uploaded_at')}:</div>
            <div>{format(document.uploadedAt, 'MMM dd, yyyy HH:mm')}</div>
          </div>
          <Separator className="bg-rovida-soft-gray" />
          <div>
            <h4 className="font-medium mb-2 text-rovida-navy">{t('preview')}:</h4>
            <div className="w-full h-64 bg-rovida-soft-gray flex items-center justify-center rounded-md overflow-hidden">
              {/* Placeholder for document preview */}
              {document.type === 'Image' ? (
                <img src={document.url} alt="Document Preview" className="max-w-full max-h-full object-contain" />
              ) : (
                <img src="/public/placeholder.svg" alt="Document Preview" className="max-w-full max-h-full object-contain" />
              )}
            </div>
            <p className="text-sm text-rovida-slate-green-gray mt-2">
              {t('placeholder_preview_text')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentDetail;