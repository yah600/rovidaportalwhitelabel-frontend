import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash2, Gavel } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockRules, Rule } from '@/data/mock-rules';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

const RuleDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation(['rules', 'common']);
  const { canUpdate, canDelete } = useAuth();

  const rule: Rule | undefined = mockRules.find((r) => r.id === id);

  if (!rule) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-rovida-slate-green-gray">{t('rule not found', { ns: 'rules' })}</p>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: t('rules and violations', { ns: 'rules' }), href: '/rules' },
    { label: `${t('rule', { ns: 'rules' })} ${rule.id}`, href: `/rules/${rule.id}` },
  ];

  const getEnforcementLevelVariant = (level: Rule['enforcementLevel']) => {
    switch (level) {
      case 'Warning':
        return 'secondary';
      case 'Fine':
        return 'default';
      case 'Eviction':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const handleEditRule = () => {
    toast.info(t('edit rule action', { ns: 'rules', id: rule.id }));
  };

  const handleDeleteRule = () => {
    toast.error(t('delete rule action', { ns: 'rules', id: rule.id }));
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{rule.title}</h1>
        <div className="flex items-center gap-2">
          <Badge variant={getEnforcementLevelVariant(rule.enforcementLevel)}>{t(rule.enforcementLevel.toLowerCase(), { ns: 'rules' })}</Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">{t('actions', { ns: 'common' })}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white/80 backdrop-blur-xl border-rovida-soft-gray text-rovida-near-black">
              <DropdownMenuLabel>{t('actions', { ns: 'common' })}</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-rovida-soft-gray" />
              {canUpdate('Rules') && (
                <DropdownMenuItem className="hover:bg-rovida-soft-gray" onClick={handleEditRule}>
                  <Edit className="mr-2 h-4 w-4" /> {t('edit rule', { ns: 'rules' })}
                </DropdownMenuItem>
              )}
              {canDelete('Rules') && (
                <DropdownMenuItem className="text-destructive hover:bg-rovida-soft-gray" onClick={handleDeleteRule}>
                  <Trash2 className="mr-2 h-4 w-4" /> {t('delete rule', { ns: 'rules' })}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Card className="card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('rule details', { ns: 'rules' })}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2 text-rovida-near-black">
            <div className="font-medium">{t('id', { ns: 'common' })}:</div>
            <div>{rule.id}</div>
            <div className="font-medium">{t('category', { ns: 'rules' })}:</div>
            <div>{t(rule.category.toLowerCase(), { ns: 'rules' })}</div>
            <div className="font-medium">{t('effective date', { ns: 'rules' })}:</div>
            <div>{format(rule.effectiveDate, 'MMM dd, yyyy')}</div>
            <div className="font-medium">{t('last revised', { ns: 'rules' })}:</div>
            <div>{format(rule.lastRevised, 'MMM dd, yyyy')}</div>
          </div>
          <Separator className="bg-rovida-soft-gray" />
          <div>
            <h4 className="font-medium mb-2 text-rovida-navy">{t('description', { ns: 'common' })}:</h4>
            <p className="text-rovida-slate-green-gray">{rule.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RuleDetail;