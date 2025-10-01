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

const CommsSend = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('communications'), href: '/comms' },
    { label: t('send_communication'), href: '/comms/send' },
  ];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Placeholder for sending logic
    alert('Communication sent! (Simulated)');
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('communications')} {t('send_communication')}</h1>

      <Card className="max-w-3xl mx-auto w-full card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('send_new_communication')}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">{t('compose_send_messages_groups')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="recipient" className="md:text-right text-rovida-near-black">{t('recipient_group')}</Label>
              <div className="md:col-span-3">
                <Select defaultValue="all">
                  <SelectTrigger id="recipient" className="border-rovida-soft-gray text-rovida-near-black">
                    <SelectValue placeholder={t('select_recipient_group')} />
                  </SelectTrigger>
                  <SelectContent className="bg-white/80 backdrop-blur-xl border-rovida-soft-gray text-rovida-near-black">
                    <SelectItem value="all">{t('all_residents')}</SelectItem>
                    <SelectItem value="owners">{t('unit_owners')}</SelectItem>
                    <SelectItem value="tenants">{t('tenants')}</SelectItem>
                    <SelectItem value="board">{t('board_members')}</SelectItem>
                    <SelectItem value="specific">{t('specific_units_users_advanced')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="md:text-right text-rovida-near-black">{t('subject')}</Label>
              <Input id="subject" type="text" placeholder={t('enter_subject')} required className="md:col-span-3 border-rovida-soft-gray text-rovida-near-black" />
            </div>
            <div className="grid md:grid-cols-4 items-start gap-4">
              <Label htmlFor="message" className="md:text-right text-rovida-near-black">{t('message')}</Label>
              <Textarea id="message" placeholder={t('type_your_message_here')} rows={8} required className="md:col-span-3 border-rovida-soft-gray text-rovida-near-black" />
            </div>
            <Button type="submit" className="w-full btn-primary">
              <SendIcon className="mr-2 h-4 w-4" /> {t('send_communication')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommsSend;