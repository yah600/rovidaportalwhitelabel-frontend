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
import { Badge } from '@/components/ui/badge';
import { InboxDocument } from '@/data/mock-inbox-documents';
import { format } from 'date-fns';
import { Mail, FileText, FileQuestion, Scan } from 'lucide-react';

interface InboxTableProps {
  documents: InboxDocument[];
}

const InboxTable = ({ documents }: InboxTableProps) => {
  const { t } = useTranslation();

  const getStatusVariant = (status: InboxDocument['status']) => {
    switch (status) {
      case 'New':
        return 'default';
      case 'Action Required':
        return 'destructive';
      case 'Reviewed':
        return 'outline';
      case 'Archived':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getFileTypeIcon = (type: InboxDocument['type']) => {
    switch (type) {
      case 'PDF':
        return <FileText className="h-4 w-4 text-red-500" />;
      case 'Email':
        return <Mail className="h-4 w-4 text-blue-500" />;
      case 'Scan':
        return <Scan className="h-4 w-4 text-green-500" />;
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
            <TableHead>Sender</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Received At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell className="font-medium">{doc.id}</TableCell>
              <TableCell>{doc.title}</TableCell>
              <TableCell>{doc.sender}</TableCell>
              <TableCell className="flex items-center gap-2">
                {getFileTypeIcon(doc.type)} {doc.type}
              </TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(doc.status)}>{doc.status}</Badge>
              </TableCell>
              <TableCell>{format(doc.receivedAt, 'MMM dd, yyyy')}</TableCell>
              <TableCell className="text-right">
                <a href={doc.previewUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:underline">
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

export default InboxTable;