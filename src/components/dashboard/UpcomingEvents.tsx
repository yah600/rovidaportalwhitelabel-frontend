import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { mockMeetings, Meeting } from '@/data/mock-meetings'; // Import mockMeetings

const UpcomingEvents = () => {
  const { t } = useTranslation();

  // Filter mockMeetings to get upcoming scheduled meetings
  const upcomingMeetings = mockMeetings
    .filter(meeting => meeting.status === 'Scheduled' && meeting.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <Card className="col-span-2 lg:col-span-1">
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
        <CardDescription>Events scheduled for the near future.</CardDescription>
      </CardHeader>
      <CardContent>
        {upcomingMeetings.length > 0 ? (
          <div className="space-y-4">
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{meeting.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(meeting.date, 'MMM dd, yyyy')} at {meeting.time} - {meeting.location}
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