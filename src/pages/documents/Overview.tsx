import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, UploadCloud, Mail, ArrowRight } from 'lucide-react';
import { mockDocuments } from '@/data/mock-documents';
import { mockInboxDocuments } from '@/data/mock-inbox-documents';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

const DocumentsOverview = () => {
  const { t } = useTranslation(['documents', 'common']); // Ensure 'documents' and 'common' namespaces are loaded
  const { canRead } = useAuth();

  const breadcrumbItems = [
    { label: t('documents', { ns: 'documents' }), href: '/documents' },
  ];

  // Calculate summary data
  const totalDocuments = mockDocuments.length;
  const recentUploads = mockDocuments.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime()).slice(0, 3);
  
  // Dynamically calculate documents needing review
  const documentsNeedingReview = mockInboxDocuments.filter(
    doc => doc.status === 'New' || doc.status === 'Action Required'
  ).length;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('documents', { ns: 'documents' })} {t('overview', { ns: 'common' })}</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Documents Card */}
        {canRead('Documents') && (
          <Card className="card-rovida">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-rovida-navy">{t('total documents', { ns: 'documents' })}</CardTitle>
              <FileText className="h-4 w-4 text-rovida-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-rovida-near-black">{totalDocuments}</div>
              <p className="text-xs text-rovida-slate-green-gray">{t('all files in registry', { ns: 'documents' })}</p>
              <Link to="/documents/registry" className="mt-2 inline-flex items-center text-sm link-rovida">
                {t('view registry', { ns: 'documents' })} <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Recent Uploads Card */}
        {canRead('Documents') && (
          <Card className="card-rovida">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-rovida-navy">{t('recent uploads', { ns: 'documents' })}</CardTitle>
              <UploadCloud className="h-4 w-4 text-rovida-gold" />
            </CardHeader>
            <CardContent>
              {recentUploads.length > 0 ? (
                <div className="text-2xl font-bold text-rovida-near-black">{format(recentUploads[0].uploadedAt, 'MMM dd')}</div>
              ) : (
                <div className="text-2xl font-bold text-rovida-near-black">N/A</div>
              )}
              <p className="text-xs text-rovida-slate-green-gray">{recentUploads.length} {t('documents recently added', { ns: 'documents' })}</p>
              <Link to="/documents/registry" className="mt-2 inline-flex items-center text-sm link-rovida">
                {t('view recent', { ns: 'documents' })} <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Documents Needing Review Card */}
        {canRead('Documents') && (
          <Card className="card-rovida">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-rovida-navy">{t('documents inbox', { ns: 'documents' })}</CardTitle>
              <Mail className="h-4 w-4 text-rovida-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-rovida-near-black">{documentsNeedingReview} {t('new', { ns: 'documents' })}</div>
              <p className="text-xs text-rovida-slate-green-gray">{t('files awaiting attention', { ns: 'documents' })}</p>
              <Link to="/documents/inbox" className="mt-2 inline-flex items-center text-sm link-rovida">
                {t('go to inbox', { ns: 'documents' })} <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
        <p className="text-rovida-slate-green-gray">{t('more detailed document analytics soon', { ns: 'documents' })}</p>
      </Card>
    </div>
  );
};

export default DocumentsOverview;