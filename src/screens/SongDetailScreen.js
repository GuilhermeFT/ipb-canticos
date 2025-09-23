import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SongDetailScreen = ({ route }) => {
  const { song } = route.params;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${song.title}\n\n${song.lyrics}\n\n- Cânticos Espirituais IPB`,
        title: song.title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.number}>#{song.index}</Text>
          <Text style={styles.title}>{song.title}</Text>
        </View>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Ionicons name="share-outline" size={24} color="#2c3e50" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.lyricsContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.lyrics}>{song.lyrics}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
    backgroundColor: '#f8f9fa',
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
  },
  number: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    lineHeight: 32,
  },
  shareButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#e9ecef',
  },
  lyricsContainer: {
    flex: 1,
  },
  lyrics: {
    fontSize: 18,
    lineHeight: 28,
    color: '#333',
    padding: 20,
    textAlign: 'left',
  },
});

export default SongDetailScreen;