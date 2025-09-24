import React, { useCallback, useMemo } from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native'
import { router } from 'expo-router'
import { useSongs } from '../hooks/useSongs'
import { SearchBar } from '../components/SearchBar'
import { SongCard } from '../components/SongCard'
import { Song } from '../types'
import Colors from '../constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  const { songs, searchQuery, handleSearch, loading, totalSongs } = useSongs()

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
    ({ item }: { item: Song }) => (
      <SongCard song={item} onPress={() => handleSongPress(item)} />
    ),
    [handleSongPress]
  )

  const renderHeader = useMemo(
    () => (
      <>
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Buscar cânticos..."
        />
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            {searchQuery
              ? `${songs.length} de ${totalSongs} cânticos`
              : `${totalSongs} cânticos`}
          </Text>
        </View>
      </>
    ),
    [searchQuery, handleSearch, songs.length, totalSongs]
  )

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {searchQuery
          ? `Nenhum cântico encontrado para "${searchQuery}"`
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
    <SafeAreaView style={styles.container}>
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
})
