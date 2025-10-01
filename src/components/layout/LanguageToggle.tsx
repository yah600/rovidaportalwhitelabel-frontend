"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
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