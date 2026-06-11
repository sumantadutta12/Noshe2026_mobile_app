export type Track =
  | 'Leadership'
  | 'Industrial Safety'
  | 'Occupational Health'
  | 'ESG'
  | 'Technology'
  | 'Emergency Response'
  | 'Registration'
  | 'Break';

export type EventInfo = {
  id: string;
  name: string;
  tagline: string;
  date: string;
  startDate: string;
  endDate: string;
  venue: string;
  address: string;
  description: string;
  stats: Array<{ label: string; value: string }>;
};

export type Speaker = {
  id: string;
  name: string;
  designation: string;
  company: string;
  bio: string;
  initials: string;
  avatarUrl?: string;
};

export type Session = {
  id: string;
  day: 'Day 1' | 'Day 2';
  date: string;
  time: string;
  duration: string;
  title: string;
  speakerIds: string[];
  hall: string;
  track: Track;
  summary: string;
  bookmarked?: boolean;
  featured?: boolean;
};

export type SponsorCategory = 'Platinum' | 'Gold' | 'Silver' | 'Knowledge Partner';

export type Sponsor = {
  id: string;
  name: string;
  category: SponsorCategory;
  description: string;
  website: string;
};

export type EventNotification = {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'Update' | 'Reminder' | 'Registration';
  unread?: boolean;
};
