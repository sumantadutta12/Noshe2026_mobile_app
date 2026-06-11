import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
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
};

export type MainTabParamList = {
  Home: undefined;
  Agenda: undefined;
  Speakers: undefined;
  Members: undefined;
  More: undefined;
};
