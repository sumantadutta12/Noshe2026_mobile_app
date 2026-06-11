import { Sponsor } from '../types';

// Mock sponsor data grouped by category for scalable partner directory views.
export const sponsors: Sponsor[] = [
  {
    id: 'so-1',
    name: 'SafeWorks AI',
    category: 'Platinum',
    website: 'safeworks.example',
    description: 'Connected safety intelligence platform for high-risk workplaces.'
  },
  {
    id: 'so-2',
    name: 'Bharat Infrastructure Group',
    category: 'Gold',
    website: 'big.example',
    description: 'Infrastructure partner supporting safer construction and operations.'
  },
  {
    id: 'so-3',
    name: 'MedSure Occupational Health',
    category: 'Silver',
    website: 'medsure.example',
    description: 'Occupational health services for industrial and enterprise teams.'
  },
  {
    id: 'so-4',
    name: 'National Safety Council India',
    category: 'Knowledge Partner',
    website: 'nsc.example',
    description: 'Knowledge partner for safety standards, training, and research.'
  }
];
