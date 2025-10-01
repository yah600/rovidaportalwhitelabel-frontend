import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import Stepper, { Step } from '@/components/Stepper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import GlassSurface from '@/components/GlassSurface';
import { useUser } from '@/context/UserContext';
import { toast } from 'sonner';

const OnboardingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentUser, updateCurrentUser } = useUser();

  const [progress, setProgress] = useState(0);
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(currentUser?.phoneNumber || '');
  const [building, setBuilding] = useState(''); // Placeholder for building selection
  const [notificationPreferences, setNotificationPreferences] = useState(
    currentUser?.notificationPreferences || {
      emailIssues: true,
      emailAnnouncements: true,
      emailBilling: false,
      smsEmergency: true,
      smsMaintenance: false,
    }
  );

  useEffect(() => {
    if (currentUser?.onboarded) {
      navigate('/dashboard'); // Redirect if already onboarded
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingComplete = () => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        name,
        email,
        phoneNumber,
        notificationPreferences,
        onboarded: true,
      };
      updateCurrentUser(updatedUser);
      toast.success('Onboarding complete!', {
        description: 'Your dashboard is now personalized.',
      });
      navigate('/dashboard');
    }
  };

  const breadcrumbItems = [
    { label: t('home'), href: '/' },
    { label: 'Onboarding', href: '/onboarding' },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4 items-center"> {/* Centered content */}
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title text-center">Welcome Onboard!</h1>
      <p className="text-rovida-slate-green-gray text-center">Let's set up your account and preferences.</p>

      <GlassSurface width="100%" height="auto" borderRadius={10} blur={15} backgroundOpacity={0.1} className="max-w-3xl mx-auto p-4"> {/* Added padding to GlassSurface */}
        <Card className="w-full bg-transparent border-none shadow-none">
          <CardHeader className="text-center"> {/* Centered card header */}
            <CardTitle className="text-rovida-navy">Account Setup</CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">Follow these steps to get started.</CardDescription>
          </CardHeader>
          <CardContent className="p-6"> {/* Added padding to CardContent */}
            <Stepper onFinalStepCompleted={handleOnboardingComplete}>
              <Step>
                <div className="grid gap-4 text-rovida-near-black text-left"> {/* Aligned text left */}
                  <h3 className="text-xl font-semibold">Step 1: Personal Information</h3>
                  <p className="text-rovida-slate-green-gray">Tell us a bit about yourself.</p>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} className="border-rovida-soft-gray text-rovida-near-black bg-white/60" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="border-rovida-soft-gray text-rovida-near-black bg-white/60" />
                  </div>
                </div>
              </Step>
              <Step>
                <div className="grid gap-4 text-rovida-near-black text-left"> {/* Aligned text left */}
                  <h3 className="text-xl font-semibold">Step 2: Building Selection</h3>
                  <p className="text-rovida-slate-green-gray">Choose the building you manage or reside in.</p>
                  <div className="grid gap-2">
                    <Label htmlFor="building">Select Building</Label>
                    <Input id="building" placeholder="Building A" value={building} onChange={(e) => setBuilding(e.target.value)} className="border-rovida-soft-gray text-rovida-near-black bg-white/60" />
                  </div>
                </div>
              </Step>
              <Step>
                <div className="grid gap-4 text-rovida-near-black text-left"> {/* Aligned text left */}
                  <h3 className="text-xl font-semibold">Step 3: Contact & Notification Preferences</h3>
                  <p className="text-rovida-slate-green-gray">How should we reach you and what updates do you want?</p>
                  <div className="grid gap-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input id="phoneNumber" type="tel" placeholder="+1 (555) 123-4567" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="border-rovida-soft-gray text-rovida-near-black bg-white/60" />
                  </div>
                  <div className="grid gap-2 mt-4">
                    <h4 className="font-medium">Email Notifications</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-issues" className="flex flex-col space-y-1 text-rovida-near-black">
                        <span>New Issue Alerts</span>
                        <span className="font-normal leading-snug text-rovida-slate-green-gray">
                          Receive an email when a new issue is reported.
                        </span>
                      </Label>
                      <Switch id="email-issues" checked={notificationPreferences.emailIssues} onCheckedChange={(checked) => setNotificationPreferences(prev => ({ ...prev, emailIssues: !!checked }))} className="data-[state=checked]:bg-rovida-gold" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-announcements" className="flex flex-col space-y-1 text-rovida-near-black">
                        <span>Announcements</span>
                        <span className="font-normal leading-snug text-rovida-slate-green-gray">
                          Get emails for important building announcements.
                        </span>
                      </Label>
                      <Switch id="email-announcements" checked={notificationPreferences.emailAnnouncements} onCheckedChange={(checked) => setNotificationPreferences(prev => ({ ...prev, emailAnnouncements: !!checked }))} className="data-[state=checked]:bg-rovida-gold" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-billing" className="flex flex-col space-y-1 text-rovida-near-black">
                        <span>Billing Reminders</span>
                        <span className="font-normal leading-snug text-rovida-slate-green-gray">
                          Receive reminders for upcoming bill due dates.
                        </span>
                      </Label>
                      <Switch id="email-billing" checked={notificationPreferences.emailBilling} onCheckedChange={(checked) => setNotificationPreferences(prev => ({ ...prev, emailBilling: !!checked }))} className="data-[state=checked]:bg-rovida-gold" />
                    </div>
                  </div>
                  <div className="grid gap-2 mt-4">
                    <h4 className="font-medium">SMS Notifications</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms-emergency" className="flex flex-col space-y-1 text-rovida-near-black">
                        <span>Emergency Alerts</span>
                        <span className="font-normal leading-snug text-rovida-slate-green-gray">
                          Receive critical alerts via SMS.
                        </span>
                      </Label>
                      <Switch id="sms-emergency" checked={notificationPreferences.smsEmergency} onCheckedChange={(checked) => setNotificationPreferences(prev => ({ ...prev, smsEmergency: !!checked }))} className="data-[state=checked]:bg-rovida-gold" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms-maintenance" className="flex flex-col space-y-1 text-rovida-near-black">
                        <span>Maintenance Updates</span>
                        <span className="font-normal leading-snug text-rovida-slate-green-gray">
                          Get SMS updates for maintenance work affecting your unit.
                        </span>
                      </Label>
                      <Switch id="sms-maintenance" checked={notificationPreferences.smsMaintenance} onCheckedChange={(checked) => setNotificationPreferences(prev => ({ ...prev, smsMaintenance: !!checked }))} className="data-[state=checked]:bg-rovida-gold" />
                    </div>
                  </div>
                </div>
              </Step>
              <Step>
                <div className="grid gap-4 text-rovida-near-black text-left"> {/* Aligned text left */}
                  <h3 className="text-xl font-semibold">Step 4: Finalizing Setup</h3>
                  <p className="text-rovida-slate-green-gray">Setting up your dashboard based on your preferences.</p>
                  <div className="mt-4">
                    <Label>Loading your personalized experience...</Label>
                    <Progress value={progress} className="w-full mt-2 h-2 bg-rovida-soft-gray [&>*]:bg-rovida-gold" />
                  </div>
                </div>
              </Step>
              <Step>
                <div className="grid gap-4 text-rovida-near-black text-left"> {/* Aligned text left */}
                  <h3 className="text-xl font-semibold">Step 5: Ready to Go!</h3>
                  <p className="text-rovida-slate-green-gray">Your account is all set up. Enjoy Gestion Rovida!</p>
                  <Button onClick={handleOnboardingComplete} className="btn-primary">Go to Dashboard</Button>
                </div>
              </Step>
            </Stepper>
          </CardContent>
        </Card>
      </GlassSurface>
    </div>
  );
};

export default OnboardingPage;