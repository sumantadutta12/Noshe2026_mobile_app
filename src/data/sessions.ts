import { Session } from '../types';

// Mock agenda data. Keep the Session type stable so API responses can be
// normalized into this shape later.
export const sessions: Session[] = [
  {
    id: 'se-1',
    day: 'Day 1',
    date: 'Fri, 3rd July, 2026',
    time: '09:00 AM',
    duration: '1 Hour',
    title: 'Registration',
    speakerIds: [],
    hall: '',
    track: 'Registration',
    summary:
      'Badge collection, delegate kit pickup, and attendee registration at the NOSHE-2026 help desk.'
  },
  {
    id: 'se-2',
    day: 'Day 1',
    date: 'Fri, 3rd July, 2026',
    time: '10:00 AM',
    duration: '1 Hour 30 Minutes',
    title: 'Inaugural Session',
    speakerIds: ['sp-1', 'sp-2', 'sp-3', 'sp-4', 'sp-5'],
    hall: 'Saraswati Auditorium',
    track: 'Leadership',
    summary:
      'Formal opening of NOSHE-2026 with dignitaries, industry leaders, and occupational health and safety experts.'
  },
  {
    id: 'se-3',
    day: 'Day 1',
    date: 'Fri, 3rd July, 2026',
    time: '11:30 AM',
    duration: '30 Minutes',
    title: 'Refreshment Break',
    speakerIds: [],
    hall: '',
    track: 'Break',
    summary: 'Networking tea break for delegates, speakers, partners, and exhibitors.'
  },
  {
    id: 'se-4',
    day: 'Day 1',
    date: 'Fri, 3rd July, 2026',
    time: '12:00 PM',
    duration: '1 Hour',
    title:
      'Opening Plenary: Integrating Climate Action with Safe Workplace & Occupational Health for a Resilient Future',
    speakerIds: ['sp-2', 'sp-3', 'sp-4', 'sp-5'],
    hall: 'Saraswati Auditorium',
    track: 'ESG',
    featured: true,
    summary:
      'A plenary on climate action, occupational health, workplace resilience, and sustainable HSE strategies.'
  },
  {
    id: 'se-5',
    day: 'Day 1',
    date: 'Fri, 3rd July, 2026',
    time: '02:00 PM',
    duration: '1 Hour',
    title: 'Technical Session: Industrial Safety Leadership and Risk Governance',
    speakerIds: ['sp-2', 'sp-3'],
    hall: 'Saraswati Auditorium',
    track: 'Industrial Safety',
    summary:
      'Practical leadership approaches for high-risk operations, contractor safety, and enterprise risk governance.'
  },
  {
    id: 'se-6',
    day: 'Day 2',
    date: 'Sat, 4th July, 2026',
    time: '09:30 AM',
    duration: '45 Minutes',
    title: 'Day 2 Welcome and Recap',
    speakerIds: ['sp-1'],
    hall: 'Saraswati Auditorium',
    track: 'Leadership',
    summary: 'A short recap of Day 1 outcomes and opening orientation for the second conference day.'
  },
  {
    id: 'se-7',
    day: 'Day 2',
    date: 'Sat, 4th July, 2026',
    time: '10:30 AM',
    duration: '1 Hour',
    title: 'Emergency Preparedness and Disaster Management for Changing Climate',
    speakerIds: ['sp-5'],
    hall: 'Saraswati Auditorium',
    track: 'Emergency Response',
    summary:
      'A focused session on emergency readiness, drills, incident command, and disaster management planning.'
  },
  {
    id: 'se-8',
    day: 'Day 2',
    date: 'Sat, 4th July, 2026',
    time: '12:00 PM',
    duration: '1 Hour',
    title: 'Technology Enabled Occupational Health and Safety',
    speakerIds: ['sp-4', 'sp-1'],
    hall: 'Innovation Forum',
    track: 'Technology',
    featured: true,
    summary:
      'How digital health, AI, IoT, and analytics can improve safety performance and worker protection.'
  },
  {
    id: 'se-9',
    day: 'Day 2',
    date: 'Sat, 4th July, 2026',
    time: '03:00 PM',
    duration: '1 Hour',
    title: 'Valedictory Session and Closing Remarks',
    speakerIds: ['sp-1', 'sp-2', 'sp-3'],
    hall: 'Saraswati Auditorium',
    track: 'Leadership',
    summary: 'Closing reflections, delegate takeaways, partner acknowledgements, and next steps.'
  }
];
