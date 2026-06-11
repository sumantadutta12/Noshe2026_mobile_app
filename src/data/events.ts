import { EventInfo } from '../types';

// Mock event data. Replace this module with API-backed data services when
// connecting the app to Zoho Backstage event endpoints.
export const event: EventInfo = {
  id: 'noshe-2026',
  name: 'NOSHE 2026',
  tagline: 'National Conference on Occupational Safety, Health & Environment',
  date: '3rd - 4th July 2026',
  startDate: '3 July 2026',
  endDate: '4 July 2026',
  venue: 'NTPC Power Management Institute (PMI), Noida',
  address: 'NTPC Power Management Institute, Sector 16A, Noida, Uttar Pradesh',
  description:
    'NOSHE 2026 brings together leaders, practitioners, regulators, researchers, and innovators across industries to advance occupational health, safety culture, emergency readiness, and sustainable workplaces.',
  stats: [
    { label: 'Delegates', value: '1,200+' },
    { label: 'Speakers', value: '60+' },
    { label: 'Sessions', value: '30+' },
    { label: 'Partners', value: '40+' }
  ]
};
