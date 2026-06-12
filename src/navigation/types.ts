import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  Auth: { mode?: 'attendee' | 'admin' } | undefined;
  AttendeeDashboard: undefined;
  AdminLogin: undefined;
  AdminDashboard: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  About: undefined;
  SessionDetails: { sessionId: string };
  SpeakerDetails: { speakerId: string };
  SponsorDetails: { sponsorId: string };
  Foreword: undefined;
  Organisers: undefined;
  Venue: undefined;
  Exhibitors: undefined;
  MySchedule: undefined;
  Notifications: undefined;
  Tickets: undefined;
  Contact: undefined;
  PrivacyPolicy: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Agenda: undefined;
  Speakers: undefined;
  Members: undefined;
  More: undefined;
};
