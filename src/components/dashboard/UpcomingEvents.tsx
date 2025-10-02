import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { mockMeetings, Meeting } from '@/data/mock-meetings';
import { useUser } from '@/context/UserContext'; // Import useUser
import { ROLE_IDS } from '@/shared/rbac/roles';

const UpcomingEvents = () => {
  const { t } = useTranslation(['dashboard', 'common']); // Specify namespaces
  const { currentUser } = useUser();

  // Helper to filter meetings based on user's scope
  const filterMeetingsByScope = (meetings: Meeting[]): Meeting[] => {
    if (!currentUser) return [];

    // Sysadmins, portfolio managers, and building managers see all meetings
    if (
      currentUser.roles.some(
        role =>
          role.scope.isSuper ||
          role.name === ROLE_IDS.PORTFOLIO_MANAGER ||
          role.name === ROLE_IDS.BUILDING_MANAGER
      )
    ) {
      return meetings;
    }

    const userBuildingIds = currentUser.roles.flatMap(role => role.scope.buildingIds || []);
    const userRoleNames = currentUser.roles.map(r => r.name);

    return meetings.filter(meeting => {
      // Board Members see meetings relevant to their buildings
      if (userRoleNames.includes(ROLE_IDS.BOARD) && userBuildingIds.length > 0) {
        // Assuming meetings are generally relevant to the building(s) a board member oversees.
        // In a real app, meetings would have a 'buildingId' field.
        return true;
      }

      // Property Managers see meetings relevant to their buildings
      if (userRoleNames.includes(ROLE_IDS.BUILDING_MANAGER) && userBuildingIds.length > 0) {
        return true;
      }

      // Other roles like Owner, Tenant, Vendor, Technician, Concierge, Emergency Agent
      // might only see specific meetings they are invited to or general announcements.
      // For simplicity, if no specific role-based access is defined, they don't see all meetings.
      const rolesWithLimitedMeetingAccess = [
        ROLE_IDS.OWNER,
        ROLE_IDS.TENANT,
        ROLE_IDS.VENDOR,
        ROLE_IDS.SECURITY,
        ROLE_IDS.GUEST,
      ];
      if (rolesWithLimitedMeetingAccess.some(roleName => userRoleNames.includes(roleName))) {
        return false;
      }

      return false; // Default to no access if not explicitly granted
    });
  };

  // Filter mockMeetings to get upcoming scheduled meetings based on user scope
  const upcomingMeetings = filterMeetingsByScope(mockMeetings)
    .filter(meeting => meeting.status === 'Scheduled' && meeting.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <Card className="col-span-2 lg:col-span-1 card-rovida">
      <CardHeader>
        <CardTitle className="text-rovida-navy">{t('upcoming events', { ns: 'dashboard' })}</CardTitle>
        <CardDescription className="text-rovida-slate-green-gray">{t('events scheduled near future', { ns: 'dashboard' })}</CardDescription>
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
                    {format(meeting.date, 'MMM dd, yyyy')} {t('at', { ns: 'common' })} {meeting.time} - {meeting.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-rovida-slate-green-gray">{t('no upcoming events', { ns: 'dashboard' })}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;