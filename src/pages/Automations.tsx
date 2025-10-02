import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PlusCircle, Zap, LayoutTemplate, MessageSquareText, PlayCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { mockAutomationTemplates, AutomationTemplate } from '@/data/mock-automations';

const Automations = () => {
  const { t } = useTranslation(['automations', 'common']);
  const { canRead, canCreate } = useAuth();

  const breadcrumbItems = [
    { label: t('home', { ns: 'common' }), href: '/' },
    { label: t('automations', { ns: 'automations' }), href: '/automations' },
  ];

  const handleUseTemplate = (template: AutomationTemplate) => {
    toast.success(t('template used', { ns: 'automations', title: template.title }));
    // In a real app, this would pre-fill the sandbox or initiate a setup flow
  };

  const handleCustomRequestSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Simulate submission
    toast.success(t('request submitted', { ns: 'automations' }));
    // Clear form fields
    (event.target as HTMLFormElement).reset();
  };

  const handleRunAutomation = () => {
    toast.success(t('automation run', { ns: 'automations' }));
    // Simulate running the automation logic
  };

  if (!canRead('Automations')) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <Zap className="h-12 w-12 text-rovida-gold" />
            <p>{t('no permission view automations', { ns: 'automations' })}</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('automations', { ns: 'automations' })}</h1>
      </header>
      <p className="text-rovida-slate-green-gray">{t('overview automations', { ns: 'automations' })}</p>

      <Tabs defaultValue="templates" className="flex-1">
        <TabsList className="grid w-full grid-cols-3 bg-rovida-soft-gray/50 backdrop-blur-xl border-rovida-soft-gray">
          <TabsTrigger value="templates" className="data-[state=active]:bg-rovida-navy data-[state=active]:text-white data-[state=active]:shadow-subtle text-rovida-near-black">
            <LayoutTemplate className="h-4 w-4 mr-2" /> {t('templates', { ns: 'automations' })}
          </TabsTrigger>
          <TabsTrigger value="custom-request" className="data-[state=active]:bg-rovida-navy data-[state=active]:text-white data-[state=active]:shadow-subtle text-rovida-near-black">
            <MessageSquareText className="h-4 w-4 mr-2" /> {t('custom request', { ns: 'automations' })}
          </TabsTrigger>
          <TabsTrigger value="sandbox" className="data-[state=active]:bg-rovida-navy data-[state=active]:text-white data-[state=active]:shadow-subtle text-rovida-near-black">
            <PlayCircle className="h-4 w-4 mr-2" /> {t('sandbox', { ns: 'automations' })}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="mt-4">
          <Card className="card-rovida">
            <CardHeader>
              <CardTitle className="text-rovida-navy">{t('explore automation templates', { ns: 'automations' })}</CardTitle>
              <CardDescription className="text-rovida-slate-green-gray">{t('ready to use templates', { ns: 'automations' })}</CardDescription>
            </CardHeader>
            <CardContent>
              {mockAutomationTemplates.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockAutomationTemplates.map((template) => (
                    <Card key={template.id} className="card-rovida">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg text-rovida-navy">{template.title}</CardTitle>
                        {template.icon && <Zap className="h-5 w-5 text-rovida-gold" />}
                      </CardHeader>
                      <CardContent className="flex flex-col justify-between h-full">
                        <CardDescription className="mb-4 text-rovida-slate-green-gray">{template.description}</CardDescription>
                        {canCreate('Automations') && (
                          <Button className="btn-primary mt-auto" onClick={() => handleUseTemplate(template)}>
                            <PlusCircle className="mr-2 h-4 w-4" /> {t('use template', { ns: 'automations' })}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1 text-center p-8">
                  <h3 className="text-2xl font-bold tracking-tight text-rovida-near-black">
                    {t('no templates found', { ns: 'automations' })}
                  </h3>
                  <p className="text-sm text-rovida-slate-green-gray">
                    {t('create first template', { ns: 'automations' })}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom-request" className="mt-4">
          <Card className="card-rovida max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-rovida-navy">{t('request custom automation', { ns: 'automations' })}</CardTitle>
              <CardDescription className="text-rovida-slate-green-gray">{t('describe your needs', { ns: 'automations' })}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCustomRequestSubmit} className="grid gap-4">
                <div className="grid md:grid-cols-4 items-center gap-4">
                  <Label htmlFor="automation-title" className="md:text-right text-rovida-near-black">{t('automation title', { ns: 'automations' })}</Label>
                  <Input id="automation-title" type="text" placeholder="e.g., New Tenant Onboarding Workflow" required className="md:col-span-3 border-rovida-soft-gray text-rovida-near-black" />
                </div>
                <div className="grid md:grid-cols-4 items-start gap-4">
                  <Label htmlFor="automation-description" className="md:text-right text-rovida-near-black">{t('describe automation', { ns: 'automations' })}</Label>
                  <Textarea id="automation-description" placeholder={t('describe automation', { ns: 'automations' })} rows={6} required className="md:col-span-3 border-rovida-soft-gray text-rovida-near-black" />
                </div>
                {canCreate('Automations') && (
                  <Button type="submit" className="w-full btn-primary">
                    <MessageSquareText className="mr-2 h-4 w-4" /> {t('submit request', { ns: 'automations' })}
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sandbox" className="mt-4">
          <Card className="card-rovida max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-rovida-navy">{t('sandbox', { ns: 'automations' })}</CardTitle>
              <CardDescription className="text-rovida-slate-green-gray">{t('build test automations', { ns: 'automations' })}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-rovida-soft-gray rounded-lg text-center text-rovida-slate-green-gray bg-white/60 h-64 mb-4">
                <Zap className="h-12 w-12 mb-3 text-rovida-gold" />
                <p className="font-medium text-rovida-near-black">{t('drag drop blocks', { ns: 'automations' })}</p>
              </div>
              {canCreate('Automations') && (
                <Button className="w-full btn-primary" onClick={handleRunAutomation}>
                  <PlayCircle className="mr-2 h-4 w-4" /> {t('run automation', { ns: 'automations' })}
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Automations;