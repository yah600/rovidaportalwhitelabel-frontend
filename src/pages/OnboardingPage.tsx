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
      toast.success(t('onboarding_complete_title'), {
        description: t('dashboard_personalized_description'),
      });
      navigate('/dashboard');
    }
  };

  const breadcrumbItems = [
    { label: t('home'), href: '/' },
    { label: t('onboarding'), href: '/onboarding' },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4 items-center">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title text-center">{t('welcome_onboard')}</h1>
      <p className="text-rovida-slate-green-gray text-center">{t('setup_account_preferences')}</p>

      <GlassSurface width="100%" height="auto" borderRadius={10} blur={15} backgroundOpacity={0.1} className="max-w-3xl mx-auto p-4">
        <Card className="w-full bg-transparent border-none shadow-none">
          <CardHeader className="text-center">
            <CardTitle className="text-rovida-navy">{t('account_setup')}</CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">{t('follow_steps_get_started')}</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Stepper onFinalStepCompleted={handleOnboardingComplete} nextButtonText={t('next')} backButtonText={t('back')}>
              <Step>
                <div className="grid gap-4 text-rovida-near-black text-left">
                  <h3 className="text-xl font-semibold">{t('step_1_personal_info')}</h3>
                  <p className="text-rovida-slate-green-gray">{t('tell_us_about_yourself')}</p>
                  <div className="grid gap-2">
                    <Label htmlFor="name">{t('your_name')}</Label>
                    <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} className="border-rovida-soft-gray text-rovida-near-black bg-white/60" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">{t('email')}</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="border-rovida-soft-gray text-rovida-near-black bg-white/60" />
                  </div>
                </div>
              </Step>
              <Step>
                <div className="grid gap-4 text-rovida-near-black text-left">
                  <h3 className="text-xl font-semibold">{t('step_2_building_selection')}</h3>
                  <p className="text-rovida-slate-green-gray">{t('choose_building_manage_reside')}</p>
                  <div className="grid gap-2">
                    <Label htmlFor="building">{t('select_building')}</Label>
                    <Input id="building" placeholder="Building A" value={building} onChange={(e) => setBuilding(e.target.value)} className="border-rovida-soft-gray text-rovida-near-black bg-white/60" />
                  </div>
                </div>
              </Step>
              <Step>
                <div className="grid gap-4 text-rovida-near-black text-left">
                  <h3 className="text-xl font-semibold">{t('step_3_contact_notifications')}</h3>
                  <p className="text-rovida-slate-green-gray">{t('how_reach_you_updates')}</p>
                  <div className="grid gap-2">
                    <Label htmlFor="phoneNumber">{t('phone_number')}</Label>
                    <Input id="phoneNumber" type="tel" placeholder="+1 (555) 123-4567" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="border-rovida-soft-gray text-rovida-near-black bg-white/60" />
                  </div>
                  <div className="grid gap-2 mt-4">
                    <h4 className="font-medium">{t('email_notifications')}</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-issues" className="flex flex-col space-y-1 text-rovida-near-black">
                        <span>{t('new_issue_alerts')}</span>
                        <span className="font-normal leading-snug text-rovida-slate-green-gray">
                          {t('receive_email_new_issue')}
                        </span>
                      </Label>
                      <Switch id="email-issues" checked={notificationPreferences.emailIssues} onCheckedChange={(checked) => setNotificationPreferences(prev => ({ ...prev, emailIssues: !!checked }))} className="data-[state=checked]:bg-rovida-gold" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-announcements" className="flex flex-col space-y-1 text-rovida-near-black">
                        <span>{t('announcements_email')}</span>
                        <span className="font-normal leading-snug text-rovida-slate-green-gray">
                          {t('get_emails_announcements')}
                        </span>
                      </Label>
                      <Switch id="email-announcements" checked={notificationPreferences.emailAnnouncements} onCheckedChange={(checked) => setNotificationPreferences(prev => ({ ...prev, emailAnnouncements: !!checked }))} className="data-[state=checked]:bg-rovida-gold" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-billing" className="flex flex-col space-y-1 text-rovida-near-black">
                        <span>{t('billing_reminders')}</span>
                        <span className="font-normal leading-snug text-rovida-slate-green-gray">
                          {t('receive_reminders_bill_due_dates')}
                        </span>
                      </Label>
                      <Switch id="email-billing" checked={notificationPreferences.emailBilling} onCheckedChange={(checked) => setNotificationPreferences(prev => ({ ...prev, emailBilling: !!checked }))} className="data-[state=checked]:bg-rovida-gold" />
                    </div>
                  </div>
                  <div className="grid gap-2 mt-4">
                    <h4 className="font-medium">{t('sms_notifications')}</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms-emergency" className="flex flex-col space-y-1 text-rovida-near-black">
                        <span>{t('emergency_alerts')}</span>
                        <span className="font-normal leading-snug text-rovida-slate-green-gray">
                          {t('receive_critical_alerts_sms')}
                        </span>
                      </Label>
                      <Switch id="sms-emergency" checked={notificationPreferences.smsEmergency} onCheckedChange={(checked) => setNotificationPreferences(prev => ({ ...prev, smsEmergency: !!checked }))} className="data-[state=checked]:bg-rovida-gold" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms-maintenance" className="flex flex-col space-y-1 text-rovida-near-black">
                        <span>{t('maintenance_updates')}</span>
                        <span className="font-normal leading-snug text-rovida-slate-green-gray">
                          {t('get_sms_maintenance_work')}
                        </span>
                      </Label>
                      <Switch id="sms-maintenance" checked={notificationPreferences.smsMaintenance} onCheckedChange={(checked) => setNotificationPreferences(prev => ({ ...prev, smsMaintenance: !!checked }))} className="data-[state=checked]:bg-rovida-gold" />
                    </div>
                  </div>
                </div>
              </Step>
              <Step>
                <div className="grid gap-4 text-rovida-near-black text-left">
                  <h3 className="text-xl font-semibold">{t('step_4_finalizing_setup')}</h3>
                  <p className="text-rovida-slate-green-gray">{t('setting_up_dashboard')}</p>
                  <div className="mt-4">
                    <Label>{t('loading_personalized_experience')}</Label>
                    <Progress value={progress} className="w-full mt-2 h-2 bg-rovida-soft-gray [&>*]:bg-rovida-gold" />
                  </div>
                </div>
              </Step>
              <Step>
                <div className="grid gap-4 text-rovida-near-black text-left">
                  <h3 className="text-xl font-semibold">{t('step_5_ready_to_go')}</h3>
                  <p className="text-rovida-slate-green-gray">{t('account_set_up_enjoy')}</p>
                  <Button onClick={handleOnboardingComplete} className="btn-primary">{t('go_to_dashboard')}</Button>
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