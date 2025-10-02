export const mockPolicies = [
  {
    id: 'policy-1',
    provider: 'Insurance Co. A',
    type: 'Building Insurance',
    policyNumber: 'BLD-12345',
    effectiveDate: '2023-01-01',
    expirationDate: '2023-12-31',
  },
  {
    id: 'policy-2',
    provider: 'Insurance Co. B',
    type: 'Liability Insurance',
    policyNumber: 'LIA-67890',
    effectiveDate: '2023-03-01',
    expirationDate: '2024-02-28',
  },
];

export const mockClaims = [
  {
    id: 'claim-1',
    policyId: 'policy-1',
    incident: 'Water Leak in Unit 302',
    dateFiled: '2023-09-10',
    status: 'Pending Review',
    amount: 5000,
  },
  {
    id: 'claim-2',
    policyId: 'policy-2',
    incident: 'Slip and Fall in Lobby',
    dateFiled: '2023-08-01',
    status: 'Closed',
    amount: 10000,
  },
];
