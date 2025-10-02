import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useUser } from '@/context/UserContext';

const OnboardingPage = () => {
  const { t } = useTranslation(['onboarding', 'common']); // Specify namespaces for OnboardingPage
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useUser();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    role: '',
    building: '',
    unit: '',
    termsAccepted: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, termsAccepted: checked }));
  };

  const nextStep = () => {
    // Basic validation for current step before moving on
    if (step === 1 && (!formData.fullName || !formData.email || !formData.phone)) {
      toast.error(t('validation error', { ns: 'common' }), { description: t('fill all fields', { ns: 'onboarding' }) });
      return;
    }
    if (step === 2 && (!formData.role || !formData.building || !formData.unit)) {
      toast.error(t('validation error', { ns: 'common' }), { description: t('select all options', { ns: 'onboarding' }) });
      return;
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    if (!formData.termsAccepted) {
      toast.error(t('validation error', { ns: 'common' }), { description: t('accept terms conditions', { ns: 'onboarding' }) });
      return;
    }
    // Simulate API call to update user profile
    console.log('Onboarding data submitted:', formData);
    if (currentUser) {
      setCurrentUser({ ...currentUser, onboarded: true });
    }
    toast.success(t('onboarding complete', { ns: 'onboarding' }), { description: t('welcome to rovida', { ns: 'onboarding' }) });
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rovida-light-blue to-rovida-light-green p-4">
      <Card className="w-full max-w-lg bg-white/80 backdrop-blur-xl border-rovida-soft-gray shadow-lg">
        <CardHeader className="text-center">
          <img src="/AVERO.png" alt={t('welcome to gestion rovida', { ns: 'common' })} className="mx-auto h-10 w-auto mb-4" />
          <CardTitle className="text-2xl text-rovida-navy">{t('welcome to rovida', { ns: 'onboarding' })}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">
            {t('complete your profile to get started', { ns: 'onboarding' })}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-rovida-navy">{t('personal information', { ns: 'onboarding' })}</h3>
              <div>
                <Label htmlFor="fullName">{t('full name', { ns: 'common' })}</Label>
                <Input id="fullName" value={formData.fullName} onChange={handleInputChange} placeholder={t('enter full name', { ns: 'onboarding' })} />
              </div>
              <div>
                <Label htmlFor="email">{t('email', { ns: 'common' })}</Label>
                <Input id="email" type="email" value={formData.email} onChange={handleInputChange} placeholder={t('enter email', { ns: 'onboarding' })} />
              </div>
              <div>
                <Label htmlFor="phone">{t('phone number', { ns: 'common' })}</Label>
                <Input id="phone" value={formData.phone} onChange={handleInputChange} placeholder={t('enter phone number', { ns: 'onboarding' })} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-rovida-navy">{t('role and location', { ns: 'onboarding' })}</h3>
              <div>
                <Label htmlFor="role">{t('your role', { ns: 'onboarding' })}</Label>
                <Select onValueChange={(value) => handleSelectChange('role', value)} value={formData.role}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('select your role', { ns: 'onboarding' })} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owner">{t('owner', { ns: 'common' })}</SelectItem>
                    <SelectItem value="tenant">{t('tenant', { ns: 'common' })}</SelectItem>
                    <SelectItem value="board_member">{t('board member', { ns: 'common' })}</SelectItem>
                    <SelectItem value="property_manager">{t('property manager', { ns: 'common' })}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="building">{t('building', { ns: 'common' })}</Label>
                <Select onValueChange={(value) => handleSelectChange('building', value)} value={formData.building}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('select your building', { ns: 'onboarding' })} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="building_a">{t('building a', { ns: 'common' })}</SelectItem>
                    <SelectItem value="building_b">{t('building b', { ns: 'common' })}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="unit">{t('unit number', { ns: 'common' })}</Label>
                <Input id="unit" value={formData.unit} onChange={handleInputChange} placeholder={t('enter unit number', { ns: 'onboarding' })} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-rovida-navy">{t('terms and conditions', { ns: 'onboarding' })}</h3>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="termsAccepted"
                  checked={formData.termsAccepted}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label htmlFor="termsAccepted" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {t('i accept terms and conditions', { ns: 'onboarding' })}
                </Label>
              </div>
              <p className="text-sm text-rovida-slate-green-gray">
                {t('read our terms and conditions', { ns: 'onboarding' })}{' '}
                <Link to="/terms" className="link-rovida">{t('here', { ns: 'common' })}</Link>.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button variant="outline" onClick={prevStep} className="border-rovida-soft-gray text-rovida-near-black bg-white/60 backdrop-blur-sm hover:bg-rovida-soft-gray">
              {t('previous', { ns: 'common' })}
            </Button>
          )}
          {step < 3 && (
            <Button onClick={nextStep} className="ml-auto bg-rovida-gold text-white hover:bg-rovida-gold/90">
              {t('next', { ns: 'common' })}
            </Button>
          )}
          {step === 3 && (
            <Button onClick={handleSubmit} className="ml-auto bg-rovida-navy text-white hover:bg-rovida-navy/90">
              {t('finish', { ns: 'common' })}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default OnboardingPage;