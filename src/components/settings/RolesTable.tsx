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
import { Role } from '@/data/mock-roles';

interface RolesTableProps {
  roles: Role[];
}

const RolesTable = ({ roles }: RolesTableProps) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">{t('id')}</TableHead>
            <TableHead>{t('name')}</TableHead>
            <TableHead>{t('description')}</TableHead>
            <TableHead>{t('users')}</TableHead>
            <TableHead className="text-right">{t('actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell className="font-medium">{role.id}</TableCell>
              <TableCell>{t(role.name.toLowerCase().replace(/ /g, ''))}</TableCell>
              <TableCell>{role.description}</TableCell>
              <TableCell>{role.usersCount}</TableCell>
              <TableCell className="text-right">
                {/* Add action buttons here, e.g., Edit Permissions */}
                <span className="text-sm text-muted-foreground">{t('manage')}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RolesTable;