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
import { Building } from '@/data/mock-buildings';

interface BuildingsTableProps {
  buildings: Building[];
}

const BuildingsTable = ({ buildings }: BuildingsTableProps) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Units</TableHead>
            <TableHead>Year Built</TableHead>
            <TableHead>Property Manager</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {buildings.map((building) => (
            <TableRow key={building.id}>
              <TableCell className="font-medium">{building.id}</TableCell>
              <TableCell>{building.name}</TableCell>
              <TableCell>{building.address}</TableCell>
              <TableCell>{building.unitsCount}</TableCell>
              <TableCell>{building.yearBuilt}</TableCell>
              <TableCell>{building.propertyManager}</TableCell>
              <TableCell className="text-right">
                {/* Add action buttons here, e.g., Edit, View Units */}
                <span className="text-sm text-muted-foreground">Manage</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BuildingsTable;