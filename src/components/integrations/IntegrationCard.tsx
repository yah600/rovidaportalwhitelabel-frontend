import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plug, Settings, ArrowRight } from 'lucide-react';
import { Integration } from '@/data/mock-integrations';
import { format } from 'date-fns';

interface IntegrationCardProps {
  integration: Integration;
}

const IntegrationCard = ({ integration }: IntegrationCardProps) => {
  const { t } = useTranslation(['integrations', 'common']); // Ensure 'integrations' and 'common' namespaces are loaded

  const getStatusVariant = (status: Integration['status']) => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'Inactive':
        return 'destructive';
      case 'Pending Setup':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <Card className="flex flex-col card-rovida">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Plug className="h-5 w-5 text-rovida-gold" />
          <CardTitle className="text-lg text-rovida-navy">{integration.name}</CardTitle>
        </div>
        <Badge variant={getStatusVariant(integration.status)}>{t(integration.status.toLowerCase(), { ns: 'integrations' })}</Badge>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <CardDescription className="mb-4 text-rovida-slate-green-gray">{integration.description}</CardDescription>
        <div className="flex items-center justify-between text-sm text-rovida-slate-green-gray">
          <span>{t('type', { ns: 'common' })}: {integration.type}</span>
          {integration.connectedAt && (
            <span>{t('connected at', { ns: 'integrations' })}: {format(integration.connectedAt, 'MMM dd, yyyy')}</span>
          )}
        </div>
        <div className="mt-4 flex justify-end">
          <Link to={`/integrations/${integration.slug}`}>
            <Button variant="outline" size="sm" className="btn-secondary">
              <Settings className="h-4 w-4 mr-2" /> {t('manage', { ns: 'common' })}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationCard;