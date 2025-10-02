import React from 'react';
import CardNav from '@/components/CardNav';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Placeholder for a logo image
const logo = '/public/placeholder.svg';

const CardNavDemo = () => {
  const { t } = useTranslation();

  const items = [
    {
      label: t("about"),
      bgColor: "#183747", // Rovida Navy
      textColor: "#fff",
      links: [
        { label: t("company"), ariaLabel: t("about_company"), href: "/about" },
        { label: t("careers"), ariaLabel: t("about_careers"), href: "#" }
      ]
    },
    {
      label: t("projects"),
      bgColor: "#2A4959", // Rovida Navy 90
      textColor: "#fff",
      links: [
        { label: t("featured"), ariaLabel: t("featured_projects"), href: "#" },
        { label: t("case_studies"), ariaLabel: t("project_case_studies"), href: "#" }
      ]
    },
    {
      label: t("contact"),
      bgColor: "#7C8D89", // Rovida Slate Green Gray
      textColor: "#fff",
      links: [
        { label: t("email"), ariaLabel: t("email_us"), href: "#" },
        { label: t("twitter"), ariaLabel: t("twitter"), href: "#" },
        { label: t("linkedin"), ariaLabel: t("linkedin"), href: "#" }
      ]
    }
  ];

  const breadcrumbItems = [
    { label: t('home'), href: '/' },
    { label: t('card_navigation_demo'), href: '/cardnav-demo' },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('card_navigation_demo')}</h1>
      <p className="text-rovida-slate-green-gray">{t('explore_interactive_card_menu')}</p>

      <Card className="flex-1 flex flex-col items-center justify-center p-8 card-rovida">
        <CardHeader className="text-center">
          <CardTitle className="text-rovida-navy">{t('interactive_navigation')}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">{t('click_hamburger_expand_menu')}</CardDescription>
        </CardHeader>
        <CardContent className="w-full h-full flex items-center justify-center">
          <CardNav
            logo={logo}
            logoAlt="Gestion Rovida Logo"
            items={items}
            baseColor="#E9ECEB" // Rovida Soft Gray
            menuColor="#183747" // Rovida Navy
            buttonBgColor="#C4972E" // Rovida Gold
            buttonTextColor="#fff"
            ease="power3.out"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CardNavDemo;