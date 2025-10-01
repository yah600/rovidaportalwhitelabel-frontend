import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { mockDocuments, Document } from '@/data/mock-documents';

const RecentDocuments = () => {
  const { t } = useTranslation();
  const recentDocuments = mockDocuments.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime()).slice(0, 3);

  return (
    <Card className="col-span-2 xl:col-span-1 card-rovida">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-rovida-navy">Latest Documents</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">Recently added or updated documents.</CardDescription>
        </div>
        <Link to="/documents/registry" className="text-sm link-rovida flex items-center gap-1">
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </CardHeader>
      <CardContent>
        {recentDocuments.length > 0 ? (
          <div className="space-y-4">
            {recentDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-rovida-gold" />
                <div>
                  <Link to={`/documents/${doc.id}`} className="font-medium link-rovida">
                    {doc.title}
                  </Link>
                  <p className="text-sm text-rovida-slate-green-gray">
                    {doc.type} - {format(doc.uploadedAt, 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-rovida-slate-green-gray">No recent documents.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentDocuments;