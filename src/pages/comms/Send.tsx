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
    { label: 'Send', href: '/comms/send' },
  ];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Placeholder for sending logic
    alert('Communication sent! (Simulated)');
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl">{t('communications')} Send</h1>

      <Card className="max-w-3xl mx-auto w-full">
        <CardHeader>
          <CardTitle>Send New Communication</CardTitle>
          <CardDescription>Compose and send messages to residents or specific groups.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="recipient">Recipient Group</Label>
              <Select defaultValue="all">
                <SelectTrigger id="recipient">
                  <SelectValue placeholder="Select recipient group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Residents</SelectItem>
                  <SelectItem value="owners">Unit Owners</SelectItem>
                  <SelectItem value="tenants">Tenants</SelectItem>
                  <SelectItem value="board">Board Members</SelectItem>
                  <SelectItem value="specific">Specific Units/Users (Advanced)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" type="text" placeholder="Enter subject" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Type your message here..." rows={8} required />
            </div>
            <Button type="submit" className="w-full">
              <SendIcon className="mr-2 h-4 w-4" /> Send Communication
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommsSend;