import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, ArrowRight } from 'lucide-react'; // Added FileText and ArrowRight imports
import { format } from 'date-fns';

interface Document {
  id: string;
  title: string;
  type: string;
  uploadedAt: Date;
}

const mockDocuments: Document[] = [
  { id: 'DOC001', title: 'Annual Budget 2024', type: 'PDF', uploadedAt: new Date('2024-01-15T10:00:00Z') },
  { id: 'DOC002', title: 'Building A Renovation Plan', type: 'PDF', uploadedAt: new Date('2024-02-20T14:30:00Z') },
  { id: 'DOC003', title: 'Emergency Contact List', type: 'Excel', uploadedAt: new Date('2024-03-01T09:00:00Z') },
];

const RecentDocuments = () => {
  const { t } = useTranslation();
  const recentDocuments = mockDocuments.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime()).slice(0, 3);

  return (
    <Card className="col-span-2 xl:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Latest Documents</CardTitle>
          <CardDescription>Recently added or updated documents.</CardDescription>
        </div>
        <Link to="/documents/registry" className="text-sm text-primary hover:underline flex items-center gap-1">
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </CardHeader>
      <CardContent>
        {recentDocuments.length > 0 ? (
          <div className="space-y-4">
            {recentDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Link to={`/documents/${doc.id}`} className="font-medium hover:underline">
                    {doc.title}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {doc.type} - {format(doc.uploadedAt, 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No recent documents.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentDocuments;