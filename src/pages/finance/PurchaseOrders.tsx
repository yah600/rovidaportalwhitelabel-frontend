import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShoppingCart, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockPurchaseOrders } from '@/mocks';
import PurchaseOrdersTable from '@/components/finance/PurchaseOrdersTable';
import { toast } from 'sonner'; // Import toast for actions
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

const PurchaseOrders = () => {
  const { t } = useTranslation(['finance', 'common']); // Ensure 'finance' and 'common' namespaces are loaded
  const { canRead, canCreate } = useAuth();

  const breadcrumbItems = [
    { label: t('finance', { ns: 'finance' }), href: '/finance' },
    { label: t('purchase orders', { ns: 'finance' }), href: '/finance/purchase-orders' },
  ];

  const hasPurchaseOrders = mockPurchaseOrders.length > 0;

  const handleCreateNewPurchaseOrder = () => {
    toast.info(t('create new purchase order action', { ns: 'finance' })); // Placeholder action with toast
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('purchase orders', { ns: 'finance' })}</h1>
        {canCreate('Finance') && ( // Assuming purchase orders are part of the general finance module
          <Button className="btn-primary" onClick={handleCreateNewPurchaseOrder}>
            <PlusCircle className="mr-2 h-4 w-4" /> {t('create new purchase order', { ns: 'finance' })}
          </Button>
        )}
      </header>
      <p className="text-rovida-slate-green-gray">{t('manage all purchase orders', { ns: 'finance' })}</p>

      {canRead('Finance') ? ( // Assuming purchase orders are part of the general finance module
        hasPurchaseOrders ? (
          <div className="card-rovida p-4"> {/* Wrapped content in card-rovida */}
            <PurchaseOrdersTable purchaseOrders={mockPurchaseOrders} />
          </div>
        ) : (
          <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
            <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
              <ShoppingCart className="h-12 w-12 text-rovida-gold" />
              <p>{t('purchase orders managed here', { ns: 'finance' })}</p>
              {canCreate('Finance') && (
                <Button variant="outline" className="mt-4 btn-secondary" onClick={handleCreateNewPurchaseOrder}>
                  <PlusCircle className="mr-2 h-4 w-4" /> {t('create first purchase order', { ns: 'finance' })}
                </Button>
              )}
            </div>
          </Card>
        )
      ) : (
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <ShoppingCart className="h-12 w-12 text-rovida-gold" />
            <p>{t('no permission view purchase orders', { ns: 'common' })}</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PurchaseOrders;