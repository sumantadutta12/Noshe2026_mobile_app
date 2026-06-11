export const joinNames = (names: string[]) => names.filter(Boolean).join(', ');

export const getDaysUntilEvent = () => {
  const eventDate = new Date('2026-07-03T10:00:00+05:30').getTime();
  const now = Date.now();
  return Math.max(0, Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24)));
};
