import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarCheck, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockAmenities } from '@/data/mock-amenities'; // Import mockAmenities
import AmenitiesTable from '@/components/amenities/AmenitiesTable'; // Import AmenitiesTable

const Amenities = () => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { label: t('home'), href: '/' },
    { label: t('amenity_management'), href: '/amenities' },
  ];

  const hasAmenities = mockAmenities.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('amenity_management')}</h1>
        <Button className="btn-primary">
          <PlusCircle className="mr-2 h-4 w-4" /> {t('add_new_amenity')}
        </Button>
      </header>
      <p className="text-rovida-slate-green-gray">{t('manage_book_amenities')}</p>

      {hasAmenities ? (
        <AmenitiesTable amenities={mockAmenities} />
      ) : (
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <CalendarCheck className="h-12 w-12 text-rovida-gold" />
            <p>{t('amenities_managed_here')}</p>
            <Button variant="outline" className="mt-4 btn-secondary">
              <PlusCircle className="mr-2 h-4 w-4" /> {t('add_first_amenity')}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Amenities;