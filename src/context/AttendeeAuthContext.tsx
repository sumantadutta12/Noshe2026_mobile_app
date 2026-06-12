import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';

type AttendeeProfile = {
  mobileNumber: string;
  name: string;
  registrationId: string;
};

type AttendeeAuthContextValue = {
  attendee: AttendeeProfile | null;
  isLoggedIn: boolean;
  login: (mobileNumber: string) => void;
  logout: () => void;
};

const AttendeeAuthContext = createContext<AttendeeAuthContextValue | undefined>(undefined);

export function AttendeeAuthProvider({ children }: PropsWithChildren) {
  const [attendee, setAttendee] = useState<AttendeeProfile | null>(null);

  const value = useMemo<AttendeeAuthContextValue>(
    () => ({
      attendee,
      isLoggedIn: Boolean(attendee),
      login: (mobileNumber: string) => {
        setAttendee({
          mobileNumber,
          name: 'NOSHE Attendee',
          registrationId: `NOSHE26-${mobileNumber.slice(-4) || '0000'}`
        });
      },
      logout: () => setAttendee(null)
    }),
    [attendee]
  );

  return <AttendeeAuthContext.Provider value={value}>{children}</AttendeeAuthContext.Provider>;
}

export function useAttendeeAuth() {
  const context = useContext(AttendeeAuthContext);

  if (!context) {
    throw new Error('useAttendeeAuth must be used inside AttendeeAuthProvider');
  }

  return context;
}
