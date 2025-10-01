import React from 'react';
import { useTranslation } from 'react-i18next';
import { mockAuditLogs } from '@/data/mock-audit-logs';
import AuditLogsTable from '@/components/settings/AuditLogsTable';

const SettingsAudit = () => {
  const { t } = useTranslation();

  const hasLogs = mockAuditLogs.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">Audit Log</h1>
        {/* Potentially add filters or export button here */}
      </header>

      {hasLogs ? (
        <AuditLogsTable logs={mockAuditLogs} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              No audit logs found.
            </h3>
            <p className="text-sm text-muted-foreground">
              Activity logs will appear here as users interact with the system.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsAudit;