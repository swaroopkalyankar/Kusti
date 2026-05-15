export function validateRequired(value: string, field: string) {
  if (!value || value.trim() === '') {
    return `${field} is required`;
  }
  return null;
}

export function validateNumber(value: string, field: string) {
  if (!value) return `${field} is required`;
  if (isNaN(Number(value))) return `${field} must be a number`;
  return null;
}

export function validateDateRange(start: string, end: string) {
  if (!start || !end) return 'Dates are required';

  if (new Date(start) > new Date(end)) {
    return 'Start date must be before end date';
  }

  return null;
}