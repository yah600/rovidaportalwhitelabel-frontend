import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack';

const About = () => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { label: t('home'), href: '/' },
    { label: t('about_us'), href: '/about' },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('about_gestion_rovida')}</h1>
      <p className="text-rovida-slate-green-gray">{t('learn_more_mission_values')}</p>

      <div className="flex-1 h-[calc(100vh-200px)] overflow-hidden"> {/* Adjust height as needed */}
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
            <h2 className="text-rovida-navy">{t('our_mission')}</h2>
            <p className="text-rovida-near-black">
              {t('mission_description')}
            </p>
          </ScrollStackItem>
          <ScrollStackItem itemClassName="card-rovida">
            <h2 className="text-rovida-navy">{t('our_vision')}</h2>
            <p className="text-rovida-near-black">
              {t('vision_description')}
            </p>
          </ScrollStackItem>
          <ScrollStackItem itemClassName="card-rovida">
            <h2 className="text-rovida-navy">{t('our_values')}</h2>
            <p className="text-rovida-near-black">
              {t('values_description')}
            </p>
          </ScrollStackItem>
          <ScrollStackItem itemClassName="card-rovida">
            <h2 className="text-rovida-navy">{t('our_team')}</h2>
            <p className="text-rovida-near-black">
              {t('team_description')}
            </p>
          </ScrollStackItem>
        </ScrollStack>
      </div>
    </div>
  );
};

export default About;