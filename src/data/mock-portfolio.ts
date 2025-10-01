import { format } from 'date-fns';

export interface PortfolioProperty {
  id: string;
  name: string;
  address: string;
  propertyType: 'Residential' | 'Commercial' | 'Mixed-Use';
  unitsCount: number;
  occupancyRate: number;
  acquisitionDate: Date;
  value: number;
  propertyManager: string;
}

export const mockPortfolioProperties: PortfolioProperty[] = [
  {
    id: 'PROP001',
    name: 'Maplewood Apartments',
    address: '123 Maple St, Anytown, USA',
    propertyType: 'Residential',
    unitsCount: 50,
    occupancyRate: 0.95,
    acquisitionDate: new Date('2018-06-01'),
    value: 12500000,
    propertyManager: 'John Doe',
  },
  {
    id: 'PROP002',
    name: 'Downtown Plaza',
    address: '456 Central Ave, Anytown, USA',
    propertyType: 'Commercial',
    unitsCount: 10, // Commercial units/offices
    occupancyRate: 0.80,
    acquisitionDate: new Date('2020-01-15'),
    value: 8000000,
    propertyManager: 'Jane Smith',
  },
  {
    id: 'PROP003',
    name: 'Riverside Lofts',
    address: '789 River Rd, Anytown, USA',
    propertyType: 'Mixed-Use',
    unitsCount: 30,
    occupancyRate: 0.90,
    acquisitionDate: new Date('2021-03-20'),
    value: 9500000,
    propertyManager: 'John Doe',
  },
];