import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UploadCloud, FileText, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label'; // Import Label

const MaintenanceAgenda = () => {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [currentStep, setCurrentStep] = React.useState(1); // 1: Import, 2: Map, 3: Generate

  const breadcrumbItems = [
    { label: t('maintenance'), href: '/maintenance' },
    { label: t('agenda xlsx import'), href: '/maintenance/agenda' },
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      toast.info(`${t('file selected')}: ${event.target.files[0].name}`);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setSelectedFile(event.dataTransfer.files[0]);
      toast.info(`${t('file dropped')}: ${event.dataTransfer.files[0].name}`);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleImport = () => {
    if (selectedFile) {
      // Simulate file upload and processing
      toast.success(t('file imported successfully'), {
        description: `${t('ready for mapping')}: ${selectedFile.name}`,
      });
      setCurrentStep(2); // Move to mapping step
    } else {
      toast.error(t('please select file to import'));
    }
  };

  const handleMapColumns = () => {
    // Simulate column mapping
    toast.success(t('columns mapped successfully'), {
      description: t('preview generated tasks'),
    });
    setCurrentStep(3); // Move to generation step
  };

  const handleGenerateTasks = () => {
    // Simulate task generation
    toast.success(t('maintenance tasks generated'), {
      description: t('tasks visible calendar list'),
    });
    setSelectedFile(null);
    setCurrentStep(1); // Reset to import step
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('maintenance')} {t('agenda xlsx import')}</h1>
      <p className="text-rovida-slate-green-gray">{t('import maintenance schedules xlsx')}</p>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Step 1: Import */}
        <Card className="card-rovida">
          <CardHeader>
            <CardTitle className="text-rovida-navy">{t('step 1 import xlsx')}</CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">{t('drag drop select file')}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-rovida-soft-gray rounded-lg text-center text-rovida-slate-green-gray bg-white/60 h-48"
            >
              <UploadCloud className="h-12 w-12 mb-3 text-rovida-gold" />
              <p className="font-medium">{t('drag drop file here')}</p>
              <p className="text-sm">{t('or')}</p>
              <Input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".xls,.xlsx"
              />
              <Label htmlFor="file-upload" className="btn-secondary mt-3 cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2">
                {t('browse files')}
              </Label>
              {selectedFile && <p className="mt-2 text-rovida-near-black">{t('selected')}: {selectedFile.name}</p>}
            </div>
            <Button onClick={handleImport} disabled={!selectedFile || currentStep !== 1} className="btn-primary">
              <FileText className="mr-2 h-4 w-4" /> {t('import file')}
            </Button>
          </CardContent>
        </Card>

        {/* Step 2: Map Columns */}
        <Card className="card-rovida">
          <CardHeader>
            <CardTitle className="text-rovida-navy">{t('step 2 map columns')}</CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">{t('match file columns fields')}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex flex-col items-center justify-center p-6 border border-rovida-soft-gray rounded-lg text-center text-rovida-slate-green-gray bg-white/60 h-48">
              {currentStep >= 2 ? (
                <>
                  <CheckCircle className="h-12 w-12 mb-3 text-rovida-success" />
                  <p className="font-medium text-rovida-near-black">{t('file imported ready mapping')}</p>
                  <p className="text-sm">{t('column mapping interface here')}</p>
                </>
              ) : (
                <>
                  <XCircle className="h-12 w-12 mb-3 text-rovida-slate-green-gray" />
                  <p className="font-medium">{t('import file first')}</p>
                </>
              )}
            </div>
            <Button onClick={handleMapColumns} disabled={currentStep !== 2} className="btn-primary">
              {t('map columns preview')}
            </Button>
          </CardContent>
        </Card>

        {/* Step 3: Generate Tasks */}
        <Card className="card-rovida">
          <CardHeader>
            <CardTitle className="text-rovida-navy">{t('step 3 generate tasks')}</CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">{t('confirm create maintenance tasks')}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex flex-col items-center justify-center p-6 border border-rovida-soft-gray rounded-lg text-center text-rovida-slate-green-gray bg-white/60 h-48">
              {currentStep >= 3 ? (
                <>
                  <CheckCircle className="h-12 w-12 mb-3 text-rovida-success" />
                  <p className="font-medium text-rovida-near-black">{t('mapping complete ready generate')}</p>
                  <p className="text-sm">{t('preview tasks shown here')}</p>
                </>
              ) : (
                <>
                  <XCircle className="h-12 w-12 mb-3 text-rovida-slate-green-gray" />
                  <p className="font-medium">{t('map columns first')}</p>
                </>
              )}
            </div>
            <Button onClick={handleGenerateTasks} disabled={currentStep !== 3} className="btn-primary">
              {t('generate maintenance tasks')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MaintenanceAgenda;