import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AdminDashboardScreen } from '../screens/AdminDashboardScreen';
import { AdminLoginScreen } from '../screens/AdminLoginScreen';
import { AboutEventScreen } from '../screens/AboutEventScreen';
import { ApprovalRequestsScreen } from '../screens/ApprovalRequestsScreen';
import { AttendeeDashboardScreen } from '../screens/AttendeeDashboardScreen';
import { AuthScreen } from '../screens/AuthScreen';
import { ContactScreen } from '../screens/ContactScreen';
import { ConferenceSecretariatScreen } from '../screens/ConferenceSecretariatScreen';
import { ExhibitorsScreen } from '../screens/ExhibitorsScreen';
import { ForewordScreen } from '../screens/ForewordScreen';
import { MyScheduleScreen } from '../screens/MyScheduleScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { OrganisersScreen } from '../screens/OrganisersScreen';
import { PrivacyPolicyScreen } from '../screens/PrivacyPolicyScreen';
import { SessionDetailsScreen } from '../screens/SessionDetailsScreen';
import { SpeakerDetailsScreen } from '../screens/SpeakerDetailsScreen';
import { SponsorDetailsScreen } from '../screens/SponsorDetailsScreen';
import { SplashScreen } from '../screens/SplashScreen';
import { TicketsScreen } from '../screens/TicketsScreen';
import { VenueScreen } from '../screens/VenueScreen';
import { theme } from '../theme/theme';
import { MainTabs } from './MainTabs';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.navy },
        headerTintColor: theme.colors.white,
        headerTitleStyle: { fontWeight: '600' },
        contentStyle: { backgroundColor: theme.colors.background }
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AttendeeDashboard" component={AttendeeDashboardScreen} options={{ title: 'User Dashboard' }} />
      <Stack.Screen name="AdminLogin" component={AdminLoginScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="AdminDashboard"
        component={AdminDashboardScreen}
        options={{
          title: 'Admin Dashboard',
          headerBackVisible: false,
          gestureEnabled: false
        }}
      />
      <Stack.Screen name="ApprovalRequests" component={ApprovalRequestsScreen} options={{ title: 'Approval Requests' }} />
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="About" component={AboutEventScreen} options={{ title: 'About Us' }} />
      <Stack.Screen name="SessionDetails" component={SessionDetailsScreen} options={{ title: 'Session Details' }} />
      <Stack.Screen name="SpeakerDetails" component={SpeakerDetailsScreen} options={{ title: 'Speaker Details' }} />
      <Stack.Screen name="SponsorDetails" component={SponsorDetailsScreen} options={{ title: 'Sponsor Details' }} />
      <Stack.Screen name="Foreword" component={ForewordScreen} options={{ title: 'Foreword' }} />
      <Stack.Screen name="Organisers" component={OrganisersScreen} options={{ title: 'About the Organiser' }} />
      <Stack.Screen name="Venue" component={VenueScreen} options={{ title: 'Venue & Map' }} />
      <Stack.Screen name="Exhibitors" component={ExhibitorsScreen} options={{ title: 'Exhibitors' }} />
      <Stack.Screen name="Tickets" component={TicketsScreen} options={{ title: 'Delegate Registration' }} />
      <Stack.Screen name="MySchedule" component={MyScheduleScreen} options={{ title: 'My Schedule' }} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ title: 'Notifications' }} />
      <Stack.Screen name="Contact" component={ContactScreen} options={{ title: 'Contact Team' }} />
      <Stack.Screen name="ConferenceSecretariat" component={ConferenceSecretariatScreen} options={{ title: 'Conference Secretariat' }} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{ title: 'Privacy Policy' }} />
    </Stack.Navigator>
  );
}
