import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileSignature, Users, ArrowRight } from 'lucide-react';
import { mockLeases } from '@/data/mock-leases';
import { mockUsers } from '@/data/mock-users';

const Tenancy = () => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { label: t('home'), href: '/' },
    { label: t('tenancy'), href: '/tenancy' },
  ];

  // Calculate summary data
  const activeLeases = mockLeases.filter(lease => lease.status === 'Active').length;
  const pendingRenewals = mockLeases.filter(lease => lease.status === 'Pending Renewal').length;
  const totalTenants = new Set(mockLeases.map(lease => lease.tenantName)).size; // Count unique tenant names

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('tenancy')} {t('overview')}</h1>
      <p className="text-rovida-slate-green-gray">{t('manage_tenant_leases_relationships')}</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Active Leases Card */}
        <Card className="card-rovida">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-rovida-navy">{t('active_leases')}</CardTitle>
            <FileSignature className="h-4 w-4 text-rovida-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rovida-near-black">{activeLeases}</div>
            <p className="text-xs text-rovida-slate-green-gray">{t('currently_active_agreements')}</p>
            <Link to="/tenancy/leases" className="mt-2 inline-flex items-center text-sm link-rovida">
              {t('view_leases')} <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        {/* Pending Renewals Card */}
        <Card className="card-rovida">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-rovida-navy">{t('pending_renewals')}</CardTitle>
            <FileSignature className="h-4 w-4 text-rovida-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rovida-near-black">{pendingRenewals}</div>
            <p className="text-xs text-rovida-slate-green-gray">{t('leases_due_for_renewal')}</p>
            <Link to="/tenancy/leases" className="mt-2 inline-flex items-center text-sm link-rovida">
              {t('review_renewals')} <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        {/* Total Tenants Card */}
        <Card className="card-rovida">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-rovida-navy">{t('total_tenants')}</CardTitle>
            <Users className="h-4 w-4 text-rovida-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rovida-near-black">{totalTenants}</div>
            <p className="text-xs text-rovida-slate-green-gray">{t('residents_under_lease')}</p>
            <Link to="/settings/users" className="mt-2 inline-flex items-center text-sm link-rovida">
              {t('manage_tenants')} <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
        <p className="text-rovida-slate-green-gray">{t('detailed_tenancy_analytics_soon')}</p>
      </Card>
    </div>
  );
};

export default Tenancy;