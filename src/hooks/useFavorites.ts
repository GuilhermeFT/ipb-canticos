import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Song } from '../types'

const STORAGE_KEY = '@canticos_favorites'

export const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set())
  const [favorites, setFavorites] = useState<Song[]>([])

  const loadFavorites = useCallback(async () => {
    const raw = await AsyncStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed: Song[] = JSON.parse(raw)
      setFavorites(parsed)
      setFavoriteIds(new Set(parsed.map((s) => s.id)))
    }
  }, [])

  useEffect(() => {
    loadFavorites().catch(console.error)
  }, [loadFavorites])

  const toggleFavorite = useCallback(
    (song: Song) => {
      setFavoriteIds((prevIds) => {
        const nextIds = new Set(prevIds)
        let nextSongs: Song[]
        if (nextIds.has(song.id)) {
          nextIds.delete(song.id)
          nextSongs = favorites.filter((s) => s.id !== song.id)
        } else {
          nextIds.add(song.id)
          nextSongs = [...favorites, song]
        }
        setFavorites(nextSongs)
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextSongs)).catch(console.error)
        return nextIds
      })
    },
    [favorites]
  )

  const isFavorite = useCallback(
    (id: number) => favoriteIds.has(id),
    [favoriteIds]
  )

  return { favorites, isFavorite, toggleFavorite, loadFavorites }
}
