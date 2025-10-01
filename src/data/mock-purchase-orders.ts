import { format } from 'date-fns';

export interface PurchaseOrder {
  id: string;
  vendor: string;
  itemDescription: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  orderDate: Date;
  requiredBy: Date;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Ordered' | 'Received';
  approvedBy?: string;
}

export const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: 'PO001',
    vendor: 'Maintenance Supplies Inc.',
    itemDescription: 'HVAC Filters (Case of 20)',
    quantity: 2,
    unitPrice: 150.00,
    totalAmount: 300.00,
    orderDate: new Date('2024-03-10'),
    requiredBy: new Date('2024-03-25'),
    status: 'Approved',
    approvedBy: 'John Doe',
  },
  {
    id: 'PO002',
    vendor: 'Plumbing Parts Co.',
    itemDescription: 'Faucet Washer Kit',
    quantity: 5,
    unitPrice: 15.00,
    totalAmount: 75.00,
    orderDate: new Date('2024-03-12'),
    requiredBy: new Date('2024-03-18'),
    status: 'Pending',
  },
  {
    id: 'PO003',
    vendor: 'Office Depot',
    itemDescription: 'Printer Paper (Ream)',
    quantity: 10,
    unitPrice: 8.50,
    totalAmount: 85.00,
    orderDate: new Date('2024-03-05'),
    requiredBy: new Date('2024-03-15'),
    status: 'Received',
    approvedBy: 'Jane Smith',
  },
];