import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockIssues, Issue } from '@/data/mock-issues';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import { useUser } from '@/context/UserContext'; // Import useUser

const RecentIssues = () => {
  const { t } = useTranslation(['dashboard', 'common', 'issues']); // Specify namespaces
  const { currentUser } = useUser();

  // Helper to filter issues based on user's scope
  const filterIssuesByScope = (issues: Issue[]): Issue[] => {
    if (!currentUser) return [];

    // Super admins and condo admins see all issues
    if (currentUser.roles.some(role => role.scope.isSuper || role.name === 'Client Super-Administrator' || role.name === 'Condo Administrator')) {
      return issues;
    }

    const userBuildingIds = currentUser.roles.flatMap(role => role.scope.buildingIds || []);
    const userUnitIds = currentUser.roles.flatMap(role => role.scope.unitIds || []);
    const userVendorId = currentUser.roles.find(role => role.scope.vendorId)?.scope.vendorId;

    return issues.filter(issue => {
      // Filter by unit if user is an owner/tenant
      if (userUnitIds.length > 0 && issue.unit) {
        const issueUnitNumber = issue.unit.replace('Unit ', 'UNIT');
        if (userUnitIds.includes(issueUnitNumber)) return true;
      }
      // Filter by building if user is property manager, board member, etc.
      // This requires mockIssues to have buildingId, which it currently doesn't.
      // For now, we'll assume issue.unit implies a building for simplicity.
      // A more robust solution would involve linking units to buildings in mock data.
      if (userBuildingIds.length > 0 && issue.unit) {
        // Placeholder logic: if issue.unit is 'Unit 101', assume it's in BLD001
        // This needs to be improved with actual building data if available.
        const buildingIdFromUnit = issue.unit.startsWith('Unit 1') ? 'BLD001' : (issue.unit.startsWith('Unit 2') ? 'BLD001' : (issue.unit.startsWith('Unit 3') ? 'BLD002' : null));
        if (buildingIdFromUnit && userBuildingIds.includes(buildingIdFromUnit)) return true;
      }
      // Filter by assignee for vendors/technicians
      if (userVendorId && issue.assignee === currentUser.name) return true; // Assuming assignee name matches vendor user name

      // If no specific scope matches, and the role is not a general 'read all' role, exclude.
      // Roles like Accountant, Vendor, Owner, Tenant should not see all issues unless assigned.
      const nonGeneralRoles = ['Accountant', 'Vendor / Service Provider', 'Owner', 'Tenant'];
      if (nonGeneralRoles.some(roleName => currentUser.roles.map(r => r.name).includes(roleName))) {
        return false;
      }

      return true; // Default for roles with broader read access (e.g., Board Member, Auditor)
    });
  };

  const recentIssues = filterIssuesByScope(mockIssues)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 3); // Display up to 3 recent issues

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

  return (
    <Card className="col-span-2 lg:col-span-1 card-rovida">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-rovida-navy">{t('open issues', { ns: 'dashboard' })}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">{t('your most recent incidents', { ns: 'dashboard' })}</CardDescription>
        </div>
        <Link to="/issues" className="text-sm link-rovida flex items-center gap-1">
          {t('view all', { ns: 'common' })} <ArrowRight className="h-4 w-4" />
        </Link>
      </CardHeader>
      <CardContent>
        {recentIssues.length > 0 ? (
          <div className="space-y-4">
            {recentIssues.map((issue) => (
              <div key={issue.id} className="flex items-center justify-between">
                <div>
                  <Link to={`/issues/${issue.id}`} className="font-medium link-rovida">
                    {issue.title}
                  </Link>
                  <p className="text-sm text-rovida-slate-green-gray">
                    {issue.unit} - {format(issue.createdAt, 'MMM dd')}
                  </p>
                </div>
                <Badge variant={getStatusBadgeVariant(issue.status)}>{t(issue.status.toLowerCase(), { ns: 'issues' })}</Badge>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-rovida-slate-green-gray">{t('no tickets', { ns: 'issues' })}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentIssues;