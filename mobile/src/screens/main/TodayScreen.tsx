import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';
import CreateBoxModal from '../../components/CreateBoxModal';
import boxService from '../../services/box.service';
import { Box } from '../../types/box.types';
import { handleError, showErrorAlert } from '../../utils/errorHandler';

const TodayScreen: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const loadBoxes = async () => {
    setIsLoading(true);
    try {
      const response = await boxService.getTodayBoxes();
      setBoxes(response.data.boxes);
    } catch (error: any) {
      handleError(error, { context: 'TodayScreen.loadBoxes' });
      showErrorAlert(error, 'Failed to Load Boxes');
    } finally {
      setIsLoading(false);
    }
  };

  // Load boxes when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadBoxes();
    }, [])
  );

  const handleBoxCreated = () => {
    loadBoxes();
  };

  const handleStartBox = async (box: Box) => {
    try {
      const response = await boxService.startBox(box.id);
      // Navigate to focus mode with updated box
      (navigation as any).navigate('FocusMode', { box: response.data.box });
    } catch (error: any) {
      handleError(error, { context: 'TodayScreen.handleStartBox' });
      showErrorAlert(error, 'Failed to Start Box');
    }
  };

  const renderBox = ({ item }: { item: Box }) => (
    <TouchableOpacity
      style={styles.boxCard}
      onPress={() => {
        if (item.status === 'scheduled') {
          handleStartBox(item);
        }
      }}
    >
      <View style={styles.boxHeader}>
        <Text style={styles.boxTitle}>{item.taskName}</Text>
        <View style={[styles.statusBadge, styles[`status_${item.status}`]]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.boxFooter}>
        <Text style={styles.durationText}>{item.duration} min</Text>
        {item.status === 'scheduled' && (
          <Text style={styles.actionHint}>Tap to start →</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>📦</Text>
      <Text style={styles.emptyTitle}>No boxes yet</Text>
      <Text style={styles.emptyDescription}>
        Create your first box to start focusing on your work
      </Text>
      <TouchableOpacity
        style={styles.emptyButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.emptyButtonText}>Create a Box</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            {new Date().getHours() < 12
              ? 'Good morning'
              : new Date().getHours() < 18
              ? 'Good afternoon'
              : 'Good evening'}
            , {user?.name?.split(' ')[0] || 'there'}
          </Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>
      </View>

      {/* Boxes List */}
      <FlatList
        data={boxes}
        renderItem={renderBox}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={loadBoxes}
            tintColor={colors.honey}
          />
        }
        ListEmptyComponent={!isLoading ? renderEmptyState : null}
      />

      {/* Floating Add Button */}
      {boxes.length > 0 && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      )}

      {/* Create Box Modal */}
      <CreateBoxModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onBoxCreated={handleBoxCreated}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[4],
    paddingBottom: spacing[3],
  },
  greeting: {
    ...typography.h2,
    color: colors.beeBlack,
    marginBottom: spacing[1],
  },
  date: {
    ...typography.body,
    color: colors.gray600,
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: spacing[4],
    paddingTop: spacing[2],
    paddingBottom: spacing[20],
  },
  boxCard: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.gray200,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    marginBottom: spacing[3],
  },
  boxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[3],
  },
  boxTitle: {
    ...typography.bodyBold,
    color: colors.beeBlack,
    flex: 1,
    marginRight: spacing[2],
  },
  statusBadge: {
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.sm,
  },
  status_scheduled: {
    backgroundColor: colors.honeyCream,
  },
  status_active: {
    backgroundColor: colors.honey,
  },
  status_completed: {
    backgroundColor: colors.gray200,
  },
  status_cancelled: {
    backgroundColor: colors.gray100,
  },
  status_paused: {
    backgroundColor: colors.gray200,
  },
  statusText: {
    ...typography.small,
    color: colors.beeBlack,
    textTransform: 'capitalize',
  },
  boxFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  durationText: {
    ...typography.body,
    color: colors.gray700,
  },
  actionHint: {
    ...typography.small,
    color: colors.honey,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing[16],
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing[4],
  },
  emptyTitle: {
    ...typography.h2,
    color: colors.beeBlack,
    marginBottom: spacing[2],
  },
  emptyDescription: {
    ...typography.body,
    color: colors.gray600,
    textAlign: 'center',
    marginBottom: spacing[6],
    paddingHorizontal: spacing[8],
  },
  emptyButton: {
    backgroundColor: colors.honey,
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[6],
    borderRadius: borderRadius.lg,
  },
  emptyButtonText: {
    ...typography.bodyBold,
    color: colors.white,
  },
  fab: {
    position: 'absolute',
    bottom: spacing[8],
    right: spacing[4],
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.honey,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  fabText: {
    fontSize: 32,
    color: colors.white,
    lineHeight: 32,
  },
});

export default TodayScreen;
