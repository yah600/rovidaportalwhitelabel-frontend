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
import { Bill } from '@/data/mock-bills';
import { format } from 'date-fns';

interface BillsTableProps {
  bills: Bill[];
}

const BillsTable = ({ bills }: BillsTableProps) => {
  const { t } = useTranslation();

  const getStatusVariant = (status: Bill['status']) => {
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

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bills.map((bill) => (
            <TableRow key={bill.id}>
              <TableCell className="font-medium">
                <Link to={`/finance/bills/${bill.id}`} className="text-primary hover:underline">
                  {bill.id}
                </Link>
              </TableCell>
              <TableCell>{bill.vendor}</TableCell>
              <TableCell>{bill.description}</TableCell>
              <TableCell>{bill.amount.toFixed(2)} {bill.currency}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(bill.status)}>{bill.status}</Badge>
              </TableCell>
              <TableCell>{format(bill.dueDate, 'MMM dd, yyyy')}</TableCell>
              <TableCell className="text-right">
                <Link to={`/finance/bills/${bill.id}`} className="text-sm text-muted-foreground hover:underline">
                  View
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BillsTable;