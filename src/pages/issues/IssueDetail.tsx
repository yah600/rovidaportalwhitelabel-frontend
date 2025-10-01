import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import RightPanel from '@/components/RightPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const IssueDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const breadcrumbItems = [
    { label: t('issues'), href: '/issues' },
    { label: `Incident ${id}`, href: `/issues/${id}` },
  ];

  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 gap-4 p-4 lg:p-6">
        <BreadcrumbNav items={breadcrumbItems} />
        <header className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <h1 className="text-2xl font-semibold md:text-3xl">{t('issues')} Detail: {id}</h1>
          <div className="flex items-center gap-2">
            {/* Placeholder for Status/Priority Badges */}
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">Open</span>
            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-700/10">High Priority</span>
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
            <div className="rounded-lg border border-dashed shadow-sm p-6">
              <p className="text-muted-foreground">Overview for incident {id} coming soon!</p>
            </div>
          </TabsContent>
          <TabsContent value="timeline" className="mt-4">
            <div className="rounded-lg border border-dashed shadow-sm p-6">
              <p className="text-muted-foreground">Timeline for incident {id} coming soon!</p>
            </div>
          </TabsContent>
          <TabsContent value="attachments" className="mt-4">
            <div className="rounded-lg border border-dashed shadow-sm p-6">
              <p className="text-muted-foreground">Attachments for incident {id} coming soon!</p>
            </div>
          </TabsContent>
          <TabsContent value="participants" className="mt-4">
            <div className="rounded-lg border border-dashed shadow-sm p-6">
              <p className="text-muted-foreground">Participants for incident {id} coming soon!</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <RightPanel className="w-[300px] xl:w-[350px]">
        <h3 className="text-lg font-semibold mb-4">Contextual Information</h3>
        <p className="text-muted-foreground">Checklists and AI suggestions will appear here.</p>
      </RightPanel>
    </div>
  );
};

export default IssueDetail;