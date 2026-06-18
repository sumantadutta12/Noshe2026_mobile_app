import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useState, useEffect } from 'react';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import {
  Alert,
  Image,
  LayoutAnimation,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { Screen } from '../components/Screen';
import { MainTabParamList, RootStackParamList } from '../navigation/types';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../theme/theme';
import { Track } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAgendaData,getFilterData, toggleFavorite,getFavoriteData  } from '../services/agendaService';

const defaultImage = require('../assets/default.jpg');

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Agenda'>,
  NativeStackScreenProps<RootStackParamList>
>;

type AgendaTab = 'Day 1' | 'Day 2' | 'Favorite Sessions';
type FilterPanel = 'tracks' | 'categories' | 'speakers' | 'halls';

type AgendaSpeaker = {
  id?: string | number;
  speaker_name?: string;
  speaker_designation?: string;
  speaker_company?: string;
  speaker_image?: string;
  avatar?: string;
  avatarUrl?: string;
  initials?: string;
};

type AgendaSession = {
  session_id: number | string;
  session_details?: string;
  session_categories?: string;
  session_timeline?: string;
  session_date?: string;
  session_halls?: string;
  session_track?: string;
  time?: string;
  duration?: string;
  timeline?: string;
  favorite?: boolean | number;
  speakers?: AgendaSpeaker[];
};

type AgendaData = {
  day1?: AgendaSession[];
  day2?: AgendaSession[];
};

type FilterData = {
  tracks: Array<{ session_track: string }>;
  categories: Array<{ session_categories: string }>;
  halls: Array<{ session_halls: string }>;
  speakers: Array<{ speaker_name: string }>;
};

const tabMeta: Record<AgendaTab, string> = {
  'Day 1': 'Thu, Jun 25, 2026',
  'Day 2': 'Fri, Jun 26, 2026',
  'Favorite Sessions': 'No Sessions'
};

const emptyAgendaMeta: Record<
  AgendaTab,
  {
    icon: keyof typeof Ionicons.glyphMap;
    accent: string;
    title: string;
    body: string;
  }
> = {
  'Day 1': {
    icon: 'calendar-clear-outline',
    accent: '#F37021',
    title: 'Day 1 agenda coming soon',
    body: 'Sessions for the opening day will appear here once the agenda is published.'
  },
  'Day 2': {
    icon: 'calendar-clear-outline',
    accent: '#0A63BB',
    title: 'Day 2 sessions not available yet',
    body: 'The second day schedule will be listed here after it is finalized.'
  },
  'Favorite Sessions': {
    icon: 'bookmark-outline',
    accent: '#F37021',
    title: 'No favorite sessions',
    body: 'Bookmark sessions from the agenda to build your personal schedule.'
  }
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

function getTrackIcon(track?: string): keyof typeof Ionicons.glyphMap {
  return track && track in iconForTrack ? iconForTrack[track as Track] : 'calendar-outline';
}

export function AgendaScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<AgendaTab>('Day 1');
  const emptyState = emptyAgendaMeta[activeTab];
  const [timezoneSheetOpen, setTimezoneSheetOpen] = useState(false);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState('(UTC +05:30) Asia/Calcutta');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSpeakers, setSelectedSpeakers] = useState<string[]>([]);
  const [selectedHalls, setSelectedHalls] = useState<string[]>([]);
  const [selectedSession, setSelectedSession] = useState<AgendaSession | null>(null);
  const [activeFilterPanel, setActiveFilterPanel] = useState<FilterPanel>('categories');
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const selectedSessionSpeakers = selectedSession?.speakers || [];
  const [agendaData, setAgendaData] = useState<AgendaData | null>(null);
  const [agendaLoading, setAgendaLoading] = useState(true);
  const [filterSearch, setFilterSearch] = useState('');
  
  const [filterData, setFilterData] = useState<FilterData>({
    tracks: [],
    categories: [],
    halls: [],
    speakers: []
  });
  const [favoriteSessions, setFavoriteSessions] = useState<AgendaSession[]>([]);




  useEffect(() => {loadAgenda();}, []);
  const summary = "Formal opening of NOSHE-2026 with dignitaries, industry leaders, and occupational health and safery experts";
  const loadAgenda = async () => {
    setAgendaLoading(true);
    try {
      const response = await getAgendaData({
        track: [],
        categories: [],
        halls: [],
        speakers: []
      });

      if (response.success) {
        setAgendaData(response.data);
      }
    }
    catch(error){
      Alert.alert(error instanceof Error ? error.message : String(error));
    } finally {
      setAgendaLoading(false);
    }
  };

  const visibleSessions = useMemo(() => {
  if (activeTab === 'Favorite Sessions') {
    return favoriteSessions || [];
  }

  if (!agendaData) return [];

  if (activeTab === 'Day 1') {
    return agendaData.day1 || [];
  }

  if (activeTab === 'Day 2') {
    return agendaData.day2 || [];
  }

  return [];
}, [activeTab, agendaData, favoriteSessions]);
  const applyFilters = async () => {
    const token = await AsyncStorage.getItem('token');
    setAgendaLoading(true);

    try {
      const response = await getAgendaData({
        track: selectedTracks,
        categories: selectedCategories,
        halls: selectedHalls,
        speakers: selectedSpeakers
      });

      if (response.success) {
        setAgendaData(response.data);
        setFilterSearch('');
        setFilterSheetOpen(false);
      }
    } finally {
      setAgendaLoading(false);
    }
  };

  const openFilterModal = async () => {
    setFilterSheetOpen(true);

    const response = await getFilterData( '');

    if (response.success) {
      setFilterData(response.data);
    }
  };

  const handleFilterSearch = async (text: string) => {
    setFilterSearch(text);


    const response = await getFilterData(text);

    if (response.success) {
      setFilterData(response.data);
    }
  };


const handleFavorite = async (session: AgendaSession) => {
  const favoriteValue = session.favorite ? 0 : 1;

    const response = await toggleFavorite(
      Number(session.session_id),favoriteValue);

    if (response.success) {
      // setAgendaData((prev) => ({
      //   ...prev,
      //   day1: prev.day1?.map((item) =>
      //     item.session_id === session.session_id
      //       ? {
      //           ...item,
      //           is_favorite: !item.ifavorite
      //         }
      //       : item
      //   ),
      //   day2: prev.day2?.map((item) =>
      //     item.session_id === session.session_id
      //       ? {
      //           ...item,
      //           is_favorite: !item.favorite
      //         }
      //       : item
      //   )
      // }));
   const response = await getAgendaData({
      track: [],
      categories: [],
      halls: [],
      speakers: []
    });

    if (response.success) {
      setAgendaData(response.data);
    }
    }
  };
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
const clearFilters = async () => {
  setSelectedTracks([]);
  setSelectedCategories([]);
  setSelectedHalls([]);
  setSelectedSpeakers([]);
  setAgendaLoading(true);
  
  try {
    const response = await getAgendaData({
      track: [],
      categories: [],
      halls: [],
      speakers: []
    });

    if (response.success) {
      setAgendaData(response.data);
      setFilterSearch('');
      setFilterSheetOpen(false);
    
    }
  } finally {
    setAgendaLoading(false);
  }
};

//   const visibleSessions = useMemo(() => {
//   if (!agendaData) return [];

//   if (activeTab === 'Day 1') {
//     return agendaData.day1 || [];
//   }

//   if (activeTab === 'Day 2') {
//     return agendaData.day2 || [];
//   }
//   return [];
//   }, [activeTab, agendaData]);

const closeFilterModal = () => {
  setFilterSearch('');
  setFilterSheetOpen(false);
};

const handleTabPress = async (tab: AgendaTab) => {
  setActiveTab(tab);

  if (tab === 'Favorite Sessions') {
    setAgendaLoading(true);
    try {
      const response = await getFavoriteData();

      if (response.success) {
        setFavoriteSessions(response.data);
      }
    } finally {
      setAgendaLoading(false);
    }
  }
};

  return (
    <Screen
      refreshable
      header={<AppHeader onProfilePress={() => navigation.navigate('More')} />}
      floating={
        <Pressable
          onPress={openFilterModal}
          style={({ pressed }) => [styles.floatingFilter, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel="Filter agenda"
        >
          <Ionicons name="filter" size={22} color={theme.colors.white} />
        </Pressable>
      }
    >
     <View style={styles.actionRow}>
          <Pressable
            style={({ pressed }) => [styles.actionBtn, pressed && styles.pressed]}
          >
            <View style={styles.actionIcon}>
              <Ionicons name="print-outline" size={18} color={theme.colors.navy} />
            </View>
            <Text style={styles.actionText}>Print Agenda</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.actionBtn, styles.actionBtnPrimary, pressed && styles.pressed]}
          >
            <View style={styles.actionIconPrimary}>
              <Ionicons name="download-outline" size={18} color={theme.colors.white} />
            </View>
            <Text style={styles.actionTextPrimary}>Download Brochure</Text>
          </Pressable>
        </View>

      <View style={styles.tabCard}>
  {(['Day 1', 'Day 2', 'Favorite Sessions'] as AgendaTab[]).map((item) => (
    <Pressable
      key={item}
      onPress={() => handleTabPress(item)}
      style={[styles.tab, activeTab === item && styles.activeTab]}
    >
      <Text
        style={[
          styles.tabTitle,
          activeTab === item && styles.activeTabTitle,
        ]}
      >
        {item}
      </Text>

      <Text
        style={[
          styles.tabDate,
          activeTab === item && styles.activeTabDate,
        ]}
      >
        {tabMeta[item]}
      </Text>
    </Pressable>
  ))}
</View>

      <View style={styles.filterHeader}>
        <View>
          <Text style={styles.screenTitle}>Agenda</Text>
        </View>
      </View>

      <View style={styles.timeline}>
        {agendaLoading ? (
          <AgendaSkeletonList />
        ) : visibleSessions.length === 0 ? (
          <View style={styles.emptyCard}>
            <View style={styles.emptyGlow} />
            <View style={[styles.emptyIconWrap, { borderColor: `${emptyState.accent}33` }]}>
              <LinearGradient
                colors={['#FFFFFF', `${emptyState.accent}14`]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.emptyIconGradient}
              >
                <Ionicons name={emptyState.icon} size={30} color={emptyState.accent} />
              </LinearGradient>
            </View>
            <Text style={styles.emptyTitle}>{emptyState.title}</Text>
            <Text style={styles.emptyText}>{emptyState.body}</Text>
          </View>
        ) : (
          visibleSessions.map((session) => (
            <Pressable
              key={session.session_id}
              style={styles.timelineItem}
              onPress={() => setSelectedSession(session)}
            >
              
              <View style={styles.sessionPanel} >
                <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Text style={styles.trackTag}>
                  {session.session_categories}
                   </Text>
                   <Pressable
                    hitSlop={10}
                    onPress={() => {
                      console.log("Favorite clicked");
                      handleFavorite(session);
                    }}
                  >
                    <Ionicons
                      name={session.favorite ? "bookmark" : "bookmark-outline"}
                      size={24}
                      color={theme.colors.orange}
                    />
                  </Pressable>
               </View>

                <Text style={styles.sessionTitle}>
                  {session.session_details || session.session_categories}
                </Text>

                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <Ionicons
                      name="time-outline"
                      size={14}
                      color={theme.colors.orange}
                    />
                    <Text style={styles.metaText}>
                      {session.session_timeline}
                    </Text>
                  </View>

                  <View style={styles.metaItem}>
                    {session.session_halls != null ? (<Ionicons
                      name="location"
                      size={14}
                      color={theme.colors.muted}
                    />) : null}
                    <Text style={styles.metaText}>
                      {session.session_halls}
                    </Text>
                  </View>
                </View>

                <View style={styles.avatarRow}>
                  {Array.isArray(session.speakers)  && session.speakers?.length > 0 ? (
                    session.speakers.map((speaker, index) => (
                      <View key={index} style={styles.avatar}>
                      <Image
                        key={index} // Unique key for React mapping
                        source={{ uri: speaker.speaker_image || speaker.avatar }} // Replace with your exact image property name
                        style={styles.avatarImage}
                      />
                      </View>
                    ))      
                  ) : (
                    <Image
                        source={defaultImage}
                        style={styles.avatarImage}
                      />
                  )}
                </View>
              </View>
            </Pressable>
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
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[
                styles.sessionModalContent,
                {
                  paddingTop: Math.max(6, insets.top + 2),
                  paddingBottom: theme.spacing.xl + Math.max(insets.bottom, theme.spacing.lg)
                }
              ]}
            >
              <LinearGradient
                colors={['#08244D', '#004EA8', '#1684D8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.sessionModalHero}
              >
                <View style={styles.sessionHeroGlow} />
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Close session details"
                  onPress={() => setSelectedSession(null)}
                  style={({ pressed }) => [styles.sessionModalClose, pressed && styles.pressed]}
                >
                  <Ionicons name="close" size={22} color={theme.colors.navy} />
                </Pressable>
                <View style={styles.sessionHeroTopline}>
                  <View style={styles.sessionHeroRule} />
                  <Text style={styles.sessionHeroEyebrow}>Session Details</Text>
                </View>
                <Text style={styles.sessionModalTitle}>{selectedSession.session_details}</Text>

                <View style={styles.sessionModalTrackPill}>
                  <Ionicons
                    name={getTrackIcon(selectedSession.session_track)}
                    size={14}
                    color={theme.colors.orange}
                  />
                  <Text style={styles.sessionModalTrackText}>{selectedSession.session_categories}</Text>
                </View>
              </LinearGradient>

              <View style={styles.sessionModalInfoGrid}>
                <View style={styles.sessionModalInfoCard}>
                  <View style={styles.sessionModalInfoIcon}>
                    <Ionicons name="calendar-outline" size={18} color={theme.colors.orange} />
                  </View>
                  <Text style={styles.sessionModalInfoLabel}>Date & Time</Text>
                  <Text style={styles.sessionModalInfoValue}>
                    {selectedSession.session_date}, {(selectedSession.timeline)} (IST)
                  </Text>
                </View>
                {selectedSession.session_halls ? (
                  <View style={styles.sessionModalInfoCard}>
                    <View style={styles.sessionModalInfoIcon}>
                      <Ionicons name="location-outline" size={18} color={theme.colors.orange} />
                    </View>
                    <Text style={styles.sessionModalInfoLabel}>Venue</Text>
                    <Text style={styles.sessionModalInfoValue}>{selectedSession.session_halls}</Text>
                  </View>
                ) : null}
              </View>

              {summary ? (
                <View style={styles.sessionModalSummaryCard}>
                  <Text style={styles.sessionModalSummaryTitle}>About Session</Text>
                  <Text style={styles.sessionModalSummaryText}>{summary}</Text>
                </View>
              ) : null}

              <View style={styles.sessionModalSectionHeader}>
                <View>
                  <Text style={styles.sessionModalSectionEyebrow}>Featured</Text>
                  <Text style={styles.sessionModalSectionTitle}>Speakers</Text>
                </View>
                <View style={styles.sessionModalSpeakerCount}>
                  <Text style={styles.sessionModalSpeakerCountText}>
                    {selectedSessionSpeakers.length}
                  </Text>
                </View>
              </View>
              <View style={styles.sessionModalSpeakerList}>
                {Array.isArray(selectedSessionSpeakers) && selectedSessionSpeakers.length > 0 ? (
                  selectedSession?.speakers?.map((speaker, index) => (
                  <View key={index} style={styles.sessionModalSpeaker}>
                    <View style={styles.sessionModalAvatar}>
                        {speaker.speaker_image ? (
                          <Image source={{ uri: speaker.speaker_image }} style={styles.sessionModalAvatarImage} />
                        ) : (
                          <Image
                        source={defaultImage}
                        style={styles.avatarImage}
                      />
                        )}
                      </View>
                    <View style={styles.sessionModalSpeakerInfo}>
                      <Text style={styles.sessionModalSpeakerName}>
                        {speaker.speaker_name}
                      </Text>

                      <Text style={styles.sessionModalSpeakerRole}>
                        {speaker.speaker_designation}
                      </Text>

                      <Text style={styles.sessionModalSpeakerCompany}>
                        {speaker.speaker_company}
                      </Text>
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
          <View
            style={[
              styles.timezoneSheet,
              { paddingBottom: theme.spacing.lg + Math.max(insets.bottom, theme.spacing.sm) }
            ]}
          >
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
          <View
            style={[
              styles.filterSheet,
              { paddingBottom: theme.spacing.md + Math.max(insets.bottom, theme.spacing.sm) }
            ]}
          >
            <View style={styles.sheetHandle} />
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Filter</Text>
              <Pressable
                onPress={closeFilterModal}
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
                value={filterSearch}
                onChangeText={handleFilterSearch}
              />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
              <FilterSection
                title="All Tracks"
                count={filterData.tracks?.length || 0}
                collapsed={activeFilterPanel !== 'tracks'}
                onPress={() => toggleFilterPanel('tracks')}
              />
              {activeFilterPanel === 'tracks' ? (
                <View style={styles.categoryList}>
                  {filterData.tracks?.map((item,index) => {
                    const active = selectedTracks.includes(item?.session_track);

                        return (
                          <FilterOption
                            key={index}
                            active={active}
                            icon="git-branch-outline"
                            label={item?.session_track}
                            onPress={() =>
                              setSelectedTracks((current) =>
                                active
                                  ? current.filter((track) => track !== item?.session_track)
                                  : [...current, item?.session_track]
                              )
                            }
                          />
                        );
                      })}
                </View>
              ) : null}
              <FilterSection
                title="Session Categories"
                 count={filterData.categories?.length || 0}
                collapsed={activeFilterPanel !== 'categories'}
                onPress={() => toggleFilterPanel('categories')}
              />
              {activeFilterPanel === 'categories' ? (
                <View style={styles.categoryList}>
                  {filterData.categories?.map((item,index) => {
                      const active = selectedCategories.includes(item?.session_categories);

                      return (
                        <FilterOption
                          key={index}
                          active={active}
                          icon="list-outline"
                          label={item?.session_categories}
                          onPress={() =>
                            setSelectedCategories((current) =>
                              active
                                ? current.filter((category) => category !== item?.session_categories)
                                : [...current, item?.session_categories]
                            )
                          }
                        />
                      );
                    })}
                </View>
              ) : null}
              <FilterSection
                title="Speakers"
                count={filterData.speakers?.length || 0}
                collapsed={activeFilterPanel !== 'speakers'}
                onPress={() => toggleFilterPanel('speakers')}
              />
              {activeFilterPanel === 'speakers' ? (
                <View style={styles.categoryList}>
                  {filterData.speakers?.map((speaker,index) => {
              const active = selectedSpeakers.includes(
                speaker?.speaker_name
              );

              return (
                <FilterOption
                  key={index}
                  active={active}
                  icon="person-circle-outline"
                  label={speaker?.speaker_name}
                  onPress={() =>
                    setSelectedSpeakers((current) =>
                      active
                        ? current.filter(
                            (item) =>
                              item !== speaker?.speaker_name
                          )
                        : [
                            ...current,
                            speaker?.speaker_name
                          ]
                    )
                  }
                />
              );
            })}
                </View>
              ) : null}
              <FilterSection
                title="Halls"
                count={filterData.halls?.length || 0}
                collapsed={activeFilterPanel !== 'halls'}
                onPress={() => toggleFilterPanel('halls')}
              />
              {activeFilterPanel === 'halls' ? (
                <View style={styles.categoryList}>
                 {filterData.halls?.map((hall, index) => {
                  const active = selectedHalls.includes(hall.session_halls);

                  return (
                    <FilterOption
                      key={index}
                      active={active}
                      icon="location-outline"
                      label={hall.session_halls}
                      onPress={() =>
                        setSelectedHalls((current) =>
                          active
                            ? current.filter((item) => item !== hall.session_halls)
                            : [...current, hall.session_halls]
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
                onPress={clearFilters}
                style={[styles.sheetButton, styles.cancelButton]}
              >
                <Text style={styles.cancelText}>Clear Filter</Text>
              </Pressable>
              <Pressable
                onPress={applyFilters}
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
  session: AgendaSession;
  onPress: () => void;
}) {
  const linkedSpeakers = session.speakers ?? [];

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.timelineItem, pressed && styles.pressed]}>
      <View style={styles.iconColumn}>
        <View style={styles.sessionIcon}>
          <Ionicons name={getTrackIcon(session.session_track)} size={18} color={theme.colors.white} />
        </View>
      </View>
      <View style={styles.sessionPanel}>
        <View style={styles.sessionTopRow}>
          <Text style={styles.trackTag}>{session.session_track}</Text>
        </View>
        <Text style={styles.sessionTitle}>{session.session_categories}</Text>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={14} color={theme.colors.orange} />
            <Text style={styles.metaText}>{session.time} • {session.duration}</Text>
          </View>
          {session.session_halls ? (
            <View style={styles.metaItem}>
              <Ionicons name="location" size={14} color={theme.colors.muted} />
              <Text style={styles.metaText}>{session.session_halls}</Text>
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

function AgendaSkeletonList() {
  return (
    <>
      {[0, 1, 2].map((item) => (
        <View key={item} style={styles.timelineItem}>
          <View style={styles.sessionPanel}>
            <View style={styles.skeletonTopRow}>
              <View style={[styles.skeletonBlock, styles.skeletonTag]} />
              <View style={[styles.skeletonBlock, styles.skeletonBookmark]} />
            </View>
            <View style={[styles.skeletonBlock, styles.skeletonTitle]} />
            <View style={[styles.skeletonBlock, styles.skeletonTitleShort]} />
            <View style={styles.skeletonMetaRow}>
              <View style={[styles.skeletonBlock, styles.skeletonMeta]} />
              <View style={[styles.skeletonBlock, styles.skeletonMetaShort]} />
            </View>
            <View style={styles.skeletonAvatarRow}>
              {[0, 1, 2].map((avatar) => (
                <View key={avatar} style={[styles.skeletonBlock, styles.skeletonAvatar]} />
              ))}
            </View>
          </View>
        </View>
      ))}
    </>
  );
}

// function getSessionTimeRange(time: string, duration: string) {
//   const endTime = addDuration(time, duration);
//   return endTime ? `${time} - ${endTime}` : time;
// }

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
    backgroundColor: '#FFF8F2',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#FFE0C7'
  },
  noticeText: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400'
  },
  changeText: {
    color: theme.colors.orange,
    fontSize: 12,
    fontWeight: '600'
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10
  },
  actionBtn: {
    flex: 1,
    minHeight: 52,
    borderRadius: 18,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: '#DCEAF7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 10,
    shadowColor: '#0F4070',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 14,
    elevation: 2
  },
  actionBtnPrimary: {
    backgroundColor: theme.colors.orange,
    borderColor: theme.colors.orange,
    shadowColor: theme.colors.orange,
    shadowOpacity: 0.22
  },
  actionIcon: {
    width: 30,
    height: 30,
    borderRadius: 12,
    backgroundColor: '#EEF6FF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionIconPrimary: {
    width: 30,
    height: 30,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionText: {
    flexShrink: 1,
    color: theme.colors.navy,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    textAlign: 'center'
  },
  actionTextPrimary: {
    flexShrink: 1,
    color: theme.colors.white,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    textAlign: 'center'
  },
  tabCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E5EEF7',
    overflow: 'hidden',
    shadowColor: '#0F4070',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 3
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
    fontWeight: '600'
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
    fontWeight: '400'
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
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '600'
  },
  timeline: {
    gap: 12
  },
  timelineItem: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    borderRadius: 22,
    padding: 13,
    borderWidth: 1,
    borderColor: '#E8F0F8',
    shadowColor: '#0F4070',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 3
  },
  skeletonTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10
  },
  skeletonMetaRow: {
    flexDirection: 'row',
    gap: 8
  },
  skeletonAvatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 3,
    marginTop: 2
  },
  skeletonBlock: {
    backgroundColor: '#E8F0F8'
  },
  skeletonTag: {
    width: 118,
    height: 24,
    borderRadius: theme.radius.pill
  },
  skeletonBookmark: {
    width: 24,
    height: 24,
    borderRadius: 12
  },
  skeletonTitle: {
    width: '86%',
    height: 18,
    borderRadius: 9
  },
  skeletonTitleShort: {
    width: '62%',
    height: 18,
    borderRadius: 9
  },
  skeletonMeta: {
    width: 132,
    height: 16,
    borderRadius: 8
  },
  skeletonMetaShort: {
    width: 88,
    height: 16,
    borderRadius: 8
  },
  skeletonAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: theme.colors.white,
    marginLeft: -4
  },
  pressed: {
    opacity: 0.86
  },
  iconColumn: {
    width: 42,
    alignItems: 'center'
  },
  sessionIcon: {
    width: 38,
    height: 38,
    borderRadius: 16,
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
    fontWeight: '500'
  },
  sessionTitle: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600'
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
    fontWeight: '400'
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
    fontWeight: '600'
  },
  emptyCard: {
    position: 'relative',
    minHeight: 252,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 22,
    gap: 10,
    backgroundColor: theme.colors.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5EEF7',
    overflow: 'hidden',
    shadowColor: '#0F4070',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
    elevation: 3
  },
  emptyGlow: {
    position: 'absolute',
    top: -56,
    right: -42,
    width: 156,
    height: 156,
    borderRadius: 78,
    backgroundColor: '#EAF5FF'
  },
  emptyIconWrap: {
    width: 68,
    height: 68,
    borderRadius: 24,
    borderWidth: 1,
    padding: 6,
    backgroundColor: theme.colors.white,
    shadowColor: '#0F4070',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 14,
    elevation: 2
  },
  emptyIconGradient: {
    flex: 1,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyTitle: {
    color: theme.colors.text,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 4
  },
  emptyText: {
    color: theme.colors.muted,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 21,
    maxWidth: 282
  },
  sessionModal: {
    flex: 1,
    backgroundColor: '#F3F8FD'
  },
  sessionModalContent: {
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 38,
    gap: 14
  },
  sessionModalClose: {
    position: 'absolute',
    right: 14,
    top: 14,
    zIndex: 5,
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#D6E9FF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white
  },
  sessionModalHero: {
    minHeight: 184,
    borderRadius: 28,
    padding: 20,
    paddingTop: 54,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.82)',
    shadowColor: '#08234A',
    shadowOpacity: 0.22,
    shadowOffset: { width: 0, height: 16 },
    shadowRadius: 24,
    elevation: 8
  },
  sessionHeroGlow: {
    position: 'absolute',
    right: -48,
    top: -36,
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: 'rgba(243,112,33,0.22)'
  },
  sessionHeroTopline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginBottom: 16
  },
  sessionHeroRule: {
    width: 34,
    height: 3,
    borderRadius: 2,
    backgroundColor: theme.colors.orange
  },
  sessionHeroEyebrow: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '600',
    letterSpacing: 1.1,
    textTransform: 'uppercase'
  },
  sessionModalTitle: {
    color: theme.colors.white,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    paddingRight: 40
  },
  sessionModalTrackPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: theme.radius.pill,
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 18
  },
  sessionModalTrackDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8B7CFF'
  },
  sessionModalTrackText: {
    color: theme.colors.white,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500'
  },
  sessionModalInfoGrid: {
    gap: 10,
    marginTop: -2
  },
  sessionModalInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E6EEF7',
    shadowColor: '#0F4070',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
    elevation: 3
  },
  sessionModalInfoIcon: {
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: '#FFF2E8',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sessionModalInfoLabel: {
    position: 'absolute',
    left: 68,
    top: 12,
    color: theme.colors.muted,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.6
  },
  sessionModalInfoValue: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    paddingTop: 15
  },
  sessionModalSummaryCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E6EEF7'
  },
  sessionModalSummaryTitle: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '600'
  },
  sessionModalSummaryText: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
    marginTop: 8
  },
  sessionModalSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2
  },
  sessionModalSectionEyebrow: {
    color: theme.colors.orange,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'uppercase'
  },
  sessionModalSectionTitle: {
    color: theme.colors.text,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600'
  },
  sessionModalSpeakerCount: {
    minWidth: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: theme.colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  sessionModalSpeakerCountText: {
    color: theme.colors.white,
    fontSize: 13,
    fontWeight: '600'
  },
  sessionModalSpeakerList: {
    gap: 10
  },
  sessionModalSpeaker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E8F0F8',
    shadowColor: '#0F4070',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 14,
    elevation: 2
  },
  sessionModalAvatar: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: theme.colors.white
  },
  sessionModalAvatarImage: {
    width: '100%',
    height: '100%'
  },
  sessionModalAvatarText: {
    color: theme.colors.navy,
    fontSize: 14,
    fontWeight: '600'
  },
  sessionModalSpeakerInfo: {
    flex: 1,
    minWidth: 0
  },
  sessionModalSpeakerName: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '600'
  },
  sessionModalSpeakerRole: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 2,
    fontWeight: '400'
  },
  sessionModalSpeakerCompany: {
    color: theme.colors.orange,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '500'
  },
  sessionModalEmpty: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 21,
    backgroundColor: theme.colors.white,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8F0F8'
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
    fontWeight: '600'
  },
  sheetSubtitle: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 3,
    fontWeight: '400'
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
    fontWeight: '600',
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
    fontWeight: '400'
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
    fontWeight: '400'
  },
  activeTimezoneText: {
    color: theme.colors.navy,
    fontWeight: '600'
  },
  localLabel: {
    color: theme.colors.orange,
    fontSize: 11,
    marginTop: 2,
    fontWeight: '500'
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
    fontWeight: '600'
  },
  applyText: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: '600'
  }
});
