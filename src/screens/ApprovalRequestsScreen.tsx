import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { theme } from '../theme/theme';

type ApprovalRequest = {
  id: string;
  name: string;
  email: string;
  time: string;
};

const initialRequests: ApprovalRequest[] = [
  {
    id: '1',
    name: 'Ananya Sen',
    email: 'delegate@example.com',
    time: '10:30 AM'
  },
  {
    id: '2',
    name: 'Rohit Sharma',
    email: 'rohit.sharma@example.com',
    time: '11:05 AM'
  },
  {
    id: '3',
    name: 'Meera Iyer',
    email: 'meera.iyer@example.com',
    time: '12:20 PM'
  }
];

export function ApprovalRequestsScreen() {
  const [requests, setRequests] = useState(initialRequests);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timeout);
  }, []);

  const handleDecision = (id: string, decision: 'approved' | 'declined') => {
    setRequests((currentRequests) => currentRequests.filter((request) => request.id !== id));
    Alert.alert(
      decision === 'approved' ? 'Approved' : 'Declined',
      `Registration request ${decision}.`
    );
  };

  return (
    <Screen>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Approval Requests</Text>
        <Text style={styles.pageSubtitle}>Review delegate registration requests.</Text>
      </View>

      {loading ? (
        <>
          <ApprovalRequestSkeleton />
          <ApprovalRequestSkeleton />
          <ApprovalRequestSkeleton />
        </>
      ) : requests.length > 0 ? (
        requests.map((request) => (
          <View key={request.id} style={styles.requestCard}>
            <View style={styles.detailList}>
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}>
                  <Ionicons name="person-outline" size={18} color={theme.colors.orange} />
                </View>
                <View style={styles.detailCopy}>
                  <Text style={styles.detailLabel}>Name</Text>
                  <Text style={styles.detailValue}>{request.name}</Text>
                </View>
              </View>
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}>
                  <Ionicons name="mail-outline" size={18} color={theme.colors.orange} />
                </View>
                <View style={styles.detailCopy}>
                  <Text style={styles.detailLabel}>Email</Text>
                  <Text style={styles.detailValue}>{request.email}</Text>
                </View>
              </View>
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}>
                  <Ionicons name="time-outline" size={18} color={theme.colors.orange} />
                </View>
                <View style={styles.detailCopy}>
                  <Text style={styles.detailLabel}>Time</Text>
                  <Text style={styles.detailValue}>{request.time}</Text>
                </View>
              </View>
            </View>

            <View style={styles.actions}>
              <Pressable
                onPress={() => handleDecision(request.id, 'approved')}
                style={({ pressed }) => [styles.approveButton, pressed && styles.pressed]}
              >
                <Ionicons name="checkmark-circle-outline" size={18} color={theme.colors.white} />
                <Text style={styles.primaryButtonText}>Approve</Text>
              </Pressable>
              <Pressable
                onPress={() => handleDecision(request.id, 'declined')}
                style={({ pressed }) => [styles.declineButton, pressed && styles.pressed]}
              >
                <Ionicons name="close-circle-outline" size={18} color="#DC2626" />
                <Text style={styles.declineButtonText}>Decline</Text>
              </Pressable>
            </View>
          </View>
        ))
      ) : (
        <View style={styles.emptyCard}>
          <View style={styles.emptyIcon}>
            <Ionicons name="checkmark-done-outline" size={28} color={theme.colors.success} />
          </View>
          <Text style={styles.emptyTitle}>No pending approvals</Text>
          <Text style={styles.emptyText}>New registration requests will appear here.</Text>
        </View>
      )}
    </Screen>
  );
}

function ApprovalRequestSkeleton() {
  return (
    <View style={styles.skeletonCard}>
      <View style={styles.skeletonList}>
        <View style={styles.skeletonRow}>
          <View style={styles.skeletonIcon} />
          <View style={styles.skeletonCopy}>
            <View style={styles.skeletonLabel} />
            <View style={styles.skeletonValue} />
          </View>
        </View>
        <View style={styles.skeletonRow}>
          <View style={styles.skeletonIcon} />
          <View style={styles.skeletonCopy}>
            <View style={styles.skeletonLabel} />
            <View style={[styles.skeletonValue, styles.skeletonValueWide]} />
          </View>
        </View>
        <View style={styles.skeletonRow}>
          <View style={styles.skeletonIcon} />
          <View style={styles.skeletonCopy}>
            <View style={styles.skeletonLabel} />
            <View style={styles.skeletonValueShort} />
          </View>
        </View>
      </View>
      <View style={styles.skeletonActions}>
        <View style={styles.skeletonButton} />
        <View style={styles.skeletonButton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageHeader: {
    gap: 5
  },
  pageTitle: {
    color: theme.colors.text,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '700'
  },
  pageSubtitle: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400'
  },
  requestCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: '#E8F0F8',
    shadowColor: '#0F4070',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 2,
    gap: 14
  },
  skeletonCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: '#E8F0F8',
    gap: 14
  },
  skeletonList: {
    borderRadius: 16,
    backgroundColor: '#F8FBFE',
    borderWidth: 1,
    borderColor: '#E2ECF6',
    overflow: 'hidden'
  },
  skeletonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#E2ECF6'
  },
  skeletonIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#E7F0F8'
  },
  skeletonCopy: {
    flex: 1,
    gap: 8
  },
  skeletonLabel: {
    width: 56,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E7F0F8'
  },
  skeletonValue: {
    width: '48%',
    height: 14,
    borderRadius: 7,
    backgroundColor: '#DCEAF5'
  },
  skeletonValueWide: {
    width: '78%'
  },
  skeletonValueShort: {
    width: 78,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#DCEAF5'
  },
  skeletonActions: {
    flexDirection: 'row',
    gap: 10
  },
  skeletonButton: {
    flex: 1,
    height: 46,
    borderRadius: 15,
    backgroundColor: '#E7F0F8'
  },
  detailList: {
    borderRadius: 16,
    backgroundColor: '#F8FBFE',
    borderWidth: 1,
    borderColor: '#E2ECF6',
    overflow: 'hidden'
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#E2ECF6'
  },
  detailIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#FFF6EF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFE2CF'
  },
  detailCopy: {
    flex: 1,
    minWidth: 0
  },
  detailLabel: {
    color: theme.colors.muted,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  detailValue: {
    color: theme.colors.text,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '500',
    marginTop: 3
  },
  actions: {
    flexDirection: 'row',
    gap: 10
  },
  approveButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 15,
    backgroundColor: theme.colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8
  },
  declineButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 15,
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FECACA',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8
  },
  primaryButtonText: {
    color: theme.colors.white,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '600'
  },
  declineButtonText: {
    color: '#DC2626',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '600'
  },
  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.99 }]
  },
  emptyCard: {
    minHeight: 190,
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E8F0F8'
  },
  emptyIcon: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: '#ECFDF3',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C9F0D5',
    marginBottom: 12
  },
  emptyTitle: {
    color: theme.colors.text,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    textAlign: 'center'
  },
  emptyText: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 6
  }
});
