import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Document } from '@/data/mock-documents';
import { format } from 'date-fns';
import { FileText, FileSpreadsheet, FileImage, FileQuestion } from 'lucide-react';

interface DocumentsTableProps {
  documents: Document[];
}

const DocumentsTable = ({ documents }: DocumentsTableProps) => {
  const { t } = useTranslation();

  const getFileTypeIcon = (type: Document['type']) => {
    switch (type) {
      case 'PDF':
        return <FileText className="h-4 w-4 text-red-500" />;
      case 'Word':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'Excel':
        return <FileSpreadsheet className="h-4 w-4 text-green-500" />;
      case 'Image':
        return <FileImage className="h-4 w-4 text-purple-500" />;
      default:
        return <FileQuestion className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Uploaded By</TableHead>
            <TableHead>Uploaded At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell className="font-medium">
                <Link to={`/documents/${doc.id}`} className="text-primary hover:underline">
                  {doc.id}
                </Link>
              </TableCell>
              <TableCell>{doc.title}</TableCell>
              <TableCell>{doc.category}</TableCell>
              <TableCell className="flex items-center gap-2">
                {getFileTypeIcon(doc.type)} {doc.type}
              </TableCell>
              <TableCell>{doc.uploadedBy}</TableCell>
              <TableCell>{format(doc.uploadedAt, 'MMM dd, yyyy')}</TableCell>
              <TableCell className="text-right">
                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:underline">
                  View
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DocumentsTable;