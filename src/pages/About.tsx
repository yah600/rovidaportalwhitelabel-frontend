import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack';

const About = () => {
  const { t } = useTranslation(['about', 'common']); // Ensure 'about' and 'common' namespaces are loaded

  const breadcrumbItems = [
    { label: t('home', { ns: 'common' }), href: '/' },
    { label: t('about us', { ns: 'about' }), href: '/about' },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('about gestion rovida', { ns: 'about' })}</h1>
      <p className="text-rovida-slate-green-gray">{t('learn more mission values', { ns: 'about' })}</p>

      <div className="flex-1 h-[calc(100vh-200px)] overflow-hidden">
        <ScrollStack
          itemDistance={150}
          itemScale={0.05}
          itemStackDistance={40}
          stackPosition="25%"
          scaleEndPosition="15%"
          baseScale={0.8}
          rotationAmount={2}
          blurAmount={1}
          useWindowScroll={false}
        >
          <ScrollStackItem itemClassName="card-rovida">
            <h2 className="text-rovida-navy">{t('our mission', { ns: 'about' })}</h2>
            <p className="text-rovida-near-black">
              {t('mission description', { ns: 'about' })}
            </p>
          </ScrollStackItem>
          <ScrollStackItem itemClassName="card-rovida">
            <h2 className="text-rovida-navy">{t('our vision', { ns: 'about' })}</h2>
            <p className="text-rovida-near-black">
              {t('vision description', { ns: 'about' })}
            </p>
          </ScrollStackItem>
          <ScrollStackItem itemClassName="card-rovida">
            <h2 className="text-rovida-navy">{t('our values', { ns: 'about' })}</h2>
            <p className="text-rovida-near-black">
              {t('values description', { ns: 'about' })}
            </p>
          </ScrollStackItem>
          <ScrollStackItem itemClassName="card-rovida">
            <h2 className="text-rovida-navy">{t('our team', { ns: 'about' })}</h2>
            <p className="text-rovida-near-black">
              {t('team description', { ns: 'about' })}
            </p>
          </ScrollStackItem>
        </ScrollStack>
      </div>
    </div>
  );
};

export default About;