import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Share,
} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Song } from '../../types'
import Colors from '../../constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFavorites } from '../../hooks/useFavorites'
import { useRecentSongs } from '../../hooks/useRecentSongs'

const FONT_SIZE_KEY = '@canticos_font_size'
const DEFAULT_FONT_SIZE = 18
const MIN_FONT_SIZE = 14
const MAX_FONT_SIZE = 28
const FONT_SIZE_STEP = 2

export default function SongDetailScreen() {
  const { song: songString } = useLocalSearchParams()

  if (!songString || Array.isArray(songString)) return null

  const song: Song = JSON.parse(songString)

  const { isFavorite, toggleFavorite } = useFavorites()
  const { addRecentSong } = useRecentSongs()

  const [fontSize, setFontSize] = useState<number>(DEFAULT_FONT_SIZE)

  useEffect(() => {
    AsyncStorage.getItem(FONT_SIZE_KEY)
      .then((raw) => {
        if (raw) {
          const parsed = parseInt(raw, 10)
          if (!isNaN(parsed)) setFontSize(parsed)
        }
      })
      .catch(console.error)

    addRecentSong(song)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const adjustFontSize = useCallback((delta: number) => {
    setFontSize((prev) => {
      const next = Math.min(MAX_FONT_SIZE, Math.max(MIN_FONT_SIZE, prev + delta))
      AsyncStorage.setItem(FONT_SIZE_KEY, next.toString()).catch(console.error)
      return next
    })
  }, [])

  const resetFontSize = useCallback(() => {
    setFontSize(DEFAULT_FONT_SIZE)
    AsyncStorage.setItem(FONT_SIZE_KEY, DEFAULT_FONT_SIZE.toString()).catch(console.error)
  }, [])

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${song.title}\n\n${song.lyrics}\n\n- Cânticos Espirituais IPB`,
        title: song.title,
      })
    } catch (error) {
      console.error('Error sharing:', error)
    }
  }

  const favorited = isFavorite(song.id)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.number}>#{song.index}</Text>
          <Text style={styles.title}>{song.title}</Text>
        </View>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => toggleFavorite(song)}
        >
          <Ionicons
            name={favorited ? 'heart' : 'heart-outline'}
            size={24}
            color={favorited ? Colors.error : Colors.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
          <Ionicons name="share-outline" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.fontControls}>
        <TouchableOpacity
          style={[styles.fontButton, fontSize <= MIN_FONT_SIZE && styles.fontButtonDisabled]}
          onPress={() => adjustFontSize(-FONT_SIZE_STEP)}
          disabled={fontSize <= MIN_FONT_SIZE}
        >
          <Text style={styles.fontButtonText}>A-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.fontButton} onPress={resetFontSize}>
          <Text style={styles.fontButtonText}>A</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.fontButton, fontSize >= MAX_FONT_SIZE && styles.fontButtonDisabled]}
          onPress={() => adjustFontSize(FONT_SIZE_STEP)}
          disabled={fontSize >= MAX_FONT_SIZE}
        >
          <Text style={styles.fontButtonText}>A+</Text>
        </TouchableOpacity>
        <Text style={styles.fontSizeLabel}>{fontSize}px</Text>
      </View>

      <ScrollView
        style={styles.lyricsContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.lyrics, { fontSize, lineHeight: fontSize * 1.6 }]}>
          {song.lyrics}
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.background,
  },
  titleContainer: {
    flex: 1,
    marginRight: 8,
  },
  number: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    lineHeight: 32,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colors.background,
    marginLeft: 8,
  },
  fontControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 8,
  },
  fontButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  fontButtonDisabled: {
    opacity: 0.4,
  },
  fontButtonText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  fontSizeLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    minWidth: 36,
    textAlign: 'right',
  },
  lyricsContainer: {
    flex: 1,
  },
  lyrics: {
    color: Colors.text,
    padding: 20,
    textAlign: 'left',
  },
})
