import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Megaphone, MessageSquare, FileText, ArrowRight } from 'lucide-react';
import { mockAnnouncements } from '@/data/mock-announcements';
import AnimatedList from '@/components/AnimatedList'; // Import AnimatedList
import { format } from 'date-fns';

const Comms = () => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { label: t('communications'), href: '/comms' },
  ];

  // Calculate summary data
  const publishedAnnouncements = mockAnnouncements.filter(ann => ann.status === 'Published').length;
  const totalAnnouncements = mockAnnouncements.length;

  const recentAnnouncements = mockAnnouncements
    .filter(ann => ann.status === 'Published')
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, 5); // Get up to 5 most recent published announcements

  const handleAnnouncementSelect = (item: string | React.ReactNode, index: number) => {
    if (typeof item === 'string') {
      const selectedAnnouncement = recentAnnouncements[index];
      if (selectedAnnouncement) {
        // Navigate to the announcement detail page
        window.location.href = `/comms/announcements/${selectedAnnouncement.id}`;
      }
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('communications')} Overview</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Announcements Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Announcements</CardTitle>
            <Megaphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedAnnouncements} Published</div>
            <p className="text-xs text-muted-foreground">Total: {totalAnnouncements}</p>
            <Link to="/comms/announcements" className="mt-2 inline-flex items-center text-sm text-primary hover:underline">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        {/* Send Communication Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Send Communication</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Compose New</div>
            <p className="text-xs text-muted-foreground">Send messages to residents.</p>
            <Link to="/comms/send" className="mt-2 inline-flex items-center text-sm text-primary hover:underline">
              Go to Sender <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        {/* Templates Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Templates</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Manage Templates</div>
            <p className="text-xs text-muted-foreground">Create and edit message templates.</p>
            <Link to="/comms/templates" className="mt-2 inline-flex items-center text-sm text-primary hover:underline">
              View Templates <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Recent Announcements</CardTitle>
          <CardDescription>Latest published announcements.</CardDescription>
        </CardHeader>
        <CardContent className="h-64 overflow-hidden">
          {recentAnnouncements.length > 0 ? (
            <AnimatedList
              items={recentAnnouncements.map(ann => (
                <div className="flex flex-col">
                  <span className="font-medium">{ann.title}</span>
                  <span className="text-xs text-muted-foreground">{format(ann.publishedAt, 'MMM dd, yyyy')} - {ann.author}</span>
                </div>
              ))}
              onItemSelect={handleAnnouncementSelect}
              showGradients={true}
              enableArrowNavigation={true}
              displayScrollbar={false}
              itemClassName="hover:bg-rovida-soft-gray"
            />
          ) : (
            <div className="flex flex-1 items-center justify-center h-full">
              <p className="text-muted-foreground">No recent announcements.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Comms;