import { Header } from '../components/Header';
import { Screen } from '../components/Screen';
import { SessionCard } from '../components/SessionCard';
import { sessions } from '../data/sessions';
import { speakers } from '../data/speakers';

export function MyScheduleScreen() {
  const bookmarked = sessions.filter((session) => session.bookmarked);
  return (
    <Screen>
      <Header eyebrow="My Schedule" title="Bookmarked Sessions" subtitle="Your saved agenda for NOSHE 2026." />
      {bookmarked.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          speakers={speakers.filter((speaker) => session.speakerIds.includes(speaker.id))}
        />
      ))}
    </Screen>
  );
}
