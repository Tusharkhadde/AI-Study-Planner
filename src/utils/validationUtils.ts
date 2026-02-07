import { VALIDATION_RULES } from '@/config/constants';

export const validationUtils = {
  validateEmail: (email: string): string | null => {
    if (!email) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null : 'Invalid email address';
  },

  validateRequired: (value: any): string | null => {
    if (value === null || value === undefined || value === '') {
      return 'This field is required';
    }
    if (typeof value === 'string' && value.trim() === '') {
      return 'This field is required';
    }
    return null;
  },

  validateMinLength: (value: string, min: number): string | null => {
    if (!value) return null;
    return value.length >= min
      ? null
      : `Must be at least ${min} characters`;
  },

  validateMaxLength: (value: string, max: number): string | null => {
    if (!value) return null;
    return value.length <= max
      ? null
      : `Must be no more than ${max} characters`;
  },

  validateNumber: (value: any): string | null => {
    if (value === '' || value === null || value === undefined) return null;
    return !isNaN(Number(value)) ? null : 'Must be a valid number';
  },

  validateRange: (value: number, min: number, max: number): string | null => {
    if (isNaN(value)) return 'Must be a valid number';
    if (value < min || value > max) {
      return `Must be between ${min} and ${max}`;
    }
    return null;
  },

  validateDate: (date: string): string | null => {
    if (!date) return 'Date is required';
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return 'Invalid date';
    }
    return null;
  },

  validateFutureDate: (date: string): string | null => {
    const dateError = validationUtils.validateDate(date);
    if (dateError) return dateError;

    const dateObj = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (dateObj < today) {
      return 'Date must be in the future';
    }
    return null;
  },

  validateStudyHours: (hours: number): string | null => {
    return validationUtils.validateRange(
      hours,
      VALIDATION_RULES.minStudyHours,
      VALIDATION_RULES.maxStudyHours
    );
  },

  validateConfidence: (level: number): string | null => {
    return validationUtils.validateRange(
      level,
      VALIDATION_RULES.minConfidence,
      VALIDATION_RULES.maxConfidence
    );
  },

  validateSubjects: (subjects: any[]): string | null => {
    if (subjects.length < VALIDATION_RULES.minSubjects) {
      return `Please add at least ${VALIDATION_RULES.minSubjects} subject(s)`;
    }
    if (subjects.length > VALIDATION_RULES.maxSubjects) {
      return `Maximum ${VALIDATION_RULES.maxSubjects} subjects allowed`;
    }
    return null;
  },
};