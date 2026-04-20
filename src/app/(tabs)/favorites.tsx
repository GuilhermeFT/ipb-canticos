import React, { useCallback } from 'react'
import { View, FlatList, StyleSheet, Text } from 'react-native'
import { router } from 'expo-router'
import { useFocusEffect } from '@react-navigation/native'
import { useFavorites } from '../../hooks/useFavorites'
import { SongCard } from '../../components/SongCard'
import { Song } from '../../types'
import Colors from '../../constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function FavoritesScreen() {
  const { favorites, loadFavorites } = useFavorites()

  useFocusEffect(
    useCallback(() => {
      loadFavorites().catch(console.error)
    }, [loadFavorites])
  )

  const handleSongPress = useCallback((song: Song) => {
    router.push({
      pathname: '/song/[id]',
      params: {
        id: song.id.toString(),
        song: JSON.stringify(song),
      },
    })
  }, [])

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        Nenhum cântico favorito ainda.{'\n'}
        Toque no coração em um cântico para favoritar.
      </Text>
    </View>
  )

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SongCard song={item} onPress={() => handleSongPress(item)} />
        )}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={
          favorites.length === 0 ? styles.emptyList : undefined
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
