import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { mockMeetings, Meeting } from '@/data/mock-meetings';
import { useUser } from '@/context/UserContext'; // Import useUser

const UpcomingEvents = () => {
  const { t } = useTranslation();
  const { currentUser } = useUser();

  // Helper to filter meetings based on user's scope
  const filterMeetingsByScope = (meetings: Meeting[]): Meeting[] => {
    if (!currentUser) return [];

    // Super admins and condo admins see all meetings
    if (currentUser.roles.some(role => role.scope.isSuper || role.name === 'Client Super-Administrator' || role.name === 'Condo Administrator')) {
      return meetings;
    }

    const userBuildingIds = currentUser.roles.flatMap(role => role.scope.buildingIds || []);
    const userUnitIds = currentUser.roles.flatMap(role => role.scope.unitIds || []);

    return meetings.filter(meeting => {
      // For Board Members, filter by building if applicable (mock data doesn't have buildingId on meetings directly)
      // For simplicity, assume meetings are relevant if user has any building scope.
      if (userBuildingIds.length > 0) {
        // This is a simplified check. A real app would link meetings to specific buildings.
        // For now, if a user has building access, they see all meetings.
        return true;
      }

      // Owners/Tenants might only see general announcements or meetings they are invited to.
      // For now, if no specific building scope, filter out.
      const nonGeneralRoles = ['Owner', 'Tenant', 'Accountant', 'Vendor / Service Provider', 'Emergency Agent', 'Building Maintenance Technician', 'Concierge / Front Desk / Security'];
      if (nonGeneralRoles.some(roleName => currentUser.roles.map(r => r.name).includes(roleName))) {
        return false;
      }

      return true; // Default for roles with broader read access (e.g., Auditor)
    });
  };

  // Filter mockMeetings to get upcoming scheduled meetings based on user scope
  const upcomingMeetings = filterMeetingsByScope(mockMeetings)
    .filter(meeting => meeting.status === 'Scheduled' && meeting.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <Card className="col-span-2 lg:col-span-1 card-rovida">
      <CardHeader>
        <CardTitle className="text-rovida-navy">{t('upcoming_events')}</CardTitle>
        <CardDescription className="text-rovida-slate-green-gray">{t('events_scheduled_near_future')}</CardDescription>
      </CardHeader>
      <CardContent>
        {upcomingMeetings.length > 0 ? (
          <div className="space-y-4">
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-rovida-gold" />
                <div>
                  <p className="font-medium text-rovida-near-black">{meeting.title}</p>
                  <p className="text-sm text-rovida-slate-green-gray">
                    {format(meeting.date, 'MMM dd, yyyy')} {t('at')} {meeting.time} - {meeting.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-rovida-slate-green-gray">{t('no_upcoming_events')}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;