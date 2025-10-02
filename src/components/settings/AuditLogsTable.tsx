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
import { AuditLog } from '@/data/mock-audit-logs';
import { format } from 'date-fns';
import { cn } from '@/lib/utils'; // Import cn for utility classes

interface AuditLogsTableProps {
  logs: AuditLog[];
  className?: string; // Add className prop
}

const AuditLogsTable = ({ logs, className }: AuditLogsTableProps) => {
  const { t } = useTranslation();

  return (
    <div className={cn("rounded-md border border-rovida-soft-gray bg-white/80 backdrop-blur-xl shadow-subtle", className)}>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[100px] text-rovida-navy">{t('id')}</TableHead>
            <TableHead className="text-rovida-navy">{t('timestamp')}</TableHead>
            <TableHead className="text-rovida-navy">{t('user')}</TableHead>
            <TableHead className="text-rovida-navy">{t('action')}</TableHead>
            <TableHead className="text-rovida-navy">{t('details')}</TableHead>
            <TableHead className="text-right text-rovida-navy">{t('ip address')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id} className="hover:bg-rovida-soft-gray/50 transition-colors">
              <TableCell className="font-medium text-rovida-near-black">{log.id}</TableCell>
              <TableCell className="text-rovida-near-black">{format(log.timestamp, 'MMM dd, yyyy HH:mm:ss')}</TableCell>
              <TableCell className="text-rovida-near-black">{log.user}</TableCell>
              <TableCell className="text-rovida-near-black">{log.action}</TableCell>
              <TableCell className="text-rovida-slate-green-gray text-sm">{log.details}</TableCell>
              <TableCell className="text-right text-rovida-near-black">{log.ipAddress}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AuditLogsTable;