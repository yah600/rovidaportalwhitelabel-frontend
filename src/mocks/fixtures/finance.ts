export const mockLedger = [
  {
    id: 'ledger-1',
    date: '2023-10-01',
    account: 'Cash',
    debit: 10000,
    credit: 0,
    balance: 10000,
  },
  {
    id: 'ledger-2',
    date: '2023-10-01',
    account: 'Accounts Receivable',
    debit: 5000,
    credit: 0,
    balance: 5000,
  },
];

export const mockTrialBalance = {
  debits: [
    { account: 'Cash', balance: 10000 },
    { account: 'Accounts Receivable', balance: 5000 },
  ],
  credits: [
    { account: 'Revenue', balance: 15000 },
  ],
  total: 15000,
};

export const mockProfitAndLoss = {
  revenue: 15000,
  expenses: 5000,
  netIncome: 10000,
};

export const mockBalanceSheet = {
  assets: {
    cash: 10000,
    accountsReceivable: 5000,
    total: 15000,
  },
  liabilities: {
    accountsPayable: 2000,
    total: 2000,
  },
  equity: {
    retainedEarnings: 13000,
    total: 13000,
  },
};
