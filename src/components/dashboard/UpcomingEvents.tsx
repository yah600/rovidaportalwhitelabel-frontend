import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';
import { format, addDays } from 'date-fns';

interface Event {
  id: string;
  title: string;
  date: Date;
  location: string;
}

const mockEvents: Event[] = [
  { id: 'E001', title: 'Board Meeting', date: addDays(new Date(), 2), location: 'Conference Room' },
  { id: 'E002', title: 'HVAC Maintenance', date: addDays(new Date(), 5), location: 'Building A' },
  { id: 'E003', title: 'Resident BBQ', date: addDays(new Date(), 10), location: 'Courtyard' },
];

const UpcomingEvents = () => {
  const { t } = useTranslation();
  const upcomingEvents = mockEvents.filter(event => event.date >= new Date()).sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <Card className="col-span-2 lg:col-span-1">
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
        <CardDescription>Events scheduled for the near future.</CardDescription>
      </CardHeader>
      <CardContent>
        {upcomingEvents.length > 0 ? (
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(event.date, 'MMM dd, yyyy')} at {format(event.date, 'HH:mm')} - {event.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No upcoming events.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;