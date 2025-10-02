import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack';

const About = () => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { label: t('home'), href: '/' },
    { label: t('about us'), href: '/about' },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('about gestion rovida')}</h1>
      <p className="text-rovida-slate-green-gray">{t('learn more mission values')}</p>

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
            <h2 className="text-rovida-navy">{t('our mission')}</h2>
            <p className="text-rovida-near-black">
              {t('mission description')}
            </p>
          </ScrollStackItem>
          <ScrollStackItem itemClassName="card-rovida">
            <h2 className="text-rovida-navy">{t('our vision')}</h2>
            <p className="text-rovida-near-black">
              {t('vision description')}
            </p>
          </ScrollStackItem>
          <ScrollStackItem itemClassName="card-rovida">
            <h2 className="text-rovida-navy">{t('our values')}</h2>
            <p className="text-rovida-near-black">
              {t('values description')}
            </p>
          </ScrollStackItem>
          <ScrollStackItem itemClassName="card-rovida">
            <h2 className="text-rovida-navy">{t('our team')}</h2>
            <p className="text-rovida-near-black">
              {t('team description')}
            </p>
          </ScrollStackItem>
        </ScrollStack>
      </div>
    </div>
  );
};

export default About;