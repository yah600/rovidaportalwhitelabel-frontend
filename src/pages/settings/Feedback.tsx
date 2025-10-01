import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

const SettingsFeedback = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('settings'), href: '/settings' },
    { label: 'Feedback', href: '/settings/feedback' },
  ];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Placeholder for submitting feedback
    alert('Feedback submitted! Thank you. (Simulated)');
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl">{t('settings')} Feedback</h1>

      <Card className="max-w-3xl mx-auto w-full">
        <CardHeader>
          <CardTitle>Submit Feedback</CardTitle>
          <CardDescription>Help us improve by sharing your thoughts and suggestions.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="feedback-subject">Subject</Label>
              <Input id="feedback-subject" type="text" placeholder="e.g., Feature Request, Bug Report" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="feedback-message">Your Feedback</Label>
              <Textarea id="feedback-message" placeholder="Describe your feedback here..." rows={6} required />
            </div>
            <Button type="submit" className="w-full">
              <Send className="mr-2 h-4 w-4" /> Send Feedback
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsFeedback;