import React from 'react';
import CardNav from '@/components/CardNav';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner'; // Import toast for actions

// Placeholder for a logo image
const logo = '/public/AVERO.png'; // Using the provided AVERO.png logo

const CardNavDemo = () => {
  const { t } = useTranslation(['about', 'common']); // Ensure 'about' and 'common' namespaces are loaded

  const handleGetStarted = () => {
    toast.info(t('get started action', { ns: 'common' })); // Placeholder action with toast
  };

  const items = [
    {
      label: t("about", { ns: 'about' }),
      bgColor: "#183747", // Rovida Navy
      textColor: "#fff",
      links: [
        { label: t("company", { ns: 'common' }), ariaLabel: t("about company", { ns: 'common' }), href: "/about" },
        { label: t("careers", { ns: 'common' }), ariaLabel: t("about careers", { ns: 'common' }), href: "#", onClick: () => toast.info(t('careers link action', { ns: 'common' })) } // Placeholder action with toast
      ]
    },
    {
      label: t("projects", { ns: 'common' }),
      bgColor: "#2A4959", // Rovida Navy 90
      textColor: "#fff",
      links: [
        { label: t("featured", { ns: 'common' }), ariaLabel: t("featured projects", { ns: 'common' }), href: "#", onClick: () => toast.info(t('featured projects link action', { ns: 'common' })) }, // Placeholder action with toast
        { label: t("case studies", { ns: 'common' }), ariaLabel: t("project case studies", { ns: 'common' }), href: "#", onClick: () => toast.info(t('case studies link action', { ns: 'common' })) } // Placeholder action with toast
      ]
    },
    {
      label: t("contact", { ns: 'common' }),
      bgColor: "#7C8D89", // Rovida Slate Green Gray
      textColor: "#fff",
      links: [
        { label: t("email", { ns: 'common' }), ariaLabel: t("email us", { ns: 'common' }), href: "mailto:contact@example.com" }, // Actual email link
        { label: t("twitter", { ns: 'common' }), ariaLabel: t("twitter", { ns: 'common' }), href: "https://twitter.com", target: "_blank" }, // External link
        { label: t("linkedin", { ns: 'common' }), ariaLabel: t("linkedin", { ns: 'common' }), href: "https://linkedin.com", target: "_blank" } // External link
      ]
    }
  ];

  const breadcrumbItems = [
    { label: t('home', { ns: 'common' }), href: '/' },
    { label: t('card navigation demo', { ns: 'about' }), href: '/cardnav-demo' },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('card navigation demo', { ns: 'about' })}</h1>
      <p className="text-rovida-slate-green-gray">{t('explore interactive card menu', { ns: 'about' })}</p>

      <Card className="flex-1 flex flex-col items-center justify-center p-8 card-rovida">
        <CardHeader className="text-center">
          <CardTitle className="text-rovida-navy">{t('interactive navigation', { ns: 'about' })}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">{t('click hamburger expand menu', { ns: 'about' })}</CardDescription>
        </CardHeader>
        <CardContent className="w-full h-full flex items-center justify-center">
          <CardNav
            logo={logo}
            logoAlt={t('gestion rovida logo', { ns: 'common' })} // Use translation for alt text
            items={items}
            baseColor="#E9ECEB" // Rovida Soft Gray
            menuColor="#183747" // Rovida Navy
            buttonBgColor="#C4972E" // Rovida Gold
            buttonTextColor="#fff"
            ease="power3.out"
            onCtaClick={handleGetStarted} // Wire CTA button
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CardNavDemo;