import { EventNotification } from '../types';

// Mock notifications. Replace with push notification and event alert feeds later.
export const notifications: EventNotification[] = [
  {
    id: 'no-1',
    title: 'Registration desk opens at 8:30 AM',
    message: 'Carry your confirmation email and a valid government ID for badge pickup.',
    time: 'Today, 07:45 AM',
    type: 'Registration',
    unread: true
  },
  {
    id: 'no-2',
    title: 'Keynote starts in 30 minutes',
    message: 'Proceed to Plenary Hall for the opening keynote.',
    time: 'Today, 09:00 AM',
    type: 'Reminder',
    unread: true
  },
  {
    id: 'no-3',
    title: 'Agenda update',
    message: 'The ESG roundtable has moved to Summit Room A.',
    time: 'Yesterday, 05:20 PM',
    type: 'Update'
  }
];
