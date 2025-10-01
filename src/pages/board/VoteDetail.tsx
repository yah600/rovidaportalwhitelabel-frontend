import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash2, BarChart2, CheckCircle, XCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockVotes, Vote } from '@/data/mock-votes';
import { format } from 'date-fns';

const BoardVoteDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const vote: Vote | undefined = mockVotes.find((v) => v.id === id);

  if (!vote) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-muted-foreground">Vote not found.</p>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: t('board'), href: '/board' },
    { label: 'Votes', href: '/board/votes' },
    { label: `Vote ${vote.id}`, href: `/board/votes/${vote.id}` },
  ];

  const getStatusBadgeVariant = (status: Vote['status']) => {
    switch (status) {
      case 'Open':
        return 'default';
      case 'Closed':
        return 'outline';
      case 'Pending':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{vote.title}</h1>
        <div className="flex items-center gap-2">
          <Badge variant={getStatusBadgeVariant(vote.status)}>{vote.status}</Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white/80 backdrop-blur-xl border-rovida-soft-gray text-rovida-near-black">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-rovida-soft-gray" />
              <DropdownMenuItem className="hover:bg-rovida-soft-gray">
                <Edit className="mr-2 h-4 w-4" /> Edit Vote
              </DropdownMenuItem>
              {vote.status === 'Open' && (
                <DropdownMenuItem className="hover:bg-rovida-soft-gray">
                  <CheckCircle className="mr-2 h-4 w-4" /> Close Vote
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="text-destructive hover:bg-rovida-soft-gray">
                <Trash2 className="mr-2 h-4 w-4" /> Delete Vote
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Vote Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="font-medium">ID:</div>
            <div>{vote.id}</div>
            <div className="font-medium">Status:</div>
            <div>{vote.status}</div>
            <div className="font-medium">Due Date:</div>
            <div>{format(vote.dueDate, 'MMM dd, yyyy')}</div>
            <div className="font-medium">Created At:</div>
            <div>{format(vote.createdAt, 'MMM dd, yyyy HH:mm')}</div>
          </div>
          <Separator />
          <div>
            <h4 className="font-medium mb-2">Description:</h4>
            <p className="text-muted-foreground">{vote.description}</p>
          </div>
          {vote.results && (
            <>
              <Separator />
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2"><BarChart2 className="h-4 w-4" /> Results:</h4>
                <div className="grid grid-cols-3 gap-2 text-muted-foreground">
                  <div className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-green-500" /> Yes: {vote.results.yes}</div>
                  <div className="flex items-center gap-1"><XCircle className="h-4 w-4 text-red-500" /> No: {vote.results.no}</div>
                  <div className="flex items-center gap-1">Abstain: {vote.results.abstain}</div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BoardVoteDetail;