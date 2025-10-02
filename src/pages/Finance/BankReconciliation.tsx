import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { UploadCloud, Banknote, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

const FinanceBankReconciliation = () => {
  const { t } = useTranslation(['finance', 'common']);
  const { canRead, canCreate, canUpdate } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [reconciliationStatus, setReconciliationStatus] = useState<'idle' | 'processing' | 'completed' | 'failed'>('idle');
  const [reconciliationResults, setReconciliationResults] = useState<{ matched: number; unmatched: number; total: number } | null>(null);

  const breadcrumbItems = [
    { label: t('finance', { ns: 'finance' }), href: '/finance' },
    { label: t('bank reconciliation', { ns: 'finance' }), href: '/finance/bank-reconciliation' },
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setReconciliationStatus('idle');
      setReconciliationResults(null);
      toast.info(`${t('file selected', { ns: 'finance' })}: ${event.target.files[0].name}`);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setSelectedFile(event.dataTransfer.files[0]);
      setReconciliationStatus('idle');
      setReconciliationResults(null);
      toast.info(`${t('file dropped', { ns: 'finance' })}: ${event.dataTransfer.files[0].name}`);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleReconcile = () => {
    if (!selectedFile) {
      toast.error(t('please select file to import', { ns: 'finance' }));
      return;
    }

    setReconciliationStatus('processing');
    toast.info(t('reconciliation in progress', { ns: 'finance' }));

    // Simulate reconciliation process
    setTimeout(() => {
      const matched = Math.floor(Math.random() * 50) + 20; // 20-70 matched
      const total = matched + Math.floor(Math.random() * 10) + 5; // 5-15 unmatched
      const unmatched = total - matched;

      setReconciliationResults({ matched, unmatched, total });
      setReconciliationStatus('completed');
      toast.success(t('reconciliation complete', { ns: 'finance' }), {
        description: t('matched transactions', { ns: 'finance', matched, total }),
      });
    }, 2000);
  };

  if (!canRead('Finance - Late Fees/NSF/Reconciliation')) { // Assuming reconciliation is part of this module
    return (
      <div className="flex flex-1 items-center justify-center">
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <Banknote className="h-12 w-12 text-rovida-gold" />
            <p>{t('no permission view bank reconciliation', { ns: 'common' })}</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('bank reconciliation', { ns: 'finance' })}</h1>
      <p className="text-rovida-slate-green-gray">{t('import statements auto-match transactions', { ns: 'finance' })}</p>

      <Card className="max-w-3xl mx-auto w-full card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('import bank statement', { ns: 'finance' })}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">{t('upload csv ofx file', { ns: 'finance' })}</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-rovida-soft-gray rounded-lg text-center text-rovida-slate-green-gray bg-white/60 h-48 mb-4"
          >
            <UploadCloud className="h-12 w-12 mb-3 text-rovida-gold" />
            <p className="font-medium">{t('drag drop file here', { ns: 'finance' })}</p>
            <p className="text-sm">{t('or', { ns: 'common' })}</p>
            <Input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".csv,.ofx"
              disabled={!canCreate('Finance - Late Fees/NSF/Reconciliation')}
            />
            <Label htmlFor="file-upload" className="btn-secondary mt-3 cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2">
              {t('browse files', { ns: 'finance' })}
            </Label>
            {selectedFile && <p className="mt-2 text-rovida-near-black">{t('selected', { ns: 'finance' })}: {selectedFile.name}</p>}
          </div>
          {canUpdate('Finance - Late Fees/NSF/Reconciliation') && (
            <Button onClick={handleReconcile} disabled={!selectedFile || reconciliationStatus === 'processing'} className="w-full btn-primary">
              {reconciliationStatus === 'processing' ? t('reconciling', { ns: 'finance' }) : t('reconcile transactions', { ns: 'finance' })}
            </Button>
          )}

          {reconciliationResults && (
            <div className="mt-6 p-4 border border-rovida-soft-gray rounded-lg bg-white/60">
              <h3 className="text-lg font-semibold text-rovida-navy mb-2">{t('reconciliation results', { ns: 'finance' })}</h3>
              <div className="grid grid-cols-2 gap-2 text-rovida-near-black">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-rovida-success" />
                  <span>{t('matched', { ns: 'finance' })}: {reconciliationResults.matched}</span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-rovida-error" />
                  <span>{t('unmatched', { ns: 'finance' })}: {reconciliationResults.unmatched}</span>
                </div>
                <div className="col-span-2 text-rovida-slate-green-gray">
                  {t('total transactions', { ns: 'finance' })}: {reconciliationResults.total}
                </div>
              </div>
              <Button variant="outline" size="sm" className="btn-secondary mt-4" disabled={!canUpdate('Finance - Late Fees/NSF/Reconciliation')}>
                {t('review unmatched', { ns: 'finance' })}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceBankReconciliation;