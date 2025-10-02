import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

const SettingsFeedback = () => {
  const { t } = useTranslation();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Placeholder for submitting feedback
    toast.success(t('feedback submitted title'), {
      description: t('feedback submitted description'),
    });
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('feedback')}</h1>

      <Card className="w-full card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('submit feedback')}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">{t('help improve suggestions')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="feedback-subject" className="md:text-right text-rovida-near-black">{t('subject')}</Label>
              <Input id="feedback-subject" type="text" placeholder="e.g., Feature Request, Bug Report" required className="md:col-span-3 border-rovida-soft-gray text-rovida-near-black" />
            </div>
            <div className="grid md:grid-cols-4 items-start gap-4">
              <Label htmlFor="feedback-message" className="md:text-right text-rovida-near-black">{t('your feedback')}</Label>
              <Textarea id="feedback-message" placeholder="Describe your feedback here..." rows={6} required className="md:col-span-3 border-rovida-soft-gray text-rovida-near-black" />
            </div>
            <Button type="submit" className="w-full btn-primary">
              <Send className="mr-2 h-4 w-4" /> {t('send feedback')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsFeedback;