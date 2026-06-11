import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useMemo, useState } from 'react';
import {
  Image,
  LayoutAnimation,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  UIManager,
  View
} from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { Screen } from '../components/Screen';
import { sessions } from '../data/sessions';
import { speakers } from '../data/speakers';
import { MainTabParamList, RootStackParamList } from '../navigation/types';
import { theme } from '../theme/theme';
import { Session, Track } from '../types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Agenda'>,
  NativeStackScreenProps<RootStackParamList>
>;

type AgendaTab = 'Day 1' | 'Day 2' | 'Favorite Sessions';
type FilterPanel = 'tracks' | 'categories' | 'speakers' | 'halls';

const tabMeta: Record<AgendaTab, string> = {
  'Day 1': 'Thu, Jun 25, 2026',
  'Day 2': 'Fri, Jun 26, 2026',
  'Favorite Sessions': 'No Sessions'
};

const iconForTrack: Record<Track, keyof typeof Ionicons.glyphMap> = {
  Registration: 'list-outline',
  Leadership: 'podium-outline',
  ESG: 'leaf-outline',
  'Industrial Safety': 'shield-checkmark-outline',
  Technology: 'hardware-chip-outline',
  'Emergency Response': 'medkit-outline',
  'Occupational Health': 'fitness-outline',
  Break: 'cafe-outline'
};

export function AgendaScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<AgendaTab>('Day 1');
  const [timezoneSheetOpen, setTimezoneSheetOpen] = useState(false);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState('(UTC +05:30) Asia/Calcutta');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSpeakers, setSelectedSpeakers] = useState<string[]>([]);
  const [selectedHalls, setSelectedHalls] = useState<string[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [activeFilterPanel, setActiveFilterPanel] = useState<FilterPanel>('categories');
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const selectedSessionSpeakers = selectedSession
    ? speakers.filter((speaker) => selectedSession.speakerIds.includes(speaker.id))
    : [];

  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const toggleFilterPanel = (panel: FilterPanel) => {
    LayoutAnimation.configureNext({
      duration: 220,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut
      },
      delete: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity
      }
    });
    setActiveFilterPanel(panel);
  };

  const visibleSessions = useMemo(() => {
    return activeTab === 'Favorite Sessions'
      ? sessions.filter((session) => session.bookmarked)
      : sessions.filter((session) => session.day === activeTab);
  }, [activeTab]);

  return (
    <Screen
      refreshable
      header={<AppHeader onProfilePress={() => navigation.navigate('More')} />}
      floating={
        <Pressable
          onPress={() => setFilterSheetOpen(true)}
          style={({ pressed }) => [styles.floatingFilter, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel="Filter agenda"
        >
          <Ionicons name="filter" size={22} color={theme.colors.white} />
        </Pressable>
      }
    >
      <View style={styles.notice}>
        <Ionicons name="information-circle" size={18} color={theme.colors.orange} />
        <Text style={styles.noticeText}>Date and time is shown in {selectedTimezone}.</Text>
        <Pressable onPress={() => setTimezoneSheetOpen(true)} hitSlop={10}>
          <Text style={styles.changeText}>Change</Text>
        </Pressable>
      </View>

      <View style={styles.tabCard}>
        {(['Day 1', 'Day 2', 'Favorite Sessions'] as AgendaTab[]).map((item) => (
          <Pressable
            key={item}
            onPress={() => setActiveTab(item)}
            style={[styles.tab, activeTab === item && styles.activeTab]}
          >
            <Text style={[styles.tabTitle, activeTab === item && styles.activeTabTitle]}>{item}</Text>
            <Text style={[styles.tabDate, activeTab === item && styles.activeTabDate]}>{tabMeta[item]}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.filterHeader}>
        <View>
          <Text style={styles.screenTitle}>Agenda</Text>
        </View>
      </View>

      <View style={styles.timeline}>
        {visibleSessions.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="bookmark-outline" size={26} color={theme.colors.orange} />
            <Text style={styles.emptyTitle}>No favorite sessions</Text>
            <Text style={styles.emptyText}>Bookmark sessions from the agenda to build your personal schedule.</Text>
          </View>
        ) : (
          visibleSessions.map((session) => (
            <AgendaTimelineItem
              key={session.id}
              session={session}
              onPress={() => setSelectedSession(session)}
            />
          ))
        )}
      </View>
      <Modal
        animationType="slide"
        visible={Boolean(selectedSession)}
        onRequestClose={() => setSelectedSession(null)}
        presentationStyle="fullScreen"
      >
        {selectedSession ? (
          <SafeAreaView style={styles.sessionModal}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close session details"
              onPress={() => setSelectedSession(null)}
              style={({ pressed }) => [styles.sessionModalClose, pressed && styles.pressed]}
            >
              <Ionicons name="close" size={24} color="#111827" />
            </Pressable>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.sessionModalContent}
            >
              <Text style={styles.sessionModalTitle}>{selectedSession.title}</Text>

              <View style={styles.sessionModalTrackPill}>
                <View style={styles.sessionModalTrackDot} />
                <Text style={styles.sessionModalTrackText}>{selectedSession.track}</Text>
              </View>

              <View style={styles.sessionModalMetaRow}>
                <Text style={styles.sessionModalMetaText}>
                  {selectedSession.date}, {getSessionTimeRange(selectedSession.time, selectedSession.duration)} (IST)
                </Text>
                {selectedSession.hall ? (
                  <Ionicons name="location" size={18} color="#A7AFBB" />
                ) : null}
              </View>
              {selectedSession.hall ? (
                <Text style={styles.sessionModalHall}>{selectedSession.hall}</Text>
              ) : null}

              <Text style={styles.sessionModalSectionTitle}>Speakers</Text>
              <View style={styles.sessionModalSpeakerList}>
                {selectedSessionSpeakers.length > 0 ? (
                  selectedSessionSpeakers.map((speaker) => (
                    <View key={speaker.id} style={styles.sessionModalSpeaker}>
                      <View style={styles.sessionModalAvatar}>
                        {speaker.avatarUrl ? (
                          <Image source={{ uri: speaker.avatarUrl }} style={styles.sessionModalAvatarImage} />
                        ) : (
                          <Text style={styles.sessionModalAvatarText}>{speaker.initials}</Text>
                        )}
                      </View>
                      <View style={styles.sessionModalSpeakerInfo}>
                        <Text style={styles.sessionModalSpeakerName}>{speaker.name}</Text>
                        <Text style={styles.sessionModalSpeakerRole}>{speaker.designation}</Text>
                        <Text style={styles.sessionModalSpeakerCompany}>{speaker.company}</Text>
                      </View>
                    </View>
                  ))
                ) : (
                  <Text style={styles.sessionModalEmpty}>No speakers assigned for this session.</Text>
                )}
              </View>
            </ScrollView>
          </SafeAreaView>
        ) : null}
      </Modal>
      <Modal
        animationType="slide"
        transparent
        visible={timezoneSheetOpen}
        onRequestClose={() => setTimezoneSheetOpen(false)}
      >
        <View style={styles.sheetBackdrop}>
          <Pressable style={styles.sheetScrim} onPress={() => setTimezoneSheetOpen(false)} />
          <View style={styles.timezoneSheet}>
            <View style={styles.sheetHandle} />
            <View style={styles.sheetHeader}>
              <View>
                <Text style={styles.sheetTitle}>Select Timezone</Text>
                <Text style={styles.sheetSubtitle}>Agenda times will update across sessions.</Text>
              </View>
              <Pressable
                onPress={() => setTimezoneSheetOpen(false)}
                style={styles.closeButton}
                accessibilityRole="button"
                accessibilityLabel="Close timezone selector"
              >
                <Ionicons name="close" size={20} color={theme.colors.navy} />
              </Pressable>
            </View>
            <View style={styles.timezoneList}>
              {[
                '(UTC +05:00) Asia/Ashgabat',
                '(UTC +05:00) Asia/Atyrau',
                '(UTC +05:30) Asia/Kolkata',
                '(UTC +05:30) Asia/Colombo',
                '(UTC +05:30) Asia/Calcutta'
              ].map((timezone) => {
                const active = selectedTimezone === timezone;
                return (
                  <Pressable
                    key={timezone}
                    onPress={() => setSelectedTimezone(timezone)}
                    style={[styles.timezoneOption, active && styles.activeTimezoneOption]}
                  >
                    <View style={styles.timezoneTextWrap}>
                      <Text style={[styles.timezoneText, active && styles.activeTimezoneText]}>
                        {timezone}
                      </Text>
                      {timezone.includes('Calcutta') ? (
                        <Text style={styles.localLabel}>Event default</Text>
                      ) : null}
                    </View>
                    <View style={[styles.radio, active && styles.activeRadio]}>
                      {active ? <View style={styles.radioDot} /> : null}
                    </View>
                  </Pressable>
                );
              })}
            </View>
            <View style={styles.sheetActions}>
              <Pressable
                onPress={() => setTimezoneSheetOpen(false)}
                style={[styles.sheetButton, styles.cancelButton]}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={() => setTimezoneSheetOpen(false)}
                style={[styles.sheetButton, styles.applyButton]}
              >
                <Text style={styles.applyText}>Apply</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent
        visible={filterSheetOpen}
        onRequestClose={() => setFilterSheetOpen(false)}
      >
        <View style={styles.sheetBackdrop}>
          <Pressable style={styles.sheetScrim} onPress={() => setFilterSheetOpen(false)} />
          <View style={styles.filterSheet}>
            <View style={styles.sheetHandle} />
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Filter</Text>
              <Pressable
                onPress={() => setFilterSheetOpen(false)}
                style={styles.closeButton}
                accessibilityRole="button"
                accessibilityLabel="Close filter"
              >
                <Ionicons name="close" size={20} color={theme.colors.navy} />
              </Pressable>
            </View>
            <View style={styles.searchBox}>
              <Ionicons name="search" size={18} color={theme.colors.navy} />
              <TextInput
                placeholder="Search"
                placeholderTextColor={theme.colors.muted}
                style={styles.searchInput}
              />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
              <FilterSection
                title="All Tracks"
                count={1}
                collapsed={activeFilterPanel !== 'tracks'}
                onPress={() => toggleFilterPanel('tracks')}
              />
              {activeFilterPanel === 'tracks' ? (
                <View style={styles.categoryList}>
                  {['Main Conference Track'].map((label) => {
                    const active = selectedTracks.includes(label);
                    return (
                      <FilterOption
                        key={label}
                        active={active}
                        icon="git-branch-outline"
                        label={label}
                        onPress={() =>
                          setSelectedTracks((current) =>
                            active ? current.filter((item) => item !== label) : [...current, label]
                          )
                        }
                      />
                    );
                  })}
                </View>
              ) : null}
              <FilterSection
                title="Session Categories"
                count={7}
                collapsed={activeFilterPanel !== 'categories'}
                onPress={() => toggleFilterPanel('categories')}
              />
              {activeFilterPanel === 'categories' ? (
                <View style={styles.categoryList}>
                  {[
                    ['Presentation', 'easel-outline'],
                    ['Break', 'refresh-outline'],
                    ['Lunch', 'restaurant-outline'],
                    ['Tea', 'cafe-outline'],
                    ['Keynote', 'podium-outline'],
                    ['Reception', 'people-outline'],
                    ['Registration', 'list-outline']
                  ].map(([label, icon]) => {
                    const active = selectedCategories.includes(label);
                    return (
                      <FilterOption
                        key={label}
                        active={active}
                        icon={icon as keyof typeof Ionicons.glyphMap}
                        label={label}
                        onPress={() =>
                          setSelectedCategories((current) =>
                            active ? current.filter((item) => item !== label) : [...current, label]
                          )
                        }
                      />
                    );
                  })}
                </View>
              ) : null}
              <FilterSection
                title="Speakers"
                count={45}
                collapsed={activeFilterPanel !== 'speakers'}
                onPress={() => toggleFilterPanel('speakers')}
              />
              {activeFilterPanel === 'speakers' ? (
                <View style={styles.categoryList}>
                  {['Dr. Ananya Rao', 'Vikram Mehta', 'Nisha Menon', 'Amitabh Sen', 'Farah Khan'].map((label) => {
                    const active = selectedSpeakers.includes(label);
                    return (
                      <FilterOption
                        key={label}
                        active={active}
                        icon="person-circle-outline"
                        label={label}
                        onPress={() =>
                          setSelectedSpeakers((current) =>
                            active ? current.filter((item) => item !== label) : [...current, label]
                          )
                        }
                      />
                    );
                  })}
                </View>
              ) : null}
              <FilterSection
                title="Halls"
                count={3}
                collapsed={activeFilterPanel !== 'halls'}
                onPress={() => toggleFilterPanel('halls')}
              />
              {activeFilterPanel === 'halls' ? (
                <View style={styles.categoryList}>
                  {['Saraswati Auditorium', 'Innovation Forum', 'Registration Lobby'].map((label) => {
                    const active = selectedHalls.includes(label);
                    return (
                      <FilterOption
                        key={label}
                        active={active}
                        icon="location-outline"
                        label={label}
                        onPress={() =>
                          setSelectedHalls((current) =>
                            active ? current.filter((item) => item !== label) : [...current, label]
                          )
                        }
                      />
                    );
                  })}
                </View>
              ) : null}
            </ScrollView>
            <View style={styles.sheetActions}>
              <Pressable
                onPress={() => {
                  setSelectedCategories([]);
                  setSelectedSpeakers([]);
                  setSelectedHalls([]);
                  setSelectedTracks([]);
                }}
                style={[styles.sheetButton, styles.cancelButton]}
              >
                <Text style={styles.cancelText}>Clear Filter</Text>
              </Pressable>
              <Pressable
                onPress={() => setFilterSheetOpen(false)}
                style={[styles.sheetButton, styles.applyButton]}
              >
                <Text style={styles.applyText}>Apply Filter</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

function FilterSection({
  title,
  count,
  collapsed,
  onPress
}: {
  title: string;
  count: number;
  collapsed?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.filterSection}>
      <Text style={styles.filterSectionTitle}>
        {title} ({count})
      </Text>
      <Ionicons
        name={collapsed ? 'chevron-forward-circle-outline' : 'chevron-down-circle-outline'}
        size={23}
        color={theme.colors.navy}
      />
    </Pressable>
  );
}

function FilterOption({
  active,
  icon,
  label,
  onPress
}: {
  active: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.categoryRow}>
      <View style={[styles.checkbox, active && styles.activeCheckbox]}>
        {active ? <Ionicons name="checkmark" size={14} color={theme.colors.white} /> : null}
      </View>
      <Text style={styles.categoryText}>{label}</Text>
      <Ionicons name={icon} size={18} color={theme.colors.navy} />
    </Pressable>
  );
}

function AgendaTimelineItem({
  session,
  onPress
}: {
  session: Session;
  onPress: () => void;
}) {
  const linkedSpeakers = speakers.filter((speaker) => session.speakerIds.includes(speaker.id));

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.timelineItem, pressed && styles.pressed]}>
      <View style={styles.iconColumn}>
        <View style={styles.sessionIcon}>
          <Ionicons name={iconForTrack[session.track]} size={18} color={theme.colors.white} />
        </View>
      </View>
      <View style={styles.sessionPanel}>
        <View style={styles.sessionTopRow}>
          <Text style={styles.trackTag}>{session.track}</Text>
        </View>
        <Text style={styles.sessionTitle}>{session.title}</Text>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={14} color={theme.colors.orange} />
            <Text style={styles.metaText}>{session.time} • {session.duration}</Text>
          </View>
          {session.hall ? (
            <View style={styles.metaItem}>
              <Ionicons name="location" size={14} color={theme.colors.muted} />
              <Text style={styles.metaText}>{session.hall}</Text>
            </View>
          ) : null}
        </View>
        {linkedSpeakers.length > 0 ? (
          <View style={styles.avatarRow}>
            {linkedSpeakers.map((speaker) => (
              <View key={speaker.id} style={styles.avatar}>
                {speaker.avatarUrl ? (
                  <Image source={{ uri: speaker.avatarUrl }} style={styles.avatarImage} />
                ) : (
                  <Text style={styles.avatarFallback}>{speaker.initials}</Text>
                )}
              </View>
            ))}
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}

function getSessionTimeRange(time: string, duration: string) {
  const endTime = addDuration(time, duration);
  return endTime ? `${time} - ${endTime}` : time;
}

function addDuration(time: string, duration: string) {
  const timeMatch = time.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
  if (!timeMatch) return '';

  const hoursMatch = duration.match(/(\d+)\s*Hour/i);
  const minutesMatch = duration.match(/(\d+)\s*Minute/i);
  const durationMinutes =
    (hoursMatch ? Number(hoursMatch[1]) * 60 : 0) + (minutesMatch ? Number(minutesMatch[1]) : 0);

  let hours = Number(timeMatch[1]);
  const minutes = Number(timeMatch[2]);
  const period = timeMatch[3].toUpperCase();

  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  const totalMinutes = hours * 60 + minutes + durationMinutes;
  const endHours24 = Math.floor(totalMinutes / 60) % 24;
  const endMinutes = totalMinutes % 60;
  const endPeriod = endHours24 >= 12 ? 'PM' : 'AM';
  const endHours12 = endHours24 % 12 || 12;

  return `${endHours12}:${String(endMinutes).padStart(2, '0')} ${endPeriod}`;
}

const styles = StyleSheet.create({
  notice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.colors.orangeSoft,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: '#FED7AA'
  },
  noticeText: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600'
  },
  changeText: {
    color: theme.colors.orange,
    fontSize: 12,
    fontWeight: '900'
  },
  tabCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.line,
    overflow: 'hidden',
    ...theme.shadow
  },
  tab: {
    flex: 1,
    minHeight: 68,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    borderBottomWidth: 4,
    borderBottomColor: 'transparent'
  },
  activeTab: {
    borderBottomColor: theme.colors.orange,
    backgroundColor: theme.colors.orangeSoft
  },
  tabTitle: {
    color: theme.colors.text,
    fontSize: 13,
    lineHeight: 17,
    textAlign: 'center',
    fontWeight: '800'
  },
  activeTabTitle: {
    color: theme.colors.navy
  },
  tabDate: {
    color: theme.colors.muted,
    fontSize: 11,
    lineHeight: 15,
    marginTop: 3,
    textAlign: 'center',
    fontWeight: '600'
  },
  activeTabDate: {
    color: theme.colors.orange
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12
  },
  screenTitle: {
    color: theme.colors.text,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800'
  },
  timeline: {
    gap: 9
  },
  timelineItem: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EEF1F6',
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 3
  },
  pressed: {
    opacity: 0.86
  },
  iconColumn: {
    width: 42,
    alignItems: 'center'
  },
  sessionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.navy,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sessionPanel: {
    flex: 1,
    gap: 7,
    minWidth: 0
  },
  sessionTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10
  },
  trackTag: {
    color: theme.colors.navy,
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.pill,
    paddingHorizontal: 9,
    paddingVertical: 4,
    overflow: 'hidden',
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '700'
  },
  sessionTitle: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700'
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  metaText: {
    color: theme.colors.muted,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '500'
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 3,
    marginTop: 2
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.background,
    borderWidth: 2,
    borderColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -4,
    overflow: 'hidden'
  },
  avatarImage: {
    width: '100%',
    height: '100%'
  },
  avatarFallback: {
    color: theme.colors.navy,
    fontSize: 10,
    fontWeight: '800'
  },
  emptyCard: {
    minHeight: 180,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
    gap: 8
  },
  emptyTitle: {
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: '900'
  },
  emptyText: {
    color: theme.colors.muted,
    textAlign: 'center',
    lineHeight: 20
  },
  sessionModal: {
    flex: 1,
    backgroundColor: theme.colors.white
  },
  sessionModalContent: {
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 36
  },
  sessionModalClose: {
    position: 'absolute',
    top: 18,
    right: 14,
    zIndex: 2,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white
  },
  sessionModalTitle: {
    color: '#111111',
    fontSize: 23,
    lineHeight: 26,
    fontWeight: '500',
    paddingRight: 42
  },
  sessionModalTrackPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    borderRadius: theme.radius.pill,
    backgroundColor: '#EFE9FF',
    paddingHorizontal: 11,
    paddingVertical: 7,
    marginTop: 16
  },
  sessionModalTrackDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8B7CFF'
  },
  sessionModalTrackText: {
    color: '#303047',
    fontSize: 12,
    fontWeight: '600'
  },
  sessionModalMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 28
  },
  sessionModalMetaText: {
    flex: 1,
    color: '#111111',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500'
  },
  sessionModalHall: {
    color: '#111111',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500'
  },
  sessionModalSectionTitle: {
    color: '#111111',
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '700',
    marginTop: 38
  },
  sessionModalSpeakerList: {
    marginTop: 14,
    gap: 24
  },
  sessionModalSpeaker: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12
  },
  sessionModalAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  sessionModalAvatarImage: {
    width: '100%',
    height: '100%'
  },
  sessionModalAvatarText: {
    color: theme.colors.navy,
    fontSize: 11,
    fontWeight: '700'
  },
  sessionModalSpeakerInfo: {
    flex: 1,
    minWidth: 0
  },
  sessionModalSpeakerName: {
    color: '#111111',
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '600'
  },
  sessionModalSpeakerRole: {
    color: '#111111',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 1
  },
  sessionModalSpeakerCompany: {
    color: '#111111',
    fontSize: 14,
    lineHeight: 20
  },
  sessionModalEmpty: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 21
  },
  floatingFilter: {
    position: 'absolute',
    right: theme.spacing.md,
    bottom: theme.spacing.lg,
    zIndex: 20,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: theme.colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.orange,
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
    elevation: 8
  },
  sheetBackdrop: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  sheetScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 26, 51, 0.45)'
  },
  timezoneSheet: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: theme.spacing.lg,
    paddingBottom: 28,
    gap: 16
  },
  filterSheet: {
    maxHeight: '86%',
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: theme.spacing.lg,
    paddingBottom: 18,
    gap: 14
  },
  filterScroll: {
    paddingBottom: 4
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: theme.colors.line
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 14
  },
  sheetTitle: {
    color: theme.colors.text,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800'
  },
  sheetSubtitle: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 3,
    fontWeight: '500'
  },
  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchBox: {
    height: 50,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.line,
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: theme.spacing.md
  },
  searchInput: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 15
  },
  filterSection: {
    minHeight: 48,
    borderTopWidth: 1,
    borderTopColor: theme.colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  filterSectionTitle: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: '800',
    textTransform: 'uppercase'
  },
  categoryList: {
    gap: 3
  },
  categoryRow: {
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#AAB1BC',
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeCheckbox: {
    backgroundColor: theme.colors.orange,
    borderColor: theme.colors.orange
  },
  categoryText: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: '600'
  },
  timezoneList: {
    gap: 9
  },
  timezoneOption: {
    minHeight: 58,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.line,
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  activeTimezoneOption: {
    borderColor: theme.colors.orange,
    backgroundColor: theme.colors.orangeSoft
  },
  timezoneTextWrap: {
    flex: 1,
    minWidth: 0
  },
  timezoneText: {
    color: theme.colors.text,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600'
  },
  activeTimezoneText: {
    color: theme.colors.navy,
    fontWeight: '800'
  },
  localLabel: {
    color: theme.colors.orange,
    fontSize: 11,
    marginTop: 2,
    fontWeight: '800'
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: theme.colors.line,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeRadio: {
    borderColor: theme.colors.orange
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.orange
  },
  sheetActions: {
    flexDirection: 'row',
    gap: 12
  },
  sheetButton: {
    flex: 1,
    minHeight: 50,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cancelButton: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.line
  },
  applyButton: {
    backgroundColor: theme.colors.orange
  },
  cancelText: {
    color: theme.colors.navy,
    fontSize: 14,
    fontWeight: '800'
  },
  applyText: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: '800'
  }
});
