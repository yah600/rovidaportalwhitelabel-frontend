import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Issue } from '@/data/mock-issues';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
  title: string;
  issues: Issue[];
  statusFilter: Issue['status'];
}

const KanbanColumn = ({ title, issues, statusFilter }: KanbanColumnProps) => {
  const { t } = useTranslation(['issues', 'common']); // Specify namespaces

  const filteredIssues = issues.filter(issue => issue.status === statusFilter);

  const getPriorityColor = (priority: Issue['priority']) => {
    switch (priority) {
      case 'Critical':
        return 'bg-rovida-error text-white';
      case 'High':
        return 'bg-rovida-warning text-white';
      case 'Medium':
        return 'bg-rovida-gold text-white';
      case 'Low':
        return 'bg-rovida-success text-white';
      default:
        return 'bg-rovida-soft-gray text-rovida-near-black';
    }
  };

  return (
    <div className="flex flex-col w-full min-w-[280px] max-w-[350px] bg-rovida-soft-gray/50 backdrop-blur-xl rounded-lg p-3 shadow-subtle border border-rovida-soft-gray">
      <h3 className="text-lg font-semibold mb-4 px-2 text-rovida-navy">{title} ({filteredIssues.length})</h3>
      <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar">
        {filteredIssues.length > 0 ? (
          filteredIssues.map((issue) => (
            <Card key={issue.id} className="cursor-grab active:cursor-grabbing card-rovida"> {/* Using card-rovida */}
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  <Link to={`/issues/${issue.id}`} className="hover:underline text-primary">
                    {issue.title}
                  </Link>
                </CardTitle>
                <CardDescription className="text-xs text-rovida-slate-green-gray">{issue.unit}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Badge className={cn("text-xs", getPriorityColor(issue.priority))}>{t(issue.priority.toLowerCase(), { ns: 'common' })}</Badge>
                  <span className="text-rovida-slate-green-gray text-xs">{format(issue.createdAt, 'MMM dd')}</span>
                </div>
                <p className="text-rovida-slate-green-gray text-xs line-clamp-2">{issue.description}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-rovida-slate-green-gray text-sm text-center p-4">{t('no issues in column', { ns: 'issues' })}</div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;