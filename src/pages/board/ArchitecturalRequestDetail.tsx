import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockArchitecturalRequests, ArchitecturalRequest } from '@/data/mock-architectural-requests';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

const ArchitecturalRequestDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation(['architectural_requests', 'common']);
  const { canUpdate, canDelete, canApprove } = useAuth();

  const request: ArchitecturalRequest | undefined = mockArchitecturalRequests.find((req) => req.id === id);

  if (!request) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-rovida-slate-green-gray">{t('architectural request not found', { ns: 'architectural_requests' })}</p>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: t('board', { ns: 'common' }), href: '/board' },
    { label: t('architectural requests', { ns: 'architectural_requests' }), href: '/board/architectural-requests' },
    { label: `${t('request', { ns: 'architectural_requests' })} ${request.id}`, href: `/board/architectural-requests/${request.id}` },
  ];

  const getStatusBadgeVariant = (status: ArchitecturalRequest['status']) => {
    switch (status) {
      case 'Pending Review':
        return 'secondary';
      case 'Approved':
        return 'default';
      case 'Rejected':
        return 'destructive';
      case 'In Progress':
        return 'default';
      default:
        return 'default';
    }
  };

  const handleEditRequest = () => {
    toast.info(t('edit request action', { ns: 'architectural_requests', id: request.id }));
  };

  const handleApproveRequest = () => {
    toast.success(t('approve request action', { ns: 'architectural_requests', id: request.id }));
  };

  const handleRejectRequest = () => {
    toast.error(t('reject request action', { ns: 'architectural_requests', id: request.id }));
  };

  const handleDeleteRequest = () => {
    toast.error(t('delete request action', { ns: 'architectural_requests', id: request.id }));
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{request.title}</h1>
        <div className="flex items-center gap-2">
          <Badge variant={getStatusBadgeVariant(request.status)}>{t(request.status.toLowerCase().replace(/ /g, '_'), { ns: 'architectural_requests' })}</Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">{t('actions', { ns: 'common' })}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white/80 backdrop-blur-xl border-rovida-soft-gray text-rovida-near-black">
              <DropdownMenuLabel>{t('actions', { ns: 'common' })}</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-rovida-soft-gray" />
              {canUpdate('Architectural Requests') && (
                <DropdownMenuItem className="hover:bg-rovida-soft-gray" onClick={handleEditRequest}>
                  <Edit className="mr-2 h-4 w-4" /> {t('edit request', { ns: 'architectural_requests' })}
                </DropdownMenuItem>
              )}
              {canApprove('Architectural Requests') && request.status === 'Pending Review' && (
                <>
                  <DropdownMenuItem className="hover:bg-rovida-soft-gray" onClick={handleApproveRequest}>
                    <CheckCircle className="mr-2 h-4 w-4 text-rovida-success" /> {t('approve request', { ns: 'architectural_requests' })}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-rovida-soft-gray" onClick={handleRejectRequest}>
                    <XCircle className="mr-2 h-4 w-4 text-rovida-error" /> {t('reject request', { ns: 'architectural_requests' })}
                  </DropdownMenuItem>
                </>
              )}
              {canDelete('Architectural Requests') && (
                <DropdownMenuItem className="text-destructive hover:bg-rovida-soft-gray" onClick={handleDeleteRequest}>
                  <Trash2 className="mr-2 h-4 w-4" /> {t('delete request', { ns: 'architectural_requests' })}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Card className="card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('request details', { ns: 'architectural_requests' })}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2 text-rovida-near-black">
            <div className="font-medium">{t('id', { ns: 'common' })}:</div>
            <div>{request.id}</div>
            <div className="font-medium">{t('unit', { ns: 'common' })}:</div>
            <div>{request.unit}</div>
            <div className="font-medium">{t('requester', { ns: 'architectural_requests' })}:</div>
            <div>{request.requester}</div>
            <div className="font-medium">{t('submitted at', { ns: 'architectural_requests' })}:</div>
            <div>{format(request.submittedAt, 'MMM dd, yyyy HH:mm')}</div>
            {request.approvalDate && (
              <>
                <div className="font-medium">{t('approval date', { ns: 'architectural_requests' })}:</div>
                <div>{format(request.approvalDate, 'MMM dd, yyyy HH:mm')}</div>
              </>
            )}
            {request.reviewer && (
              <>
                <div className="font-medium">{t('reviewer', { ns: 'architectural_requests' })}:</div>
                <div>{request.reviewer}</div>
              </>
            )}
          </div>
          <Separator className="bg-rovida-soft-gray" />
          <div>
            <h4 className="font-medium mb-2 text-rovida-navy">{t('description', { ns: 'common' })}:</h4>
            <p className="text-rovida-slate-green-gray">{request.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArchitecturalRequestDetail;