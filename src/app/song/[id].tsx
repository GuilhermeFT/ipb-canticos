import React from 'react'
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
import { Song } from '../../types'
import Colors from '../../constants/Colors'

export default function SongDetailScreen() {
  const { song: songString } = useLocalSearchParams()
  const song: Song = JSON.parse(songString as string)

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.number}>#{song.index}</Text>
          <Text style={styles.title}>{song.title}</Text>
        </View>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Ionicons name="share-outline" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.lyricsContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.lyrics}>{song.lyrics}</Text>
      </ScrollView>
    </View>
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
    marginRight: 16,
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
  shareButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colors.background,
  },
  lyricsContainer: {
    flex: 1,
  },
  lyrics: {
    fontSize: 18,
    lineHeight: 28,
    color: Colors.text,
    padding: 20,
    textAlign: 'left',
  },
})
