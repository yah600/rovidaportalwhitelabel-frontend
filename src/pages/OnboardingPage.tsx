import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import Stepper, { Step } from '@/components/Stepper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress'; // Import Progress component
import GlassSurface from '@/components/GlassSurface'; // Import GlassSurface

const OnboardingPage = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('home'), href: '/' },
    { label: 'Onboarding', href: '/onboarding' },
  ];

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingComplete = () => {
    alert('Onboarding complete! Redirecting to dashboard...');
    // In a real app, you would redirect the user here, e.g., navigate('/dashboard');
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">Welcome Onboard!</h1>
      <p className="text-rovida-slate-green-gray">Let's set up your account and preferences.</p>

      <GlassSurface width="100%" height="auto" borderRadius={10} blur={15} backgroundOpacity={0.1} className="max-w-3xl mx-auto">
        <Card className="w-full bg-transparent border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-rovida-navy">Account Setup</CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">Follow these steps to get started.</CardDescription>
          </CardHeader>
          <CardContent>
            <Stepper onFinalStepCompleted={handleOnboardingComplete}>
              <Step>
                <div className="grid gap-4 text-rovida-near-black">
                  <h3 className="text-xl font-semibold">Step 1: Personal Information</h3>
                  <p className="text-rovida-slate-green-gray">Tell us a bit about yourself.</p>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="John Doe" className="border-rovida-soft-gray text-rovida-near-black bg-white/60" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" className="border-rovida-soft-gray text-rovida-near-black bg-white/60" />
                  </div>
                </div>
              </Step>
              <Step>
                <div className="grid gap-4 text-rovida-near-black">
                  <h3 className="text-xl font-semibold">Step 2: Building Selection</h3>
                  <p className="text-rovida-slate-green-gray">Choose the building you manage or reside in.</p>
                  <div className="grid gap-2">
                    <Label htmlFor="building">Select Building</Label>
                    <Input id="building" placeholder="Building A" className="border-rovida-soft-gray text-rovida-near-black bg-white/60" />
                  </div>
                </div>
              </Step>
              <Step>
                <div className="grid gap-4 text-rovida-near-black">
                  <h3 className="text-xl font-semibold">Step 3: Preferences & Loading</h3>
                  <p className="text-rovida-slate-green-gray">Setting up your dashboard based on your preferences.</p>
                  <div className="grid gap-2">
                    <Label htmlFor="theme">Preferred Theme</Label>
                    <Input id="theme" placeholder="Light / Dark" className="border-rovida-soft-gray text-rovida-near-black bg-white/60" />
                  </div>
                  <div className="mt-4">
                    <Label>Loading your personalized experience...</Label>
                    <Progress value={progress} className="w-full mt-2 h-2 bg-rovida-soft-gray [&>*]:bg-rovida-gold" />
                  </div>
                </div>
              </Step>
              <Step>
                <div className="grid gap-4 text-rovida-near-black">
                  <h3 className="text-xl font-semibold">Step 4: Ready to Go!</h3>
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