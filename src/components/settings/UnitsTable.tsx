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
import { Unit } from '@/data/mock-units';

interface UnitsTableProps {
  units: Unit[];
}

const UnitsTable = ({ units }: UnitsTableProps) => {
  const { t } = useTranslation();

  const getStatusVariant = (status: Unit['status']) => {
    switch (status) {
      case 'Occupied':
        return 'default';
      case 'Vacant':
        return 'secondary';
      case 'Under Renovation':
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
            <TableHead>Unit Number</TableHead>
            <TableHead>Building</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Bedrooms</TableHead>
            <TableHead>Bathrooms</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {units.map((unit) => (
            <TableRow key={unit.id}>
              <TableCell className="font-medium">{unit.id}</TableCell>
              <TableCell>{unit.unitNumber}</TableCell>
              <TableCell>{unit.buildingName}</TableCell>
              <TableCell>{unit.owner}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(unit.status)}>{unit.status}</Badge>
              </TableCell>
              <TableCell>{unit.bedrooms}</TableCell>
              <TableCell>{unit.bathrooms}</TableCell>
              <TableCell className="text-right">
                {/* Add action buttons here, e.g., Edit, View Details */}
                <span className="text-sm text-muted-foreground">Manage</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UnitsTable;