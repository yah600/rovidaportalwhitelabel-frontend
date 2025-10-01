import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Payment } from '@/data/mock-payments';
import { format } from 'date-fns';

interface PaymentsTableProps {
  payments: Payment[];
}

const PaymentsTable = ({ payments }: PaymentsTableProps) => {
  const { t } = useTranslation();

  const getStatusVariant = (status: Payment['status']) => {
    switch (status) {
      case 'Completed':
        return 'default';
      case 'Failed':
        return 'destructive';
      case 'Refunded':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Bill ID</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">{payment.id}</TableCell>
              <TableCell>
                <Link to={`/finance/bills/${payment.billId}`} className="text-primary hover:underline">
                  {payment.billId}
                </Link>
              </TableCell>
              <TableCell>{payment.vendor}</TableCell>
              <TableCell>{payment.amount.toFixed(2)} {payment.currency}</TableCell>
              <TableCell>{payment.method}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(payment.status)}>{payment.status}</Badge>
              </TableCell>
              <TableCell>{format(payment.paymentDate, 'MMM dd, yyyy')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentsTable;