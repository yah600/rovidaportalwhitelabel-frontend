import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShoppingCart, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockPurchaseOrders } from '@/data/mock-purchase-orders';
import PurchaseOrdersTable from '@/components/finance/PurchaseOrdersTable';

const PurchaseOrders = () => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { label: t('finance'), href: '/finance' },
    { label: t('purchase_orders'), href: '/finance/purchase-orders' },
  ];

  const hasPurchaseOrders = mockPurchaseOrders.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('purchase_orders')}</h1>
        <Button className="btn-primary">
          <PlusCircle className="mr-2 h-4 w-4" /> {t('create_new_purchase_order')}
        </Button>
      </header>
      <p className="text-rovida-slate-green-gray">{t('manage_all_purchase_orders')}</p>

      {hasPurchaseOrders ? (
        <PurchaseOrdersTable purchaseOrders={mockPurchaseOrders} />
      ) : (
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <ShoppingCart className="h-12 w-12 text-rovida-gold" />
            <p>{t('purchase_orders_managed_here')}</p>
            <Button variant="outline" className="mt-4 btn-secondary">
              <PlusCircle className="mr-2 h-4 w-4" /> {t('create_first_purchase_order')}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PurchaseOrders;