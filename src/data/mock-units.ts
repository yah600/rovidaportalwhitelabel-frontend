export interface Unit {
  id: string;
  unitNumber: string;
  buildingId: string;
  buildingName: string;
  owner: string;
  status: 'Occupied' | 'Vacant' | 'Under Renovation';
  squareFootage: number;
  bedrooms: number;
  bathrooms: number;
}

export const mockUnits: Unit[] = [
  {
    id: 'UNIT001',
    unitNumber: '101',
    buildingId: 'BLD001',
    buildingName: 'Building A - Downtown',
    owner: 'Alice Smith',
    status: 'Occupied',
    squareFootage: 750,
    bedrooms: 1,
    bathrooms: 1,
  },
  {
    id: 'UNIT002',
    unitNumber: '203',
    buildingId: 'BLD001',
    buildingName: 'Building A - Downtown',
    owner: 'Charlie Brown',
    status: 'Occupied',
    squareFootage: 900,
    bedrooms: 2,
    bathrooms: 1.5,
  },
  {
    id: 'UNIT003',
    unitNumber: '305',
    buildingId: 'BLD002',
    buildingName: 'Building B - Plateau',
    owner: 'Grace Black',
    status: 'Vacant',
    squareFootage: 600,
    bedrooms: 1,
    bathrooms: 1,
  },
  {
    id: 'UNIT004',
    unitNumber: 'PH1',
    buildingId: 'BLD003',
    buildingName: 'Building C - Griffintown',
    owner: 'Henry Blue',
    status: 'Occupied',
    squareFootage: 1500,
    bedrooms: 3,
    bathrooms: 2.5,
  },
];