import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarCheck, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockAmenities } from '@/data/mock-amenities';
import AmenitiesTable from '@/components/amenities/AmenitiesTable';
import { toast } from 'sonner'; // Import toast for actions
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

const Amenities = () => {
  const { t } = useTranslation(['amenities', 'common']); // Ensure 'amenities' and 'common' namespaces are loaded
  const { canRead, canCreate } = useAuth();

  const breadcrumbItems = [
    { label: t('home', { ns: 'common' }), href: '/' },
    { label: t('amenity management', { ns: 'amenities' }), href: '/amenities' },
  ];

  const hasAmenities = mockAmenities.length > 0;

  const handleAddAmenity = () => {
    toast.info(t('add new amenity action', { ns: 'amenities' })); // Placeholder action with toast
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('amenity management', { ns: 'amenities' })}</h1>
        {canCreate('Amenities') && (
          <Button className="btn-primary" onClick={handleAddAmenity}>
            <PlusCircle className="mr-2 h-4 w-4" /> {t('add new amenity', { ns: 'amenities' })}
          </Button>
        )}
      </header>
      <p className="text-rovida-slate-green-gray">{t('manage book amenities', { ns: 'amenities' })}</p>

      {canRead('Amenities') ? (
        hasAmenities ? (
          <div className="card-rovida p-4"> {/* Wrapped content in card-rovida */}
            <AmenitiesTable amenities={mockAmenities} />
          </div>
        ) : (
          <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
            <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
              <CalendarCheck className="h-12 w-12 text-rovida-gold" />
              <p>{t('amenities managed here', { ns: 'amenities' })}</p>
              {canCreate('Amenities') && (
                <Button variant="outline" className="mt-4 btn-secondary" onClick={handleAddAmenity}>
                  <PlusCircle className="mr-2 h-4 w-4" /> {t('add first amenity', { ns: 'amenities' })}
                </Button>
              )}
            </div>
          </Card>
        )
      ) : (
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <CalendarCheck className="h-12 w-12 text-rovida-gold" />
            <p>{t('no permission view amenities', { ns: 'common' })}</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Amenities;