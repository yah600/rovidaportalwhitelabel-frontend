import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import RightPanel from '@/components/RightPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, FileText, User, Clock, Paperclip, CheckCircle, XCircle, AlertCircle, Loader, MessageSquareText, PlusCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { mockIssues, Issue, IssueTimelineEvent, IssueAttachment, IssueParticipant } from '@/data/mock-issues';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const IssueDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const issue: Issue | undefined = mockIssues.find((issue) => issue.id === id);

  if (!issue) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-muted-foreground">Incident not found.</p>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: t('issues'), href: '/issues' },
    { label: `Incident ${issue.id}`, href: `/issues/${issue.id}` },
  ];

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

  const getPriorityBadgeColor = (priority: Issue['priority']) => {
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

  const getTimelineIcon = (type: IssueTimelineEvent['type']) => {
    switch (type) {
      case 'comment':
        return <MessageSquareText className="h-4 w-4 text-muted-foreground" />;
      case 'status_change':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'assignment':
        return <User className="h-4 w-4 text-blue-500" />;
      case 'attachment_added':
        return <Paperclip className="h-4 w-4 text-purple-500" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 gap-4 p-4 lg:p-6">
        <BreadcrumbNav items={breadcrumbItems} />
        <header className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <h1 className="text-2xl font-semibold md:text-3xl">{issue.title}</h1>
          <div className="flex items-center gap-2">
            <Badge variant={getStatusBadgeVariant(issue.status)}>{issue.status}</Badge>
            <Badge className={getPriorityBadgeColor(issue.priority)}>{issue.priority}</Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Assign</DropdownMenuItem>
                <DropdownMenuItem>Change Status</DropdownMenuItem>
                <DropdownMenuItem>Add Attachment</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Delete Incident</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <Tabs defaultValue="overview" className="flex-1">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="attachments">Attachments</TabsTrigger>
            <TabsTrigger value="participants">Participants</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Incident Details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-medium">ID:</div>
                  <div>{issue.id}</div>
                  <div className="font-medium">Unit:</div>
                  <div>{issue.unit}</div>
                  <div className="font-medium">Type:</div>
                  <div>{issue.type}</div>
                  <div className="font-medium">Reporter:</div>
                  <div>{issue.reporter}</div>
                  <div className="font-medium">Assignee:</div>
                  <div>{issue.assignee || 'Unassigned'}</div>
                  <div className="font-medium">Created At:</div>
                  <div>{format(issue.createdAt, 'MMM dd, yyyy HH:mm')}</div>
                  <div className="font-medium">Last Updated:</div>
                  <div>{format(issue.updatedAt, 'MMM dd, yyyy HH:mm')}</div>
                  {issue.resolvedAt && (
                    <>
                      <div className="font-medium">Resolved At:</div>
                      <div>{format(issue.resolvedAt, 'MMM dd, yyyy HH:mm')}</div>
                    </>
                  )}
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Description:</h4>
                  <p className="text-muted-foreground">{issue.description}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="timeline" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Incident Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                {issue.timeline.length > 0 ? (
                  <ol className="relative border-l border-gray-200 dark:border-gray-700 ml-4">
                    {issue.timeline.map((event) => (
                      <li key={event.id} className="mb-6 ml-6">
                        <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-background ring-8 ring-background dark:bg-gray-700 dark:ring-gray-900">
                          {getTimelineIcon(event.type)}
                        </span>
                        <h3 className="flex items-center mb-1 text-lg font-semibold text-foreground">
                          {event.user}
                          <time className="block ml-2 text-sm font-normal leading-none text-muted-foreground">
                            {format(event.timestamp, 'MMM dd, yyyy HH:mm')}
                          </time>
                        </h3>
                        <p className="mb-4 text-base font-normal text-muted-foreground">{event.details}</p>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-muted-foreground">No timeline events for this incident.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="attachments" className="mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Attachments</CardTitle>
                <Button variant="outline" size="sm">
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Attachment
                </Button>
              </CardHeader>
              <CardContent>
                {issue.attachments.length > 0 ? (
                  <div className="grid gap-4">
                    {issue.attachments.map((attachment) => (
                      <div key={attachment.id} className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-3">
                          <Paperclip className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <a href={attachment.url} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
                              {attachment.name}
                            </a>
                            <p className="text-xs text-muted-foreground">
                              Uploaded by {attachment.uploadedBy} on {format(attachment.uploadedAt, 'MMM dd, yyyy')}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No attachments for this incident.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="participants" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Participants</CardTitle>
              </CardHeader>
              <CardContent>
                {issue.participants.length > 0 ? (
                  <div className="grid gap-4">
                    {issue.participants.map((participant) => (
                      <div key={participant.id} className="flex items-center gap-3 p-3 border rounded-md">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={`/avatars/${participant.id}.png`} alt={participant.name} />
                          <AvatarFallback>{participant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{participant.name}</p>
                          <p className="text-sm text-muted-foreground">{participant.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No participants for this incident.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <RightPanel className="w-[300px] xl:w-[350px]">
        <h3 className="text-lg font-semibold mb-4">Contextual Information</h3>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-md">Maintenance Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" /> Check unit access
              </li>
              <li className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" /> Diagnose issue
              </li>
              <li className="flex items-center gap-2">
                <Loader className="h-4 w-4 text-blue-500" /> Order parts
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-orange-500" /> Schedule follow-up
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-md">AI Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>- Suggest similar past incidents.</li>
              <li>- Recommend relevant knowledge base articles.</li>
              <li>- Propose optimal assignee based on workload.</li>
            </ul>
          </CardContent>
        </Card>
      </RightPanel>
    </div>
  );
};

export default IssueDetail;