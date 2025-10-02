// This file will contain date and number formatting utility functions.

import { format } from 'date-fns';

export const formatDate = (date: Date | string, formatStr: string = 'PPP') => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return format(date, formatStr);
};

export const formatCurrency = (amount: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};
