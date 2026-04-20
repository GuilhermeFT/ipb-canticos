import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Song } from '../types'

const STORAGE_KEY = '@canticos_recent'
const MAX_RECENT = 8

export const useRecentSongs = () => {
  const [recentSongs, setRecentSongs] = useState<Song[]>([])

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setRecentSongs(JSON.parse(raw))
      })
      .catch(console.error)
  }, [])

  const addRecentSong = useCallback((song: Song) => {
    setRecentSongs((prev) => {
      const deduped = prev.filter((s) => s.id !== song.id)
      const next = [song, ...deduped].slice(0, MAX_RECENT)
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(console.error)
      return next
    })
  }, [])

  return { recentSongs, addRecentSong }
}
