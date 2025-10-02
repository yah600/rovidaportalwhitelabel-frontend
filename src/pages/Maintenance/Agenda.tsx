import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UploadCloud, FileText, CheckCircle, XCircle, Table, LayoutList } from 'lucide-react'; // Added Table, LayoutList icons
import { toast } from 'sonner';
import { Label } from '@/components/ui/label'; // Import Label
import Stepper, { Step } from '@/components/Stepper'; // Import Stepper and Step

const MaintenanceAgenda = () => {
  const { t } = useTranslation(['maintenance', 'common']); // Specify namespaces
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [currentStep, setCurrentStep] = React.useState(1); // 1: Import, 2: Map, 3: Generate

  const breadcrumbItems = [
    { label: t('maintenance', { ns: 'maintenance' }), href: '/maintenance' },
    { label: t('agenda xlsx import', { ns: 'maintenance' }), href: '/maintenance/agenda' },
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      toast.info(`${t('file selected', { ns: 'maintenance' })}: ${event.target.files[0].name}`);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setSelectedFile(event.dataTransfer.files[0]);
      toast.info(`${t('file dropped', { ns: 'maintenance' })}: ${event.dataTransfer.files[0].name}`);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleImport = () => {
    if (selectedFile) {
      // Simulate file upload and processing
      toast.success(t('file imported successfully', { ns: 'maintenance' }), {
        description: `${t('ready for mapping', { ns: 'maintenance' })}: ${selectedFile.name}`,
      });
      setCurrentStep(2); // Move to mapping step
    } else {
      toast.error(t('please select file to import', { ns: 'maintenance' }));
    }
  };

  const handleMapColumns = () => {
    // Simulate column mapping
    toast.success(t('columns mapped successfully', { ns: 'maintenance' }), {
      description: t('preview generated tasks', { ns: 'maintenance' }),
    });
    setCurrentStep(3); // Move to generation step
  };

  const handleGenerateTasks = () => {
    // Simulate task generation
    toast.success(t('maintenance tasks generated', { ns: 'maintenance' }), {
      description: t('tasks visible calendar list', { ns: 'maintenance' }),
    });
    setSelectedFile(null);
    setCurrentStep(1); // Reset to import step
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('maintenance', { ns: 'maintenance' })} {t('agenda xlsx import', { ns: 'maintenance' })}</h1>
      <p className="text-rovida-slate-green-gray">{t('import maintenance schedules xlsx', { ns: 'maintenance' })}</p>

      <Card className="max-w-3xl mx-auto w-full card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('import maintenance agenda', { ns: 'maintenance' })}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">{t('follow steps import generate tasks', { ns: 'maintenance' })}</CardDescription>
        </CardHeader>
        <CardContent>
          <Stepper initialStep={currentStep} onStepChange={setCurrentStep} onFinalStepCompleted={handleGenerateTasks}>
            <Step>
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-rovida-navy">{t('step 1 import xlsx', { ns: 'maintenance' })}</h3>
                <p className="text-rovida-slate-green-gray">{t('drag drop select file', { ns: 'maintenance' })}</p>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-rovida-soft-gray rounded-lg text-center text-rovida-slate-green-gray bg-white/60 h-48"
                >
                  <UploadCloud className="h-12 w-12 mb-3 text-rovida-gold" />
                  <p className="font-medium">{t('drag drop file here', { ns: 'maintenance' })}</p>
                  <p className="text-sm">{t('or', { ns: 'maintenance' })}</p>
                  <Input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".xls,.xlsx"
                  />
                  <Label htmlFor="file-upload" className="btn-secondary mt-3 cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2">
                    {t('browse files', { ns: 'maintenance' })}
                  </Label>
                  {selectedFile && <p className="mt-2 text-rovida-near-black">{t('selected', { ns: 'maintenance' })}: {selectedFile.name}</p>}
                </div>
                <Button onClick={handleImport} disabled={!selectedFile} className="btn-primary">
                  <FileText className="mr-2 h-4 w-4" /> {t('import file', { ns: 'maintenance' })}
                </Button>
              </div>
            </Step>
            <Step>
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-rovida-navy">{t('step 2 map columns', { ns: 'maintenance' })}</h3>
                <p className="text-rovida-slate-green-gray">{t('match file columns fields', { ns: 'maintenance' })}</p>
                <div className="flex flex-col items-center justify-center p-6 border border-rovida-soft-gray rounded-lg text-center text-rovida-slate-green-gray bg-white/60 h-48">
                  <Table className="h-12 w-12 mb-3 text-rovida-gold" />
                  <p className="font-medium text-rovida-near-black">{t('column mapping interface here', { ns: 'maintenance' })}</p>
                  <p className="text-sm">{t('drag drop column headers to map them to task fields like title, description, due date, and assignee. This ensures your data is correctly interpreted.', { ns: 'maintenance' })}</p>
                </div>
                <Button onClick={handleMapColumns} className="btn-primary">
                  {t('map columns preview', { ns: 'maintenance' })}
                </Button>
              </div>
            </Step>
            <Step>
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-rovida-navy">{t('step 3 generate tasks', { ns: 'maintenance' })}</h3>
                <p className="text-rovida-slate-green-gray">{t('confirm create maintenance tasks', { ns: 'maintenance' })}</p>
                <div className="flex flex-col items-center justify-center p-6 border border-rovida-soft-gray rounded-lg text-center text-rovida-slate-green-gray bg-white/60 h-48">
                  <LayoutList className="h-12 w-12 mb-3 text-rovida-gold" />
                  <p className="font-medium text-rovida-near-black">{t('preview tasks shown here', { ns: 'maintenance' })}</p>
                  <p className="text-sm">{t('review the generated tasks below. You can make final adjustments before confirming their creation. Once confirmed, these tasks will appear in your maintenance schedule.', { ns: 'maintenance' })}</p>
                </div>
                <Button onClick={handleGenerateTasks} className="btn-primary">
                  {t('generate maintenance tasks', { ns: 'maintenance' })}
                </Button>
              </div>
            </Step>
          </Stepper>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceAgenda;