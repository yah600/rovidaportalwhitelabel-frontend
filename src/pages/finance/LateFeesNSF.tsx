import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Imported Select components
import { Percent, DollarSign, Clock, Save } from 'lucide-react'; // Imported Save
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

const FinanceLateFeesNSF = () => {
  const { t } = useTranslation(['finance', 'common']);
  const { canRead, canUpdate } = useAuth();

  const breadcrumbItems = [
    { label: t('finance', { ns: 'finance' }), href: '/finance' },
    { label: t('late fees nsf interest rules', { ns: 'finance' }), href: '/finance/late-fees-nsf' },
  ];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    toast.success(t('rules saved title', { ns: 'finance' }), {
      description: t('rules saved description', { ns: 'finance' }),
    });
  };

  if (!canRead('Finance - Late Fees/NSF/Reconciliation')) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <DollarSign className="h-12 w-12 text-rovida-gold" />
            <p>{t('no permission view late fees', { ns: 'common' })}</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('late fees nsf interest rules', { ns: 'finance' })}</h1>
      <p className="text-rovida-slate-green-gray">{t('configure automated financial rules', { ns: 'finance' })}</p>

      <Card className="max-w-3xl mx-auto w-full card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('late fees', { ns: 'finance' })}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">{t('set up late payment penalties', { ns: 'finance' })}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-late-fees" className="flex flex-col space-y-1 text-rovida-near-black">
                <span>{t('enable late fees', { ns: 'finance' })}</span>
                <span className="font-normal leading-snug text-rovida-slate-green-gray">
                  {t('automatically apply late fees', { ns: 'finance' })}
                </span>
              </Label>
              <Switch id="enable-late-fees" defaultChecked={true} disabled={!canUpdate('Finance - Late Fees/NSF/Reconciliation')} className="data-[state=checked]:bg-rovida-gold" />
            </div>
            <Separator className="bg-rovida-soft-gray" />
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="late-fee-amount" className="md:text-right text-rovida-near-black">{t('late fee amount', { ns: 'finance' })}</Label>
              <div className="md:col-span-3 flex items-center">
                <Input id="late-fee-amount" type="number" defaultValue="50.00" step="0.01" className="border-rovida-soft-gray text-rovida-near-black" disabled={!canUpdate('Finance - Late Fees/NSF/Reconciliation')} />
                <span className="ml-2 text-rovida-near-black">CAD</span>
              </div>
            </div>
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="grace-period" className="md:text-right text-rovida-near-black">{t('grace period', { ns: 'finance' })}</Label>
              <div className="md:col-span-3 flex items-center">
                <Input id="grace-period" type="number" defaultValue="5" className="border-rovida-soft-gray text-rovida-near-black" disabled={!canUpdate('Finance - Late Fees/NSF/Reconciliation')} />
                <span className="ml-2 text-rovida-near-black">{t('days', { ns: 'common' })}</span>
              </div>
            </div>
            {canUpdate('Finance - Late Fees/NSF/Reconciliation') && (
              <Button type="submit" className="w-full btn-primary">
                <Save className="mr-2 h-4 w-4" /> {t('save changes', { ns: 'common' })}
              </Button>
            )}
          </form>
        </CardContent>
      </Card>

      <Card className="max-w-3xl mx-auto w-full card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('nsf fees', { ns: 'finance' })}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">{t('configure non-sufficient funds fees', { ns: 'finance' })}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-nsf-fees" className="flex flex-col space-y-1 text-rovida-near-black">
                <span>{t('enable nsf fees', { ns: 'finance' })}</span>
                <span className="font-normal leading-snug text-rovida-slate-green-gray">
                  {t('automatically apply nsf fees', { ns: 'finance' })}
                </span>
              </Label>
              <Switch id="enable-nsf-fees" defaultChecked={true} disabled={!canUpdate('Finance - Late Fees/NSF/Reconciliation')} className="data-[state=checked]:bg-rovida-gold" />
            </div>
            <Separator className="bg-rovida-soft-gray" />
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="nsf-fee-amount" className="md:text-right text-rovida-near-black">{t('nsf fee amount', { ns: 'finance' })}</Label>
              <div className="md:col-span-3 flex items-center">
                <Input id="nsf-fee-amount" type="number" defaultValue="35.00" step="0.01" className="border-rovida-soft-gray text-rovida-near-black" disabled={!canUpdate('Finance - Late Fees/NSF/Reconciliation')} />
                <span className="ml-2 text-rovida-near-black">CAD</span>
              </div>
            </div>
            {canUpdate('Finance - Late Fees/NSF/Reconciliation') && (
              <Button type="submit" className="w-full btn-primary">
                <Save className="mr-2 h-4 w-4" /> {t('save changes', { ns: 'common' })}
              </Button>
            )}
          </form>
        </CardContent>
      </Card>

      <Card className="max-w-3xl mx-auto w-full card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('interest rules', { ns: 'finance' })}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">{t('set up interest charges overdue', { ns: 'finance' })}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-interest" className="flex flex-col space-y-1 text-rovida-near-black">
                <span>{t('enable interest charges', { ns: 'finance' })}</span>
                <span className="font-normal leading-snug text-rovida-slate-green-gray">
                  {t('apply interest to overdue balances', { ns: 'finance' })}
                </span>
              </Label>
              <Switch id="enable-interest" disabled={!canUpdate('Finance - Late Fees/NSF/Reconciliation')} className="data-[state=checked]:bg-rovida-gold" />
            </div>
            <Separator className="bg-rovida-soft-gray" />
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="interest-rate" className="md:text-right text-rovida-near-black">{t('annual interest rate', { ns: 'finance' })}</Label>
              <div className="md:col-span-3 flex items-center">
                <Input id="interest-rate" type="number" defaultValue="1.5" step="0.1" className="border-rovida-soft-gray text-rovida-near-black" disabled={!canUpdate('Finance - Late Fees/NSF/Reconciliation')} />
                <span className="ml-2 text-rovida-near-black">%</span>
              </div>
            </div>
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="compounding-period" className="md:text-right text-rovida-near-black">{t('compounding period', { ns: 'finance' })}</Label>
              <div className="md:col-span-3">
                <Select defaultValue="monthly" disabled={!canUpdate('Finance - Late Fees/NSF/Reconciliation')}>
                  <SelectTrigger id="compounding-period" className="border-rovida-soft-gray text-rovida-near-black">
                    <SelectValue placeholder={t('select period', { ns: 'finance' })} />
                  </SelectTrigger>
                  <SelectContent className="bg-white/80 backdrop-blur-xl border-rovida-soft-gray text-rovida-near-black">
                    <SelectItem value="daily">{t('daily', { ns: 'common' })}</SelectItem>
                    <SelectItem value="monthly">{t('monthly', { ns: 'common' })}</SelectItem>
                    <SelectItem value="quarterly">{t('quarterly', { ns: 'common' })}</SelectItem>
                    <SelectItem value="annually">{t('annually', { ns: 'common' })}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {canUpdate('Finance - Late Fees/NSF/Reconciliation') && (
              <Button type="submit" className="w-full btn-primary">
                <Save className="mr-2 h-4 w-4" /> {t('save changes', { ns: 'common' })}
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceLateFeesNSF;