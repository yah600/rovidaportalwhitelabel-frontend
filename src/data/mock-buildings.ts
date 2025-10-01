import { format } from 'date-fns';

export interface Building {
  id: string;
  name: string;
  address: string;
  unitsCount: number;
  yearBuilt: number;
  propertyManager: string;
}

export const mockBuildings: Building[] = [
  {
    id: 'BLD001',
    name: 'Building A - Downtown',
    address: '123 Main St, Montreal, QC',
    unitsCount: 50,
    yearBuilt: 1985,
    propertyManager: 'John Doe',
  },
  {
    id: 'BLD002',
    name: 'Building B - Plateau',
    address: '456 Elm Ave, Montreal, QC',
    unitsCount: 30,
    yearBuilt: 2002,
    propertyManager: 'Jane Smith',
  },
  {
    id: 'BLD003',
    name: 'Building C - Griffintown',
    address: '789 Oak Blvd, Montreal, QC',
    unitsCount: 75,
    yearBuilt: 2018,
    propertyManager: 'John Doe',
  },
];