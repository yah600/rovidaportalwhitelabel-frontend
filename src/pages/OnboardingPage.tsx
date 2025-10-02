import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  const { t } = useTranslation(['onboarding', 'common', 'auth']); // Specify namespaces for OnboardingPage
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useUser();

  const initialRole = currentUser?.roles[0]?.name || '';

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    role: initialRole, // Pre-fill role if available
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

  const rolesRequiringUnit = ['Owner', 'Tenant'];
  const shouldShowUnitField = rolesRequiringUnit.includes(formData.role);

  const nextStep = () => {
    // Basic validation for current step before moving on
    if (step === 1 && (!formData.fullName || !formData.email || !formData.phone)) {
      toast.error(t('validation error', { ns: 'common' }), { description: t('fill all fields', { ns: 'onboarding' }) });
      return;
    }
    if (step === 2) {
      if (!formData.role || !formData.building) {
        toast.error(t('validation error', { ns: 'common' }), { description: t('select all options', { ns: 'onboarding' }) });
        return;
      }
      if (shouldShowUnitField && !formData.unit) {
        toast.error(t('validation error', { ns: 'common' }), { description: t('enter unit number', { ns: 'onboarding' }) });
        return;
      }
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
    toast.success(t('onboarding complete title', { ns: 'onboarding' }), { description: t('dashboard personalized description', { ns: 'onboarding' }) });
    navigate('/dashboard');
  };

  const isRolePreFilledAndDisabled = !!initialRole;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rovida-light-blue to-rovida-light-green p-4">
      <Card className="w-full max-w-lg bg-white/80 backdrop-blur-xl border-rovida-soft-gray shadow-lg">
        <CardHeader className="text-center">
          <img src="/AVERO.png" alt={t('welcome to gestion rovida', { ns: 'common' })} className="mx-auto h-10 w-auto mb-4" />
          <CardTitle className="text-2xl text-rovida-navy">{t('welcome onboard', { ns: 'onboarding' })}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">
            {t('setup account preferences', { ns: 'onboarding' })}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-rovida-navy">{t('step 1 personal info', { ns: 'onboarding' })}</h3>
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
              <h3 className="text-lg font-semibold text-rovida-navy">{t('step 2 building selection', { ns: 'onboarding' })}</h3>
              <div>
                <Label htmlFor="role">{t('your role', { ns: 'onboarding' })}</Label>
                <Select onValueChange={(value) => handleSelectChange('role', value)} value={formData.role} disabled={isRolePreFilledAndDisabled}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('select your role', { ns: 'onboarding' })} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Platform Owner">{t('platform owner', { ns: 'auth' })}</SelectItem>
                    <SelectItem value="Client Super-Administrator">{t('client super-administrator', { ns: 'auth' })}</SelectItem>
                    <SelectItem value="Condo Administrator">{t('condo administrator', { ns: 'auth' })}</SelectItem>
                    <SelectItem value="Property Manager">{t('property manager', { ns: 'auth' })}</SelectItem>
                    <SelectItem value="Accountant">{t('accountant', { ns: 'auth' })}</SelectItem>
                    <SelectItem value="Board Member">{t('board member', { ns: 'auth' })}</SelectItem>
                    <SelectItem value="Owner">{t('owner', { ns: 'auth' })}</SelectItem>
                    <SelectItem value="Tenant">{t('tenant', { ns: 'auth' })}</SelectItem>
                    <SelectItem value="Vendor / Service Provider">{t('vendor / service provider', { ns: 'auth' })}</SelectItem>
                    <SelectItem value="Emergency Agent">{t('emergency agent', { ns: 'auth' })}</SelectItem>
                    <SelectItem value="Concierge / Front Desk / Security">{t('concierge / front desk / security', { ns: 'auth' })}</SelectItem>
                    <SelectItem value="Building Maintenance Technician">{t('building maintenance technician', { ns: 'auth' })}</SelectItem>
                    <SelectItem value="Read-Only Auditor">{t('read-only auditor', { ns: 'auth' })}</SelectItem>
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
              {shouldShowUnitField && (
                <div>
                  <Label htmlFor="unit">{t('unit number', { ns: 'common' })}</Label>
                  <Input id="unit" value={formData.unit} onChange={handleInputChange} placeholder={t('enter unit number', { ns: 'onboarding' })} />
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-rovida-navy">{t('step 3 contact notifications', { ns: 'onboarding' })}</h3>
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
              {t('back', { ns: 'common' })}
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