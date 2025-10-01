import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, UploadCloud, Mail, ArrowRight } from 'lucide-react';
import { mockDocuments } from '@/data/mock-documents';
import { mockInboxDocuments } from '@/data/mock-inbox-documents'; // Import mockInboxDocuments
import { format } from 'date-fns';

const Documents = () => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { label: t('documents'), href: '/documents' },
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
      <h1 className="text-2xl font-semibold md:text-3xl">{t('documents')} Overview</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Documents Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDocuments}</div>
            <p className="text-xs text-muted-foreground">All files in your registry</p>
            <Link to="/documents/registry" className="mt-2 inline-flex items-center text-sm text-primary hover:underline">
              View Registry <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        {/* Recent Uploads Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Uploads</CardTitle>
            <UploadCloud className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {recentUploads.length > 0 ? (
              <div className="text-2xl font-bold">{format(recentUploads[0].uploadedAt, 'MMM dd')}</div>
            ) : (
              <div className="text-2xl font-bold">N/A</div>
            )}
            <p className="text-xs text-muted-foreground">{recentUploads.length} documents recently added</p>
            <Link to="/documents/registry" className="mt-2 inline-flex items-center text-sm text-primary hover:underline">
              View Recent <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        {/* Documents Needing Review Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents Inbox</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documentsNeedingReview} New</div>
            <p className="text-xs text-muted-foreground">Files awaiting your attention</p>
            <Link to="/documents/inbox" className="mt-2 inline-flex items-center text-sm text-primary hover:underline">
              Go to Inbox <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-4 p-8">
        <p className="text-muted-foreground">More detailed document analytics and management tools coming soon!</p>
      </div>
    </div>
  );
};

export default Documents;