import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { mockDocuments, Document } from '@/data/mock-documents';
import { useUser } from '@/context/UserContext'; // Import useUser

const RecentDocuments = () => {
  const { t } = useTranslation(['dashboard', 'common', 'documents']); // Specify namespaces
  const { currentUser } = useUser();

  // Helper to filter documents based on user's scope
  const filterDocumentsByScope = (documents: Document[]): Document[] => {
    if (!currentUser) return [];

    // Platform Owner, Client Super-Administrator, Condo Administrator see all documents
    if (currentUser.roles.some(role => role.scope.isSuper || role.name === 'Client Super-Administrator' || role.name === 'Condo Administrator')) {
      return documents;
    }

    const userBuildingIds = currentUser.roles.flatMap(role => role.scope.buildingIds || []);
    const userUnitIds = currentUser.roles.flatMap(role => role.scope.unitIds || []);
    const userRoleNames = currentUser.roles.map(r => r.name);

    return documents.filter(doc => {
      // Accountant sees financial documents
      if (userRoleNames.includes('Accountant') && doc.category === 'Financial') return true;
      // Vendor sees maintenance documents
      if (userRoleNames.includes('Vendor / Service Provider') && doc.category === 'Maintenance') return true;

      // If user has building scope, show general documents and documents related to their buildings
      if (userBuildingIds.length > 0) {
        // This is a simplified check. A real app would link documents to specific buildings.
        // For now, assume general documents are visible to those with building scope.
        return true;
      }

      // If user has unit scope, show general documents and documents related to their units
      if (userUnitIds.length > 0) {
        // This is a simplified check. A real app would link documents to specific units.
        // For now, assume general documents are visible to those with unit scope.
        return true;
      }

      // Default for roles with broader read access (e.g., Board Member, Auditor, Owner, Tenant, Concierge, Emergency Agent, Building Maintenance Technician)
      const generalReadRoles = ['Board Member', 'Read-Only Auditor', 'Owner', 'Tenant', 'Emergency Agent', 'Concierge / Front Desk / Security', 'Building Maintenance Technician', 'Property Manager'];
      if (generalReadRoles.some(roleName => userRoleNames.includes(roleName))) {
        return true;
      }

      return false;
    });
  };

  const recentDocuments = filterDocumentsByScope(mockDocuments)
    .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())
    .slice(0, 3);

  return (
    <Card className="col-span-2 xl:col-span-1 card-rovida">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-rovida-navy">{t('latest documents', { ns: 'dashboard' })}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">{t('recently added updated documents', { ns: 'dashboard' })}</CardDescription>
        </div>
        <Link to="/documents/registry" className="text-sm link-rovida flex items-center gap-1">
          {t('view all', { ns: 'common' })} <ArrowRight className="h-4 w-4" />
        </Link>
      </CardHeader>
      <CardContent>
        {recentDocuments.length > 0 ? (
          <div className="space-y-4">
            {recentDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-rovida-gold" />
                <div>
                  <Link to={`/documents/${doc.id}`} className="font-medium link-rovida">
                    {doc.title}
                  </Link>
                  <p className="text-sm text-rovida-slate-green-gray">
                    {doc.type} - {format(doc.uploadedAt, 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-rovida-slate-green-gray">{t('no recent documents', { ns: 'dashboard' })}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentDocuments;