"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageToggle = () => {
  const { i18n, t } = useTranslation(); 

  // Log the current language whenever the component re-renders
  console.log('LanguageToggle: Current i18n.language:', i18n.language);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    console.log('LanguageToggle: Attempting to change language to:', newLang);
    i18n.changeLanguage(newLang).then(() => {
      console.log('LanguageToggle: Language changed successfully to:', i18n.language);
    }).catch(err => {
      console.error('LanguageToggle: Failed to change language:', err);
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="border-rovida-soft-gray text-rovida-near-black bg-white/60 backdrop-blur-sm hover:bg-rovida-soft-gray"
    >
      <Globe className="h-4 w-4 mr-2" />
      {i18n.language.toUpperCase()}
    </Button>
  );
};

export default LanguageToggle;