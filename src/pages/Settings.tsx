import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Building,
  Users,
  ShieldCheck,
  Bell,
  FileText,
  MessageSquareText,
  Settings as SettingsIcon, // Renamed to avoid conflict with page name
  Scale,
  Handshake, // Using Handshake for Roles as a placeholder
} from 'lucide-react';

const Settings = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('settings'), href: '/settings' },
  ];

  const settingsCategories = [
    {
      title: 'Organization',
      description: 'Manage your company or organization details.',
      icon: SettingsIcon,
      href: '/settings/org',
    },
    {
      title: 'Buildings',
      description: 'Add, edit, and manage building properties.',
      icon: Building,
      href: '/settings/buildings',
    },
    {
      title: 'Units',
      description: 'Manage individual units within your buildings.',
      icon: Scale,
      href: '/settings/units',
    },
    {
      title: 'Users',
      description: 'Manage user accounts and access.',
      icon: Users,
      href: '/settings/users',
    },
    {
      title: 'Roles',
      description: 'Define and manage user roles and permissions.',
      icon: Handshake, // Using Handshake for roles
      href: '/settings/roles',
    },
    {
      title: 'Security',
      description: 'Configure security settings like 2FA and password policies.',
      icon: ShieldCheck,
      href: '/settings/security',
    },
    {
      title: 'Notifications',
      description: 'Manage notification preferences for various events.',
      icon: Bell,
      href: '/settings/notifications',
    },
    {
      title: 'Audit Log',
      description: 'View a log of all system activities and changes.',
      icon: FileText,
      href: '/settings/audit',
    },
    {
      title: 'Feedback',
      description: 'Send us your suggestions and report issues.',
      icon: MessageSquareText,
      href: '/settings/feedback',
    },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl">{t('settings')}</h1>
      <p className="text-muted-foreground">Manage your application settings and configurations.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {settingsCategories.map((category) => (
          <Link to={category.href} key={category.href}>
            <Card className="h-full flex flex-col justify-between hover:bg-muted/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">{category.title}</CardTitle>
                <category.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <CardDescription>{category.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-4 p-8">
        <p className="text-muted-foreground">Additional settings and configurations will appear here.</p>
      </div>
    </div>
  );
};

export default Settings;