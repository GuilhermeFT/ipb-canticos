import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useCallback, useMemo } from 'react'
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SearchBar } from '../../components/SearchBar'
import { SongCard } from '../../components/SongCard'
import Colors from '../../constants/Colors'
import { useRecentSongs } from '../../hooks/useRecentSongs'
import { useSongs } from '../../hooks/useSongs'
import { Song, SongWithSnippet } from '../../types'

export default function HomeScreen() {
  const {
    songs,
    searchQuery,
    handleSearch,
    selectedLetter,
    handleLetterSelect,
    availableLetters,
    loading,
    totalSongs,
  } = useSongs()

  const { recentSongs } = useRecentSongs()

  const handleSongPress = useCallback((song: Song) => {
    router.push({
      pathname: '/song/[id]',
      params: {
        id: song.id.toString(),
        song: JSON.stringify(song),
      },
    })
  }, [])

  const renderSongItem = useCallback(
    ({ item }: { item: SongWithSnippet }) => (
      <SongCard
        song={item}
        onPress={() => handleSongPress(item)}
        matchSnippet={item.matchSnippet}
      />
    ),
    [handleSongPress],
  )

  const showRecents = !searchQuery && !selectedLetter && recentSongs.length > 0

  const renderHeader = useMemo(
    () => (
      <>
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Buscar cânticos..."
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.alphabetScroll}
          contentContainerStyle={styles.alphabetContent}
        >
          <TouchableOpacity
            style={[
              styles.letterButton,
              !selectedLetter && styles.letterButtonActive,
            ]}
            onPress={() => handleLetterSelect('')}
            activeOpacity={0.7}
          >
            <Ionicons
              name="list"
              size={18}
              color={!selectedLetter ? Colors.white : Colors.text}
            />
          </TouchableOpacity>
          {availableLetters.map((letter) => (
            <TouchableOpacity
              key={letter}
              style={[
                styles.letterButton,
                selectedLetter === letter && styles.letterButtonActive,
              ]}
              onPress={() => handleLetterSelect(letter)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.letterText,
                  selectedLetter === letter && styles.letterTextActive,
                ]}
              >
                {letter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            {searchQuery || selectedLetter
              ? `${songs.length} de ${totalSongs} cânticos`
              : `${totalSongs} cânticos`}
          </Text>
        </View>
        {showRecents && (
          <View style={styles.recentsContainer}>
            <Text style={styles.recentsTitle}>Vistos recentemente</Text>
            <FlatList
              horizontal
              data={recentSongs}
              keyExtractor={(item) => `recent-${item.id}`}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.recentCard}
                  onPress={() => handleSongPress(item)}
                  activeOpacity={0.7}
                >
                  <View style={styles.recentBadge}>
                    <Text style={styles.recentBadgeText}>{item.index}</Text>
                  </View>
                  <Text style={styles.recentTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.recentsContent}
            />
          </View>
        )}
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      searchQuery,
      handleSearch,
      availableLetters,
      selectedLetter,
      handleLetterSelect,
      songs.length,
      totalSongs,
      showRecents,
      recentSongs,
      handleSongPress,
    ],
  )

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {searchQuery || selectedLetter
          ? `Nenhum cântico encontrado`
          : 'Nenhum cântico disponível'}
      </Text>
    </View>
  )

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Carregando cânticos...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <FlatList
        data={songs}
        renderItem={renderSongItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={
          songs.length === 0 ? styles.emptyList : undefined
        }
        showsVerticalScrollIndicator={false}
        initialNumToRender={12}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews={true}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  statsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  statsText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.textSecondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  emptyList: {
    flexGrow: 1,
  },
  alphabetScroll: {
    maxHeight: 44,
  },
  alphabetContent: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  letterButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    minWidth: 32,
    alignItems: 'center',
  },
  letterButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  letterText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
  },
  letterTextActive: {
    color: Colors.white,
  },
  recentsContainer: {
    paddingTop: 4,
    paddingBottom: 8,
  },
  recentsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  recentsContent: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 8,
  },
  recentCard: {
    width: 90,
    backgroundColor: Colors.surface,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  recentBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  recentBadgeText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: 'bold',
  },
  recentTitle: {
    fontSize: 11,
    color: Colors.text,
    textAlign: 'center',
  },
})
