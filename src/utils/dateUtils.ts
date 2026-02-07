import { format, parseISO, differenceInDays, addDays, startOfWeek, endOfWeek } from 'date-fns';

export const dateUtils = {
  format: (date: string | Date, formatStr: string = 'MMM dd, yyyy'): string => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatStr);
  },

  formatTime: (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'HH:mm');
  },

  daysUntil: (targetDate: string | Date): number => {
    const target = typeof targetDate === 'string' ? parseISO(targetDate) : targetDate;
    return differenceInDays(target, new Date());
  },

  addDays: (date: string | Date, days: number): Date => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return addDays(dateObj, days);
  },

  getWeekBounds: (date: string | Date) => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return {
      start: startOfWeek(dateObj, { weekStartsOn: 1 }),
      end: endOfWeek(dateObj, { weekStartsOn: 1 }),
    };
  },

  isToday: (date: string | Date): boolean => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    const today = new Date();
    return (
      dateObj.getDate() === today.getDate() &&
      dateObj.getMonth() === today.getMonth() &&
      dateObj.getFullYear() === today.getFullYear()
    );
  },

  isPast: (date: string | Date): boolean => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return dateObj < new Date();
  },

  isFuture: (date: string | Date): boolean => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return dateObj > new Date();
  },

  getRelativeTime: (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    const days = differenceInDays(dateObj, new Date());

    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    if (days === -1) return 'Yesterday';
    if (days > 1 && days < 7) return `In ${days} days`;
    if (days < -1 && days > -7) return `${Math.abs(days)} days ago`;
    return format(dateObj, 'MMM dd, yyyy');
  },

  minutesToHours: (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  },
};