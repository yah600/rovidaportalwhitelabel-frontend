// This file will contain form validation utility functions.

export const validateRequired = (value: string) => {
  if (!value || value.trim() === '') {
    return 'This field is required';
  }
  return undefined;
};

export const validateEmail = (value: string) => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
  return undefined;
};
