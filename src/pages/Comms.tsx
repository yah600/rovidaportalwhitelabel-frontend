import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Megaphone, MessageSquare, FileText, ArrowRight } from 'lucide-react';
import { mockAnnouncements } from '@/data/mock-announcements';
import AnimatedList from '@/components/AnimatedList';
import { format } from 'date-fns';
import { toast } from 'sonner'; // Import toast for actions

const Comms = () => {
  const { t } = useTranslation(['communications', 'common']); // Ensure 'communications' and 'common' namespaces are loaded
  const navigate = useNavigate(); // Initialize useNavigate

  const breadcrumbItems = [
    { label: t('communications', { ns: 'communications' }), href: '/comms' },
  ];

  // Calculate summary data
  const publishedAnnouncements = mockAnnouncements.filter(ann => ann.status === 'Published').length;
  const totalAnnouncements = mockAnnouncements.length;

  const recentAnnouncements = mockAnnouncements
    .filter(ann => ann.status === 'Published')
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, 5); // Get up to 5 most recent published announcements

  const handleAnnouncementSelect = (item: string | React.ReactNode, index: number) => {
    if (typeof item === 'object' && 'id' in recentAnnouncements[index]) { // Check if it's an object with 'id'
      const selectedAnnouncement = recentAnnouncements[index];
      if (selectedAnnouncement) {
        navigate(`/comms/announcements/${selectedAnnouncement.id}`); // Navigate to the announcement detail page
      }
    } else {
      // Fallback for cases where item might be a string or not have an ID
      toast.info(t('selected announcement', { ns: 'communications', title: (item as any).props?.children[0]?.props?.children || item }));
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('communications', { ns: 'communications' })} {t('overview', { ns: 'common' })}</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Announcements Card */}
        <Card className="card-rovida">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-rovida-navy">{t('announcements', { ns: 'communications' })}</CardTitle>
            <Megaphone className="h-4 w-4 text-rovida-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rovida-near-black">{publishedAnnouncements} {t('published', { ns: 'communications' })}</div>
            <p className="text-xs text-rovida-slate-green-gray">{t('total', { ns: 'common' })}: {totalAnnouncements}</p>
            <Link to="/comms/announcements" className="mt-2 inline-flex items-center text-sm link-rovida">
              {t('view all', { ns: 'common' })} <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        {/* Send Communication Card */}
        <Card className="card-rovida">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-rovida-navy">{t('send communication', { ns: 'communications' })}</CardTitle>
            <MessageSquare className="h-4 w-4 text-rovida-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rovida-near-black">{t('compose new', { ns: 'communications' })}</div>
            <p className="text-xs text-rovida-slate-green-gray">{t('send messages residents', { ns: 'communications' })}</p>
            <Link to="/comms/send" className="mt-2 inline-flex items-center text-sm link-rovida">
              {t('go to sender', { ns: 'communications' })} <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        {/* Templates Card */}
        <Card className="card-rovida">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-rovida-navy">{t('templates', { ns: 'communications' })}</CardTitle>
            <FileText className="h-4 w-4 text-rovida-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rovida-near-black">{t('manage templates', { ns: 'communications' })}</div>
            <p className="text-xs text-rovida-slate-green-gray">{t('create edit message templates', { ns: 'communications' })}</p>
            <Link to="/comms/templates" className="mt-2 inline-flex items-center text-sm link-rovida">
              {t('view templates', { ns: 'communications' })} <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-full card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('recent announcements', { ns: 'communications' })}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">{t('latest published announcements', { ns: 'communications' })}</CardDescription>
        </CardHeader>
        <CardContent className="h-64 overflow-hidden">
          {recentAnnouncements.length > 0 ? (
            <AnimatedList
              items={recentAnnouncements.map(ann => (
                <div className="flex flex-col">
                  <span className="font-medium text-rovida-near-black">{ann.title}</span>
                  <span className="text-xs text-rovida-slate-green-gray">{format(ann.publishedAt, 'MMM dd, yyyy')} - {ann.author}</span>
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
              <p className="text-rovida-slate-green-gray">{t('no recent announcements', { ns: 'communications' })}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Comms;