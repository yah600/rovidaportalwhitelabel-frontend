import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash2, DollarSign } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockBills, Bill } from '@/data/mock-bills';
import { format } from 'date-fns';
import { toast } from 'sonner'; // Import toast for actions
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

const FinanceBillDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation(['finance', 'common']); // Ensure 'finance' and 'common' namespaces are loaded
  const { canUpdate, canDelete } = useAuth();

  const bill: Bill | undefined = mockBills.find((bill) => bill.id === id);

  if (!bill) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-rovida-slate-green-gray">{t('bill not found', { ns: 'finance' })}</p>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: t('finance', { ns: 'finance' }), href: '/finance' },
    { label: t('bills', { ns: 'finance' }), href: '/finance/bills' },
    { label: `${t('bill', { ns: 'finance' })} ${bill.id}`, href: `/finance/bills/${bill.id}` },
  ];

  const getStatusBadgeVariant = (status: Bill['status']) => {
    switch (status) {
      case 'Paid':
        return 'outline';
      case 'Due':
        return 'default';
      case 'Overdue':
        return 'destructive';
      case 'Pending Approval':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const handleEditBill = () => {
    toast.info(t('edit bill action', { ns: 'finance', id: bill.id })); // Placeholder action with toast
  };

  const handleMarkAsPaid = () => {
    toast.success(t('mark as paid action', { ns: 'finance', id: bill.id })); // Placeholder action with toast
  };

  const handleDeleteBill = () => {
    toast.error(t('delete bill action', { ns: 'finance', id: bill.id })); // Placeholder action with toast
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{bill.description}</h1>
        <div className="flex items-center gap-2">
          <Badge variant={getStatusBadgeVariant(bill.status)}>{t(bill.status.toLowerCase(), { ns: 'finance' })}</Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">{t('actions', { ns: 'common' })}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white/80 backdrop-blur-xl border-rovida-soft-gray text-rovida-near-black">
              <DropdownMenuLabel>{t('actions', { ns: 'common' })}</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-rovida-soft-gray" />
              {canUpdate('Finance - Bills/Recurring/Deposits') && (
                <DropdownMenuItem className="hover:bg-rovida-soft-gray" onClick={handleEditBill}>
                  <Edit className="mr-2 h-4 w-4" /> {t('edit bill', { ns: 'finance' })}
                </DropdownMenuItem>
              )}
              {canUpdate('Finance - Bills/Recurring/Deposits') && bill.status !== 'Paid' && (
                <DropdownMenuItem className="hover:bg-rovida-soft-gray" onClick={handleMarkAsPaid}>
                  <DollarSign className="mr-2 h-4 w-4" /> {t('mark as paid', { ns: 'finance' })}
                </DropdownMenuItem>
              )}
              {canDelete('Finance - Bills/Recurring/Deposits') && (
                <DropdownMenuItem className="text-destructive hover:bg-rovida-soft-gray" onClick={handleDeleteBill}>
                  <Trash2 className="mr-2 h-4 w-4" /> {t('delete bill', { ns: 'finance' })}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Card className="card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('bill details', { ns: 'finance' })}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2 text-rovida-near-black">
            <div className="font-medium">{t('id', { ns: 'common' })}:</div>
            <div>{bill.id}</div>
            <div className="font-medium">{t('vendor', { ns: 'finance' })}:</div>
            <div>{bill.vendor}</div>
            <div className="font-medium">{t('category', { ns: 'finance' })}:</div>
            <div>{bill.category}</div>
            <div className="font-medium">{t('amount', { ns: 'finance' })}:</div>
            <div>{bill.amount.toFixed(2)} {bill.currency}</div>
            <div className="font-medium">{t('issue date', { ns: 'finance' })}:</div>
            <div>{format(bill.issueDate, 'MMM dd, yyyy')}</div>
            <div className="font-medium">{t('due date', { ns: 'finance' })}:</div>
            <div>{format(bill.dueDate, 'MMM dd, yyyy')}</div>
            {bill.paidDate && (
              <>
                <div className="font-medium">{t('paid date', { ns: 'finance' })}:</div>
                <div>{format(bill.paidDate, 'MMM dd, yyyy')}</div>
              </>
            )}
          </div>
          <Separator className="bg-rovida-soft-gray" />
          <div>
            <h4 className="font-medium mb-2 text-rovida-navy">{t('description', { ns: 'common' })}:</h4>
            <p className="text-rovida-slate-green-gray">{bill.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceBillDetail;