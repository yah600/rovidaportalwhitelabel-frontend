import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UploadCloud, FileText, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

const MaintenanceAgenda = () => {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [currentStep, setCurrentStep] = React.useState(1); // 1: Import, 2: Map, 3: Generate

  const breadcrumbItems = [
    { label: t('maintenance'), href: '/maintenance' },
    { label: 'Agenda (XLSX)', href: '/maintenance/agenda' },
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      toast.info(`File selected: ${event.target.files[0].name}`);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setSelectedFile(event.dataTransfer.files[0]);
      toast.info(`File dropped: ${event.dataTransfer.files[0].name}`);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleImport = () => {
    if (selectedFile) {
      // Simulate file upload and processing
      toast.success("File imported successfully!", {
        description: `Ready for mapping: ${selectedFile.name}`,
      });
      setCurrentStep(2); // Move to mapping step
    } else {
      toast.error("Please select a file to import.");
    }
  };

  const handleMapColumns = () => {
    // Simulate column mapping
    toast.success("Columns mapped successfully!", {
      description: "Preview generated tasks.",
    });
    setCurrentStep(3); // Move to generation step
  };

  const handleGenerateTasks = () => {
    // Simulate task generation
    toast.success("Maintenance tasks generated!", {
      description: "Tasks are now visible in the calendar and task list.",
    });
    setSelectedFile(null);
    setCurrentStep(1); // Reset to import step
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('maintenance')} Agenda (XLSX Import)</h1>
      <p className="text-rovida-slate-green-gray">Import maintenance schedules from XLSX files.</p>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Step 1: Import */}
        <Card className="bg-white/80 backdrop-blur-xl border-rovida-soft-gray shadow-subtle">
          <CardHeader>
            <CardTitle className="text-rovida-navy">Step 1: Import XLSX File</CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">Drag & drop or select your maintenance agenda file.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-rovida-soft-gray rounded-lg text-center text-rovida-slate-green-gray bg-white/60 h-48"
            >
              <UploadCloud className="h-12 w-12 mb-3 text-rovida-gold" />
              <p className="font-medium">Drag & drop your file here</p>
              <p className="text-sm">or</p>
              <Input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".xls,.xlsx"
              />
              <Label htmlFor="file-upload" className="btn-secondary mt-3 cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2">
                Browse Files
              </Label>
              {selectedFile && <p className="mt-2 text-rovida-near-black">Selected: {selectedFile.name}</p>}
            </div>
            <Button onClick={handleImport} disabled={!selectedFile || currentStep !== 1} className="btn-primary">
              <FileText className="mr-2 h-4 w-4" /> Import File
            </Button>
          </CardContent>
        </Card>

        {/* Step 2: Map Columns */}
        <Card className="bg-white/80 backdrop-blur-xl border-rovida-soft-gray shadow-subtle">
          <CardHeader>
            <CardTitle className="text-rovida-navy">Step 2: Map Columns</CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">Match your file columns to agenda fields.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex flex-col items-center justify-center p-6 border border-rovida-soft-gray rounded-lg text-center text-rovida-slate-green-gray bg-white/60 h-48">
              {currentStep >= 2 ? (
                <>
                  <CheckCircle className="h-12 w-12 mb-3 text-rovida-success" />
                  <p className="font-medium text-rovida-near-black">File imported. Ready for mapping.</p>
                  <p className="text-sm">Column mapping interface will appear here.</p>
                </>
              ) : (
                <>
                  <XCircle className="h-12 w-12 mb-3 text-rovida-slate-green-gray" />
                  <p className="font-medium">Import file first.</p>
                </>
              )}
            </div>
            <Button onClick={handleMapColumns} disabled={currentStep !== 2} className="btn-primary">
              Map Columns & Preview
            </Button>
          </CardContent>
        </Card>

        {/* Step 3: Generate Tasks */}
        <Card className="bg-white/80 backdrop-blur-xl border-rovida-soft-gray shadow-subtle">
          <CardHeader>
            <CardTitle className="text-rovida-navy">Step 3: Generate Tasks</CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">Confirm and create maintenance tasks.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex flex-col items-center justify-center p-6 border border-rovida-soft-gray rounded-lg text-center text-rovida-slate-green-gray bg-white/60 h-48">
              {currentStep >= 3 ? (
                <>
                  <CheckCircle className="h-12 w-12 mb-3 text-rovida-success" />
                  <p className="font-medium text-rovida-near-black">Mapping complete. Ready to generate.</p>
                  <p className="text-sm">Preview of tasks will be shown here.</p>
                </>
              ) : (
                <>
                  <XCircle className="h-12 w-12 mb-3 text-rovida-slate-green-gray" />
                  <p className="font-medium">Map columns first.</p>
                </>
              )}
            </div>
            <Button onClick={handleGenerateTasks} disabled={currentStep !== 3} className="btn-primary">
              Generate Maintenance Tasks
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MaintenanceAgenda;