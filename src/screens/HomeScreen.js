import React from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native'
import { useSongs } from '../hooks/useSongs'
import SearchBar from '../components/SearchBar'
import SongCard from '../components/SongCard'

const HomeScreen = ({ navigation }) => {
  const { songs, searchQuery, handleSearch, loading, totalSongs } = useSongs()

  const renderSongItem = ({ item }) => (
    <SongCard
      song={item}
      onPress={() => navigation.navigate('SongDetail', { song: item })}
    />
  )

  const renderHeader = () => (
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
        <ActivityIndicator size="large" color="#004411" />
        <Text style={styles.loadingText}>Carregando cânticos...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={songs}
        renderItem={renderSongItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={songs.length === 0 ? styles.emptyList : null}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  statsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  statsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  emptyList: {
    flexGrow: 1,
  },
})

export default HomeScreen
