import { format, addDays, subDays } from 'date-fns';
import { mockWorkOrders } from './mock-work-orders';
import { mockTasks } from './mock-tasks';

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'work-order' | 'task' | 'maintenance';
  status: string;
  link: string;
}

export const mockCalendarEvents: CalendarEvent[] = [
  ...mockWorkOrders.map(wo => ({
    id: wo.id,
    title: wo.title,
    date: wo.dueDate,
    type: 'work-order',
    status: wo.status,
    link: `/maintenance/work-orders/${wo.id}`
  })),
  ...mockTasks.map(task => ({
    id: task.id,
    title: task.title,
    date: task.dueDate,
    type: 'task',
    status: task.status,
    link: `/maintenance/tasks/${task.id}`
  })),
  // Add some general maintenance events
  {
    id: 'GEN001',
    title: 'Annual HVAC Inspection',
    date: addDays(new Date(), 10),
    type: 'maintenance',
    status: 'Scheduled',
    link: '/maintenance/calendar' // No specific detail page for general events
  },
  {
    id: 'GEN002',
    title: 'Fire Safety System Check',
    date: subDays(new Date(), 5),
    type: 'maintenance',
    status: 'Completed',
    link: '/maintenance/calendar'
  }
];