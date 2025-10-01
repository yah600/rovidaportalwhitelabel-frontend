import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack';

const About = () => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { label: t('home'), href: '/' },
    { label: 'About Us', href: '/about' },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">About Gestion Rovida</h1>
      <p className="text-rovida-slate-green-gray">Learn more about our mission and values.</p>

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
          <ScrollStackItem itemClassName="bg-white/80 backdrop-blur-xl border-rovida-soft-gray shadow-subtle">
            <h2 className="text-rovida-navy">Our Mission</h2>
            <p className="text-rovida-near-black">
              To provide exceptional property management services, fostering thriving communities and maximizing property value for our clients.
            </p>
          </ScrollStackItem>
          <ScrollStackItem itemClassName="bg-white/80 backdrop-blur-xl border-rovida-soft-gray shadow-subtle">
            <h2 className="text-rovida-navy">Our Vision</h2>
            <p className="text-rovida-near-black">
              To be the leading property management firm, recognized for innovation, transparency, and unparalleled client satisfaction.
            </p>
          </ScrollStackItem>
          <ScrollStackItem itemClassName="bg-white/80 backdrop-blur-xl border-rovida-soft-gray shadow-subtle">
            <h2 className="text-rovida-navy">Our Values</h2>
            <p className="text-rovida-near-black">
              Integrity, Excellence, Community, Innovation, and Accountability. These principles guide every decision we make.
            </p>
          </ScrollStackItem>
          <ScrollStackItem itemClassName="bg-white/80 backdrop-blur-xl border-rovida-soft-gray shadow-subtle">
            <h2 className="text-rovida-navy">Our Team</h2>
            <p className="text-rovida-near-black">
              A dedicated team of professionals committed to delivering personalized and efficient service to every property and resident.
            </p>
          </ScrollStackItem>
        </ScrollStack>
      </div>
    </div>
  );
};

export default About;