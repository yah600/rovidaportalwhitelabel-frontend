import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockIssues, Issue } from '@/data/mock-issues';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';

const RecentIssues = () => {
  const { t } = useTranslation();
  const recentIssues = mockIssues.slice(0, 3); // Display up to 3 recent issues

  const getStatusBadgeVariant = (status: Issue['status']) => {
    switch (status) {
      case 'Open':
        return 'default';
      case 'In Progress':
        return 'secondary';
      case 'Closed':
        return 'outline';
      case 'Pending':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <Card className="col-span-2 lg:col-span-1 card-rovida">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-rovida-navy">{t('open_issues')}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">Your most recent incidents.</CardDescription>
        </div>
        <Link to="/issues" className="text-sm link-rovida flex items-center gap-1">
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </CardHeader>
      <CardContent>
        {recentIssues.length > 0 ? (
          <div className="space-y-4">
            {recentIssues.map((issue) => (
              <div key={issue.id} className="flex items-center justify-between">
                <div>
                  <Link to={`/issues/${issue.id}`} className="font-medium link-rovida">
                    {issue.title}
                  </Link>
                  <p className="text-sm text-rovida-slate-green-gray">
                    {issue.unit} - {format(issue.createdAt, 'MMM dd')}
                  </p>
                </div>
                <Badge variant={getStatusBadgeVariant(issue.status)}>{issue.status}</Badge>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-rovida-slate-green-gray">{t('no_tickets')}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentIssues;