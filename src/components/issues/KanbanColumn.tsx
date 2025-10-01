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
  const { t } = useTranslation();

  const filteredIssues = issues.filter(issue => issue.status === statusFilter);

  const getPriorityColor = (priority: Issue['priority']) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-500 text-white';
      case 'High':
        return 'bg-orange-500 text-white';
      case 'Medium':
        return 'bg-yellow-500 text-black';
      case 'Low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col w-full min-w-[280px] max-w-[350px] bg-muted/40 rounded-lg p-3 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 px-2">{title} ({filteredIssues.length})</h3>
      <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar">
        {filteredIssues.length > 0 ? (
          filteredIssues.map((issue) => (
            <Card key={issue.id} className="cursor-grab active:cursor-grabbing">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  <Link to={`/issues/${issue.id}`} className="hover:underline">
                    {issue.title}
                  </Link>
                </CardTitle>
                <CardDescription className="text-xs">{issue.unit}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Badge className={cn("text-xs", getPriorityColor(issue.priority))}>{issue.priority}</Badge>
                  <span className="text-muted-foreground text-xs">{format(issue.createdAt, 'MMM dd')}</span>
                </div>
                <p className="text-muted-foreground text-xs line-clamp-2">{issue.description}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-muted-foreground text-sm text-center p-4">No issues in this column.</div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;