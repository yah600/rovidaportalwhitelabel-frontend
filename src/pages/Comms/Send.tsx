import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Send as SendIcon } from 'lucide-react';
import { toast } from 'sonner';

const CommsSend = () => {
  const { t } = useTranslation(['communications', 'common']); // Ensure 'communications' and 'common' namespaces are loaded
  const breadcrumbItems = [
    { label: t('communications', { ns: 'communications' }), href: '/comms' },
    { label: t('send communication', { ns: 'communications' }), href: '/comms/send' },
  ];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Placeholder for sending logic
    toast.success(t('communication sent title', { ns: 'communications' }), {
      description: t('communication sent description', { ns: 'communications' }),
    });
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('communications', { ns: 'communications' })} {t('send communication', { ns: 'communications' })}</h1>

      <Card className="max-w-3xl mx-auto w-full card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('send new communication', { ns: 'communications' })}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">{t('compose send messages groups', { ns: 'communications' })}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="recipient" className="md:text-right text-rovida-near-black">{t('recipient group', { ns: 'communications' })}</Label>
              <div className="md:col-span-3">
                <Select defaultValue="all">
                  <SelectTrigger id="recipient" className="border-rovida-soft-gray text-rovida-near-black">
                    <SelectValue placeholder={t('select recipient group', { ns: 'communications' })} />
                  </SelectTrigger>
                  <SelectContent className="bg-white/80 backdrop-blur-xl border-rovida-soft-gray text-rovida-near-black">
                    <SelectItem value="all">{t('all residents', { ns: 'communications' })}</SelectItem>
                    <SelectItem value="owners">{t('unit owners', { ns: 'communications' })}</SelectItem>
                    <SelectItem value="tenants">{t('tenants', { ns: 'communications' })}</SelectItem>
                    <SelectItem value="board">{t('board members', { ns: 'communications' })}</SelectItem>
                    <SelectItem value="specific">{t('specific units users advanced', { ns: 'communications' })}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="md:text-right text-rovida-near-black">{t('subject', { ns: 'settings' })}</Label>
              <Input id="subject" type="text" placeholder={t('enter subject', { ns: 'communications' })} required className="md:col-span-3 border-rovida-soft-gray text-rovida-near-black" />
            </div>
            <div className="grid md:grid-cols-4 items-start gap-4">
              <Label htmlFor="message" className="md:text-right text-rovida-near-black">{t('message', { ns: 'communications' })}</Label>
              <Textarea id="message" placeholder={t('type your message here', { ns: 'communications' })} rows={8} required className="md:col-span-3 border-rovida-soft-gray text-rovida-near-black" />
            </div>
            <Button type="submit" className="w-full btn-primary">
              <SendIcon className="mr-2 h-4 w-4" /> {t('send communication', { ns: 'communications' })}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommsSend;