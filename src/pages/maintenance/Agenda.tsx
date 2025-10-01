import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud, FileText } from 'lucide-react';

const MaintenanceAgenda = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('maintenance'), href: '/maintenance' },
    { label: 'Agenda (XLSX)', href: '/maintenance/agenda' },
  ];

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // In a real application, you would send this file to a server
      console.log('Uploading file:', selectedFile.name);
      // Simulate upload success
      alert(`File "${selectedFile.name}" uploaded successfully! (Simulated)`);
      setSelectedFile(null); // Clear selected file after "upload"
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl">{t('maintenance')} Agenda (XLSX)</h1>

      <Card className="max-w-2xl mx-auto w-full">
        <CardHeader>
          <CardTitle>Upload Maintenance Agenda</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="agenda-file">Upload XLSX File</Label>
            <Input id="agenda-file" type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
            <p className="text-sm text-muted-foreground">
              Upload your maintenance agenda in XLSX format.
            </p>
          </div>
          <Button onClick={handleUpload} disabled={!selectedFile}>
            <UploadCloud className="mr-2 h-4 w-4" /> Upload Agenda
          </Button>

          {selectedFile && (
            <div className="flex items-center gap-2 p-3 border rounded-md bg-muted">
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">{selectedFile.name}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-4">
        <p className="text-muted-foreground">Uploaded agendas will be displayed here.</p>
      </div>
    </div>
  );
};

export default MaintenanceAgenda;