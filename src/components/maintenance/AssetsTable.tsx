import React from 'react';
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
import { Asset } from '@/data/mock-assets';
import { format } from 'date-fns';

interface AssetsTableProps {
  assets: Asset[];
}

const AssetsTable = ({ assets }: AssetsTableProps) => {
  const { t } = useTranslation();

  const getStatusVariant = (status: Asset['status']) => {
    switch (status) {
      case 'Operational':
        return 'default';
      case 'Under Maintenance':
        return 'secondary';
      case 'Retired':
        return 'destructive';
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
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Maintenance</TableHead>
            <TableHead>Next Maintenance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell className="font-medium">{asset.id}</TableCell>
              <TableCell>{asset.name}</TableCell>
              <TableCell>{asset.type}</TableCell>
              <TableCell>{asset.location}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(asset.status)}>{asset.status}</Badge>
              </TableCell>
              <TableCell>{format(asset.lastMaintenance, 'MMM dd, yyyy')}</TableCell>
              <TableCell>{format(asset.nextMaintenance, 'MMM dd, yyyy')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AssetsTable;