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
import { cn } from '@/lib/utils'; // Import cn for utility classes

interface RolesTableProps {
  roles: Role[];
  className?: string; // Add className prop
}

const RolesTable = ({ roles, className }: RolesTableProps) => {
  const { t } = useTranslation();

  return (
    <div className={cn("rounded-md border border-rovida-soft-gray bg-white/80 backdrop-blur-xl shadow-subtle", className)}>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[100px] text-rovida-navy">{t('id')}</TableHead>
            <TableHead className="text-rovida-navy">{t('name')}</TableHead>
            <TableHead className="text-rovida-navy">{t('description')}</TableHead>
            <TableHead className="text-rovida-navy">{t('users')}</TableHead>
            <TableHead className="text-right text-rovida-navy">{t('actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id} className="hover:bg-rovida-soft-gray/50 transition-colors">
              <TableCell className="font-medium text-rovida-near-black">{role.id}</TableCell>
              <TableCell className="text-rovida-near-black">{t(role.name.toLowerCase())}</TableCell>
              <TableCell className="text-rovida-slate-green-gray">{role.description}</TableCell>
              <TableCell className="text-rovida-near-black">{role.usersCount}</TableCell>
              <TableCell className="text-right">
                {/* Add action buttons here, e.g., Edit Permissions */}
                <span className="text-sm text-rovida-slate-green-gray">{t('manage')}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RolesTable;