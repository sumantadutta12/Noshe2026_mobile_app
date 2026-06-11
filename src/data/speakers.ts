import { Speaker } from '../types';

// Mock speaker directory. The photo placeholder currently uses initials; map
// real API image URLs into Speaker when available.
export const speakers: Speaker[] = [
  {
    id: 'sp-1',
    name: 'Dr. Ananya Rao',
    designation: 'Director, Occupational Health',
    company: 'National Safety Council India',
    initials: 'AR',
    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'A public health leader focused on workplace wellness, risk prevention, and multidisciplinary occupational health policy.'
  },
  {
    id: 'sp-2',
    name: 'Vikram Mehta',
    designation: 'Chief HSE Officer',
    company: 'Bharat Infrastructure Group',
    initials: 'VM',
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Leads enterprise HSE transformation programs across construction, energy, logistics, and heavy industry portfolios.'
  },
  {
    id: 'sp-3',
    name: 'Nisha Menon',
    designation: 'Partner, ESG & Risk Advisory',
    company: 'KPMG India',
    initials: 'NM',
    avatarUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
    bio: 'Advises boards and operating teams on governance, ESG risk, safety metrics, and resilient operations.'
  },
  {
    id: 'sp-4',
    name: 'Amitabh Sen',
    designation: 'Head of Safety Technology',
    company: 'SafeWorks AI',
    initials: 'AS',
    avatarUrl: 'https://randomuser.me/api/portraits/men/46.jpg',
    bio: 'Builds AI-assisted safety analytics, worker protection workflows, and connected-site monitoring platforms.'
  },
  {
    id: 'sp-5',
    name: 'Farah Khan',
    designation: 'Emergency Response Lead',
    company: 'Metro Chemicals',
    initials: 'FK',
    avatarUrl: 'https://randomuser.me/api/portraits/women/79.jpg',
    bio: 'Specialist in emergency preparedness, plant incident command systems, drills, and cross-agency response planning.'
  }
];
