import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarDays, PlusCircle, Wrench, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { DayPicker, DateFormatter } from 'react-day-picker';
import { format, isSameDay } from 'date-fns';
import { mockCalendarEvents, CalendarEvent } from '@/mocks';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const MaintenanceCalendar = () => {
  const { t } = useTranslation(['maintenance', 'common']); // Specify namespaces
  const { canCreate } = useAuth();

  const breadcrumbItems = [
    { label: t('maintenance', { ns: 'maintenance' }), href: '/maintenance' },
    { label: t('calendar', { ns: 'maintenance' }), href: '/maintenance/calendar' },
  ];

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const handleAddEvent = () => {
    toast.info(t('add new event action', { ns: 'maintenance' })); // Placeholder action
  };

  const eventsForSelectedDate = selectedDate
    ? mockCalendarEvents.filter(event => isSameDay(event.date, selectedDate))
    : [];

  const footer = eventsForSelectedDate.length > 0 ? (
    <div className="mt-4 space-y-2">
      <h4 className="font-semibold text-rovida-navy">{t('events for', { ns: 'maintenance' })} {format(selectedDate!, 'PPP')}</h4>
      {eventsForSelectedDate.map(event => (
        <Link to={event.link} key={event.id} className="flex items-center gap-2 p-2 border border-rovida-soft-gray rounded-md bg-white/60 hover:bg-rovida-soft-gray/80 transition-colors">
          {event.type === 'work-order' && <Wrench className="h-4 w-4 text-rovida-gold" />}
          {event.type === 'task' && <ClipboardList className="h-4 w-4 text-rovida-gold" />}
          {event.type === 'maintenance' && <CalendarDays className="h-4 w-4 text-rovida-gold" />}
          <div className="flex-1">
            <p className="font-medium text-rovida-near-black">{event.title}</p>
            <p className="text-xs text-rovida-slate-green-gray">{t(event.status.toLowerCase(), { ns: 'maintenance' })}</p>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <p className="text-rovida-slate-green-gray mt-4">{t('no events for selected date', { ns: 'maintenance' })}</p>
  );

  const formatCaption: DateFormatter = (month, options) => {
    const y = month.getFullYear();
    const m = format(month, 'LLLL', { locale: options?.locale });
    return (
      <div className="flex justify-center items-center text-rovida-navy font-semibold">
        {m} {y}
      </div>
    );
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('maintenance calendar', { ns: 'maintenance' })}</h1>
        {canCreate('Maintenance') && (
          <Button className="btn-primary" onClick={handleAddEvent}>
            <PlusCircle className="mr-2 h-4 w-4" /> {t('add new event', { ns: 'maintenance' })}
          </Button>
        )}
      </header>
      <p className="text-rovida-slate-green-gray">{t('visualize manage schedule', { ns: 'maintenance' })}</p>

      <Card className="flex-1 card-rovida p-4">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('monthly view', { ns: 'maintenance' })}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">{t('upcoming completed tasks', { ns: 'maintenance' })}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 flex justify-center">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              showOutsideDays
              className="rdp-custom-styles rounded-lg p-4 bg-white/60 backdrop-blur-sm border border-rovida-soft-gray shadow-subtle"
              formatters={{ formatCaption }}
              modifiers={{
                hasEvent: (date) => mockCalendarEvents.some(event => isSameDay(event.date, date)),
              }}
              styles={{
                caption: { display: 'flex', justifyContent: 'center' },
                head_cell: { color: 'var(--rovida-slate-green-gray)' },
                day: {
                  // Default day styles if any
                },
              }}
              modifiersStyles={{
                selected: { backgroundColor: 'var(--rovida-navy)', color: 'white' },
                today: { fontWeight: 'bold', color: 'var(--rovida-gold)' },
                hasEvent: { backgroundColor: 'var(--rovida-gold-20)', borderRadius: '50%' },
              }}
            />
          </div>
          <div className="flex-1 border-t lg:border-t-0 lg:border-l border-rovida-soft-gray pt-4 lg:pt-0 lg:pl-6">
            {footer}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceCalendar;