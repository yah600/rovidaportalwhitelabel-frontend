import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash2, CheckCircle, XCircle, DollarSign, CalendarDays } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockViolationTickets, ViolationTicket } from '@/data/mock-violations';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

const ViolationTicketDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation(['rules', 'common', 'finance']);
  const { canUpdate, canDelete } = useAuth();

  const ticket: ViolationTicket | undefined = mockViolationTickets.find((tkt) => tkt.id === id);

  if (!ticket) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-rovida-slate-green-gray">{t('violation ticket not found', { ns: 'rules' })}</p>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: t('rules and violations', { ns: 'rules' }), href: '/rules' },
    { label: t('violation tickets', { ns: 'rules' }), href: '/rules/violations' },
    { label: `${t('ticket', { ns: 'rules' })} ${ticket.id}`, href: `/rules/violations/${ticket.id}` },
  ];

  const getStatusBadgeVariant = (status: ViolationTicket['status']) => {
    switch (status) {
      case 'Open':
        return 'destructive';
      case 'Closed':
        return 'outline';
      case 'Appealed':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const handleEditTicket = () => {
    toast.info(t('edit violation ticket action', { ns: 'rules', id: ticket.id }));
  };

  const handleCloseTicket = () => {
    toast.success(t('close violation ticket action', { ns: 'rules', id: ticket.id }));
  };

  const handleAppealTicket = () => {
    toast.info(t('appeal violation ticket action', { ns: 'rules', id: ticket.id }));
  };

  const handleDeleteTicket = () => {
    toast.error(t('delete violation ticket action', { ns: 'rules', id: ticket.id }));
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('violation ticket', { ns: 'rules' })} - {ticket.id}</h1>
        <div className="flex items-center gap-2">
          <Badge variant={getStatusBadgeVariant(ticket.status)}>{t(ticket.status.toLowerCase(), { ns: 'rules' })}</Badge>
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
              {canUpdate('Rules - Violations') && (
                <DropdownMenuItem className="hover:bg-rovida-soft-gray" onClick={handleEditTicket}>
                  <Edit className="mr-2 h-4 w-4" /> {t('edit ticket', { ns: 'rules' })}
                </DropdownMenuItem>
              )}
              {canUpdate('Rules - Violations') && ticket.status === 'Open' && (
                <DropdownMenuItem className="hover:bg-rovida-soft-gray" onClick={handleCloseTicket}>
                  <CheckCircle className="mr-2 h-4 w-4 text-rovida-success" /> {t('close ticket', { ns: 'rules' })}
                </DropdownMenuItem>
              )}
              {canUpdate('Rules - Violations') && ticket.status === 'Open' && (
                <DropdownMenuItem className="hover:bg-rovida-soft-gray" onClick={handleAppealTicket}>
                  <XCircle className="mr-2 h-4 w-4 text-rovida-warning" /> {t('appeal ticket', { ns: 'rules' })}
                </DropdownMenuItem>
              )}
              {canDelete('Rules - Violations') && (
                <DropdownMenuItem className="text-destructive hover:bg-rovida-soft-gray" onClick={handleDeleteTicket}>
                  <Trash2 className="mr-2 h-4 w-4" /> {t('delete ticket', { ns: 'rules' })}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Card className="card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('ticket details', { ns: 'rules' })}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2 text-rovida-near-black">
            <div className="font-medium">{t('rule', { ns: 'rules' })}:</div>
            <div><Link to={`/rules/${ticket.ruleId}`} className="link-rovida">{ticket.ruleTitle}</Link></div>
            <div className="font-medium">{t('unit', { ns: 'common' })}:</div>
            <div>{ticket.unitNumber}</div>
            <div className="font-medium">{t('resident name', { ns: 'rules' })}:</div>
            <div>{ticket.residentName}</div>
            <div className="font-medium">{t('issued at', { ns: 'rules' })}:</div>
            <div>{format(ticket.issuedAt, 'MMM dd, yyyy HH:mm')}</div>
            {ticket.fineAmount && (
              <>
                <div className="font-medium">{t('fine amount', { ns: 'rules' })}:</div>
                <div className="font-roboto-mono">${ticket.fineAmount.toFixed(2)}</div>
              </>
            )}
            {ticket.dueDate && (
              <>
                <div className="font-medium">{t('due date', { ns: 'common' })}:</div>
                <div>{format(ticket.dueDate, 'MMM dd, yyyy')}</div>
              </>
            )}
          </div>
          <Separator className="bg-rovida-soft-gray" />
          <div>
            <h4 className="font-medium mb-2 text-rovida-navy">{t('description', { ns: 'common' })}:</h4>
            <p className="text-rovida-slate-green-gray">{ticket.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViolationTicketDetail;