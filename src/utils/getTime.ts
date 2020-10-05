import dayjs from 'dayjs';

export const getTime = (createdAt: string): string => {
  return dayjs(createdAt).format('MMM D, YYYY');
};
