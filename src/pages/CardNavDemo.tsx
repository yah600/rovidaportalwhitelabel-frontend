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
      label: "About",
      bgColor: "#183747", // Rovida Navy
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company", href: "/about" },
        { label: "Careers", ariaLabel: "About Careers", href: "#" }
      ]
    },
    {
      label: "Projects",
      bgColor: "#2A4959", // Rovida Navy 90
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects", href: "#" },
        { label: "Case Studies", ariaLabel: "Project Case Studies", href: "#" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#7C8D89", // Rovida Slate Green Gray
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us", href: "#" },
        { label: "Twitter", ariaLabel: "Twitter", href: "#" },
        { label: "LinkedIn", ariaLabel: "LinkedIn", href: "#" }
      ]
    }
  ];

  const breadcrumbItems = [
    { label: t('home'), href: '/' },
    { label: 'CardNav Demo', href: '/cardnav-demo' },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">Card Navigation Demo</h1>
      <p className="text-rovida-slate-green-gray">Explore the interactive card-based navigation menu.</p>

      <Card className="flex-1 flex flex-col items-center justify-center p-8 card-rovida">
        <CardHeader className="text-center">
          <CardTitle className="text-rovida-navy">Interactive Navigation</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">Click the hamburger icon to expand the menu.</CardDescription>
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